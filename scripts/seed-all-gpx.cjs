/**
 * Universal seed script: parses ALL GPX files from a folder,
 * extracts metadata, inserts tracks into Supabase, and uploads GPX files to Storage.
 *
 * Usage:
 *   node scripts/seed-all-gpx.cjs                          # reads from public/gpx/
 *   node scripts/seed-all-gpx.cjs /path/to/gpx/folder      # reads from custom folder
 *
 * Requires: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local
 *
 * IMPORTANT: Before running, add RLS policies in Supabase SQL Editor:
 *   create policy "Allow anon insert" on public.tracks for insert with check (true);
 *   create policy "Allow anon update" on public.tracks for update using (true);
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// ── Load env ──
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const match = line.match(/^(\w+)=(.*)$/);
  if (match) env[match[1]] = match[2].trim();
}

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseKey);

// ── GPX folder ──
const gpxDir = process.argv[2] || path.join(__dirname, '..', 'public', 'gpx');

if (!fs.existsSync(gpxDir)) {
  console.error(`GPX directory not found: ${gpxDir}`);
  console.error('Usage: node scripts/seed-all-gpx.cjs [/path/to/gpx/folder]');
  process.exit(1);
}

// ── GPX Parser ──
function parseGpx(gpxString) {
  const points = [];

  // Parse track points with elevation
  const trkptWithEle = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)"[^>]*>\s*<ele>([^<]*)<\/ele>\s*<\/trkpt>/g;
  let match;
  while ((match = trkptWithEle.exec(gpxString)) !== null) {
    points.push({
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
      elevation: parseFloat(match[3]),
    });
  }

  // If no points with elevation, try without
  if (points.length === 0) {
    const trkptNoEle = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)"/g;
    while ((match = trkptNoEle.exec(gpxString)) !== null) {
      points.push({
        lat: parseFloat(match[1]),
        lng: parseFloat(match[2]),
        elevation: 0,
      });
    }
  }

  // Parse metadata name (prefer <trk><name>, fallback to <metadata><name>)
  const trkNameMatch = gpxString.match(/<trk>[\s\S]*?<name>([^<]*)<\/name>/);
  const metaNameMatch = gpxString.match(/<metadata>[\s\S]*?<name>([^<]*)<\/name>/);
  const name = trkNameMatch ? trkNameMatch[1] : metaNameMatch ? metaNameMatch[1] : 'Unnamed';

  // Parse description
  const trkDescMatch = gpxString.match(/<trk>[\s\S]*?<desc>([\s\S]*?)<\/desc>/);
  const metaDescMatch = gpxString.match(/<metadata>[\s\S]*?<desc>([\s\S]*?)<\/desc>/);
  const desc = trkDescMatch ? trkDescMatch[1].trim() : metaDescMatch ? metaDescMatch[1].trim() : '';

  // Parse waypoints (POIs)
  const waypoints = [];
  const wptRegex = /<wpt\s+lat="([^"]+)"\s+lon="([^"]+)"[\s\S]*?<name>([^<]*)<\/name>[\s\S]*?(?:<type>([^<]*)<\/type>)?[\s\S]*?<\/wpt>/g;
  while ((match = wptRegex.exec(gpxString)) !== null) {
    waypoints.push({
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
      name: match[3],
      type: match[4] || '',
    });
  }

  return { name, desc, points, waypoints };
}

// ── Douglas-Peucker simplification ──
function simplifyTrack(points, tolerance = 0.0003) {
  if (points.length <= 2) return points;
  let maxDistance = 0;
  let maxIndex = 0;
  const first = points[0];
  const last = points[points.length - 1];
  for (let i = 1; i < points.length - 1; i++) {
    const dx = last.lng - first.lng;
    const dy = last.lat - first.lat;
    const num = Math.abs(dy * points[i].lng - dx * points[i].lat + last.lng * first.lat - last.lat * first.lng);
    const den = Math.sqrt(dy * dy + dx * dx);
    const d = den === 0 ? 0 : num / den;
    if (d > maxDistance) { maxDistance = d; maxIndex = i; }
  }
  if (maxDistance > tolerance) {
    const left = simplifyTrack(points.slice(0, maxIndex + 1), tolerance);
    const right = simplifyTrack(points.slice(maxIndex), tolerance);
    return [...left.slice(0, -1), ...right];
  }
  return [first, last];
}

// ── Haversine distance ──
function calculateDistance(points) {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const R = 6371;
    const dLat = (points[i].lat - points[i - 1].lat) * Math.PI / 180;
    const dLng = (points[i].lng - points[i - 1].lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(points[i - 1].lat * Math.PI / 180) * Math.cos(points[i].lat * Math.PI / 180) *
      Math.sin(dLng / 2) ** 2;
    total += R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  return Math.round(total * 10) / 10;
}

// ── Elevation gain ──
function calculateElevationGain(points) {
  let gain = 0;
  for (let i = 1; i < points.length; i++) {
    const diff = points[i].elevation - points[i - 1].elevation;
    if (diff > 0) gain += diff;
  }
  return Math.round(gain);
}

// ── Extract metadata from GPX name / filename ──
function extractMetadata(gpxName, fileName) {
  // Name patterns:
  //   "DBB CR 2.0 · LONG · ETA 13:00"
  //   "DBB DOD · EASY · Rajiceva"
  //   "DBB Burekfast Right"

  const str = gpxName || fileName.replace('.gpx', '');

  // Difficulty from · DIFFICULTY · pattern — keep original values
  const diffMatch = str.match(/·\s*(EASY|NORM|LONG|HARD|EPIC)\s*·/i);
  let difficulty = 'norm';
  if (diffMatch) {
    difficulty = diffMatch[1].toLowerCase();
  }

  // Estimated time from "ETA HH:MM" or "ETA HH H"
  const etaMatch = str.match(/ETA\s*(\d+)[:\s]*(\d+)?/i);
  let estimatedTime = null;
  if (etaMatch) {
    const hours = parseInt(etaMatch[1]);
    const mins = etaMatch[2] ? parseInt(etaMatch[2]) : 0;
    estimatedTime = mins > 0 ? `${hours}h ${String(mins).padStart(2, '0')}min` : `${hours}h 00min`;
  }

  // Surface — detect gravel from name patterns
  const lowerStr = str.toLowerCase();
  let surface = 'road';
  if (lowerStr.includes('rocks') || lowerStr.includes('gravel')) {
    surface = 'gravel';
  }

  // Route category from name patterns
  let route_category = null;
  if (lowerStr.includes('coffee') || lowerStr.match(/\bcr\b/)) {
    route_category = 'coffee';
  } else if (lowerStr.includes('dark') || lowerStr.includes('dod') || lowerStr.includes('dor')) {
    route_category = 'dark';
  } else if (lowerStr.includes('sun')) {
    route_category = 'sun';
  } else if (lowerStr.includes('plus') || lowerStr.match(/dbb\+/i)) {
    route_category = 'plus';
  } else if (lowerStr.includes('rekafary') || lowerStr.includes('burekfast')) {
    route_category = 'misc';
  }

  // Route format — detect from name or default to loop
  let route_format = 'loop';
  if (lowerStr.includes('a to b') || lowerStr.includes('a→b')) {
    route_format = 'point_to_point';
  }

  // Clean display name: use the full GPX name (it's descriptive)
  const displayName = gpxName || fileName.replace('.gpx', '');

  return { difficulty, surface, estimatedTime, displayName, route_category, route_format };
}

// ── Build safety notes from description & waypoints ──
function buildSafetyNotes(desc, waypoints) {
  if (desc) return desc;
  if (waypoints.length > 0) {
    const pois = waypoints
      .filter(w => w.type === 'Coffee' || w.type === 'Restaurant' || w.type === 'Water')
      .map(w => w.name)
      .join(', ');
    if (pois) return `POI stops: ${pois}`;
  }
  return null;
}

// ── Main ──
async function seed() {
  const gpxFiles = fs.readdirSync(gpxDir).filter(f => f.toLowerCase().endsWith('.gpx'));

  console.log(`Found ${gpxFiles.length} GPX files in ${gpxDir}\n`);

  if (gpxFiles.length === 0) {
    console.error('No GPX files found. Check the directory path.');
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < gpxFiles.length; i++) {
    const fileName = gpxFiles[i];
    const filePath = path.join(gpxDir, fileName);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Parse GPX
    const { name: gpxName, desc, points, waypoints } = parseGpx(content);

    if (points.length === 0) {
      console.log(`  SKIP [${i + 1}/${gpxFiles.length}] ${fileName} — no track points`);
      continue;
    }

    // Calculate stats
    const distance = calculateDistance(points);
    const elevation = calculateElevationGain(points);
    const simplified = simplifyTrack(points);
    const startPoint = { lat: points[0].lat, lng: points[0].lng };
    const endPoint = { lat: points[points.length - 1].lat, lng: points[points.length - 1].lng };
    const coordinates = startPoint; // center point = start

    // Extract metadata
    const { difficulty, surface, estimatedTime, displayName, route_category, route_format } = extractMetadata(gpxName, fileName);
    const safetyNotes = buildSafetyNotes(desc, waypoints);

    // Route points for map display (simplified)
    const routePoints = simplified.map(p => ({ lat: p.lat, lng: p.lng }));

    // Legacy ID = slug from filename
    const legacyId = fileName.replace('.gpx', '').replace(/[^a-zA-Z0-9_.-]/g, '_');

    const trackRow = {
      legacy_id: legacyId,
      name: displayName,
      region: 'Serbia',
      distance_km: distance,
      elevation_m: elevation,
      difficulty,
      surface,
      route_category,
      route_format,
      thumbnail_url: null,
      coordinates,
      description: desc || null,
      safety_notes: safetyNotes,
      estimated_time: estimatedTime,
      photos: [],
      start_point: startPoint,
      end_point: endPoint,
      gpx_file_name: fileName,
      route_points: routePoints,
      sort_order: i + 1,
      is_published: true,
    };

    // Upsert track
    const { error: dbError } = await supabase
      .from('tracks')
      .upsert(trackRow, { onConflict: 'legacy_id' });

    if (dbError) {
      console.log(`  FAIL [${i + 1}/${gpxFiles.length}] ${displayName}: ${dbError.message}`);
      failCount++;
      continue;
    }

    // Upload GPX file to storage
    const fileBuffer = fs.readFileSync(filePath);
    const { error: storageError } = await supabase.storage
      .from('gpx-files')
      .upload(fileName, fileBuffer, {
        contentType: 'application/gpx+xml',
        upsert: true,
      });

    if (storageError) {
      console.log(`  OK   [${i + 1}/${gpxFiles.length}] ${displayName} (DB ok, storage: ${storageError.message})`);
    } else {
      console.log(`  OK   [${i + 1}/${gpxFiles.length}] ${displayName}`);
    }
    successCount++;
  }

  console.log(`\nDone! ${successCount} tracks seeded, ${failCount} failed.`);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
