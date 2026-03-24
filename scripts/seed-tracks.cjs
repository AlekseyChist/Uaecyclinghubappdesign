/**
 * Seed script: inserts track data into Supabase and uploads GPX files to Storage.
 *
 * Usage:
 *   node scripts/seed-tracks.cjs
 *
 * Requires: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load env from .env.local
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

// ── Track data (merged from mockTracks + mockTrackDetails) ──

const tracks = [
  {
    legacy_id: '1',
    name: 'Al Qudra Loop',
    region: 'Dubai',
    distance_km: 86,
    elevation_m: 45,
    difficulty: 'easy',
    surface: 'road',
    thumbnail_url: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&h=300&fit=crop',
    coordinates: { lat: 24.8607, lng: 55.2094 },
    description: 'The iconic Al Qudra cycling track is a must-ride for every cyclist in Dubai. This flat, well-maintained loop circles the beautiful Al Qudra Lakes, offering stunning desert scenery and occasional wildlife sightings.',
    safety_notes: 'Best ridden early morning (5-7 AM) to avoid heat. Watch for sand on the road after windy days. Stay hydrated - no water stops on route.',
    estimated_time: '3h 30min',
    photos: [
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop',
    ],
    start_point: { lat: 24.998854, lng: 55.307335 },
    end_point: { lat: 24.8607, lng: 55.2094 },
    gpx_file_name: 'Al Qudra_stick_loop_Extension_1and2.gpx',
    sort_order: 1,
  },
  {
    legacy_id: '2',
    name: 'Jebel Jais Summit',
    region: 'Ras Al Khaimah',
    distance_km: 32,
    elevation_m: 1250,
    difficulty: 'hard',
    surface: 'road',
    thumbnail_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    coordinates: { lat: 25.9574, lng: 56.1339 },
    description: 'Jebel Jais Summit is the ultimate climbing challenge in the UAE. This demanding ascent rewards riders with breathtaking mountain views and the satisfaction of conquering the highest peak in the Emirates.',
    safety_notes: 'Start early - road is steep with sharp hairpins. Carry warm clothing for descent. Check weather conditions before riding. Limited mobile coverage in some areas.',
    estimated_time: '2h 15min',
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop',
    ],
    start_point: { lat: 25.9574, lng: 56.1339 },
    end_point: { lat: 25.9574, lng: 56.1339 },
    gpx_file_name: null,
    sort_order: 2,
  },
  {
    legacy_id: '3',
    name: 'Hatta Mountain Trail',
    region: 'Dubai',
    distance_km: 18,
    elevation_m: 320,
    difficulty: 'medium',
    surface: 'gravel',
    thumbnail_url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop',
    coordinates: { lat: 24.8030, lng: 56.1281 },
    description: 'Hatta Mountain Trail offers an exciting off-road adventure through rocky terrain and wadi landscapes. Perfect for gravel and mountain bike enthusiasts looking for technical challenges.',
    safety_notes: 'Technical terrain requires good bike handling skills. Carry extra water and repair kit. Inform someone of your route. Best avoided during summer months.',
    estimated_time: '1h 45min',
    photos: [
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop',
    ],
    start_point: { lat: 25.149562, lng: 55.286694 },
    end_point: { lat: 24.8030, lng: 56.1281 },
    gpx_file_name: 'MaydantoKite.gpx',
    sort_order: 3,
  },
  {
    legacy_id: '4',
    name: 'Yas Island Circuit',
    region: 'Abu Dhabi',
    distance_km: 12,
    elevation_m: 25,
    difficulty: 'easy',
    surface: 'road',
    thumbnail_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
    coordinates: { lat: 24.4672, lng: 54.6031 },
    description: "A smooth, flat circuit around Yas Island's famous Formula 1 track. Perfect for beginners and training rides with well-maintained paths and scenic waterfront views.",
    safety_notes: 'Watch for pedestrians on shared paths. Circuit is well-lit for evening rides. Water fountains available around the island.',
    estimated_time: '45min',
    photos: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop',
    ],
    start_point: { lat: 25.163101, lng: 55.274264 },
    end_point: { lat: 24.4672, lng: 54.6031 },
    gpx_file_name: 'Morning_Ride.gpx',
    sort_order: 4,
  },
  {
    legacy_id: '5',
    name: 'Al Wathba Wetlands',
    region: 'Abu Dhabi',
    distance_km: 24,
    elevation_m: 15,
    difficulty: 'easy',
    surface: 'mixed',
    thumbnail_url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop',
    coordinates: { lat: 24.2544, lng: 54.6394 },
    description: 'A peaceful ride through the Al Wathba Wetlands Reserve, combining paved and packed gravel paths. Great for wildlife watching and photography while cycling.',
    safety_notes: 'Respect wildlife areas. Paths can be narrow in some sections. Best visited during cooler months. Bring binoculars for flamingo watching!',
    estimated_time: '1h 30min',
    photos: [
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop',
    ],
    start_point: { lat: 25.224704, lng: 55.451202 },
    end_point: { lat: 24.2544, lng: 54.6394 },
    gpx_file_name: 'Lunch_Ride.gpx',
    sort_order: 5,
  },
  {
    legacy_id: '6',
    name: 'Jebel Hafeet Climb',
    region: 'Al Ain',
    distance_km: 24,
    elevation_m: 1100,
    difficulty: 'hard',
    surface: 'road',
    thumbnail_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    coordinates: { lat: 24.0667, lng: 55.7833 },
    description: 'The legendary Jebel Hafeet climb is one of the greatest road cycling challenges in the region. 60 hairpin bends lead to spectacular panoramic views from the summit.',
    safety_notes: 'Extremely challenging climb - assess your fitness level. Start very early to avoid heat. Descend with caution - road can be windy. Emergency services available at summit.',
    estimated_time: '2h 30min',
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    ],
    start_point: { lat: 24.098449, lng: 55.758849 },
    end_point: { lat: 24.0667, lng: 55.7833 },
    gpx_file_name: 'JabelHafeet.gpx',
    sort_order: 6,
  },
  {
    legacy_id: '7',
    name: 'DBB CR 2.0 LONG',
    region: 'Serbia',
    distance_km: 78,
    elevation_m: 320,
    difficulty: 'medium',
    surface: 'road',
    thumbnail_url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop',
    coordinates: { lat: 44.80535, lng: 20.44608 },
    description: 'DBB CR 2.0 LONG is a scenic 78km road cycling route through the beautiful Serbian countryside. Features rolling hills, charming villages, and several cafe stops for refueling.',
    safety_notes: 'Group ride - stay with the pack. POI stops: km 30 Shelby cafe, km 40 101 Ruza cafe, km 54 Dea bakery, km 78 Supertramp lunch. Estimated time: 3-4 hours.',
    estimated_time: '3h 30min',
    photos: [
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop',
    ],
    start_point: { lat: 44.80535, lng: 20.44608 },
    end_point: { lat: 44.80535, lng: 20.44608 },
    gpx_file_name: 'DBB_CR_2.gpx',
    sort_order: 7,
  },
  {
    legacy_id: '8',
    name: 'DBB CR 5.0 EPIC',
    region: 'Serbia',
    distance_km: 98,
    elevation_m: 450,
    difficulty: 'hard',
    surface: 'road',
    thumbnail_url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop',
    coordinates: { lat: 44.80536, lng: 20.44608 },
    description: 'DBB CR 5.0 EPIC is the ultimate challenge - a 98km epic route through Serbia. This demanding ride takes you through diverse terrain with spectacular views and rewarding cafe stops.',
    safety_notes: 'Advanced riders only. POI stops: km 33 PerSu store, km 69 Gomex store, km 97 Dilemma brewery lunch. Estimated time: 3.5-4.5 hours. Bring sufficient nutrition and hydration.',
    estimated_time: '4h 00min',
    photos: [
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop',
    ],
    start_point: { lat: 44.80536, lng: 20.44608 },
    end_point: { lat: 44.80536, lng: 20.44608 },
    gpx_file_name: 'DBB_CR_5.gpx',
    sort_order: 8,
  },
];

// GPX files to upload
const gpxFiles = [
  'Al Qudra_stick_loop_Extension_1and2.gpx',
  'JabelHafeet.gpx',
  'Lunch_Ride.gpx',
  'MaydantoKite.gpx',
  'Morning_Ride.gpx',
  'DBB_CR_2.gpx',
  'DBB_CR_5.gpx',
];

async function seed() {
  console.log('Seeding tracks into Supabase...\n');

  // 1. Upsert tracks (using legacy_id as conflict key)
  for (const track of tracks) {
    const { data, error } = await supabase
      .from('tracks')
      .upsert(track, { onConflict: 'legacy_id' })
      .select('id, legacy_id, name');

    if (error) {
      console.error(`  FAIL [${track.legacy_id}] ${track.name}:`, error.message);
    } else {
      console.log(`  OK   [${track.legacy_id}] ${track.name}`);
    }
  }

  // 2. Upload GPX files to Supabase Storage
  console.log('\nUploading GPX files to storage bucket "gpx-files"...\n');

  const gpxDir = path.join(__dirname, '..', 'public', 'gpx');

  for (const fileName of gpxFiles) {
    const filePath = path.join(gpxDir, fileName);

    if (!fs.existsSync(filePath)) {
      console.error(`  SKIP ${fileName} — file not found at ${filePath}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(filePath);

    const { error } = await supabase.storage
      .from('gpx-files')
      .upload(fileName, fileBuffer, {
        contentType: 'application/gpx+xml',
        upsert: true,
      });

    if (error) {
      console.error(`  FAIL ${fileName}:`, error.message);
    } else {
      console.log(`  OK   ${fileName}`);
    }
  }

  console.log('\nDone!');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
