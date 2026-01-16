const fs = require('fs');
const path = require('path');

// Simple GPX parser for Node.js
function parseGpx(gpxString) {
  const points = [];
  const trkptRegex = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)"[^>]*>[\s\S]*?<ele>([^<]*)<\/ele>[\s\S]*?<\/trkpt>/g;

  let match;
  while ((match = trkptRegex.exec(gpxString)) !== null) {
    points.push({
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
      elevation: parseFloat(match[3])
    });
  }

  // Get track name
  const nameMatch = gpxString.match(/<trk>[\s\S]*?<name>([^<]*)<\/name>/);
  const name = nameMatch ? nameMatch[1] : 'Unnamed';

  return { name, points };
}

// Douglas-Peucker simplification
function simplifyTrack(points, tolerance = 0.0005) {
  if (points.length <= 2) return points;

  let maxDistance = 0;
  let maxIndex = 0;

  const first = points[0];
  const last = points[points.length - 1];

  for (let i = 1; i < points.length - 1; i++) {
    const distance = perpendicularDistance(points[i], first, last);
    if (distance > maxDistance) {
      maxDistance = distance;
      maxIndex = i;
    }
  }

  if (maxDistance > tolerance) {
    const left = simplifyTrack(points.slice(0, maxIndex + 1), tolerance);
    const right = simplifyTrack(points.slice(maxIndex), tolerance);
    return [...left.slice(0, -1), ...right];
  }

  return [first, last];
}

function perpendicularDistance(point, lineStart, lineEnd) {
  const dx = lineEnd.lng - lineStart.lng;
  const dy = lineEnd.lat - lineStart.lat;
  const numerator = Math.abs(
    dy * point.lng - dx * point.lat + lineEnd.lng * lineStart.lat - lineEnd.lat * lineStart.lng
  );
  const denominator = Math.sqrt(dy * dy + dx * dx);
  return denominator === 0 ? 0 : numerator / denominator;
}

// Calculate distance using Haversine formula
function calculateDistance(points) {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const R = 6371;
    const dLat = toRad(points[i].lat - points[i-1].lat);
    const dLng = toRad(points[i].lng - points[i-1].lng);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(points[i-1].lat)) * Math.cos(toRad(points[i].lat)) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    total += R * c;
  }
  return Math.round(total * 10) / 10;
}

function toRad(deg) {
  return deg * Math.PI / 180;
}

// Calculate elevation gain
function calculateElevationGain(points) {
  let gain = 0;
  for (let i = 1; i < points.length; i++) {
    const diff = points[i].elevation - points[i-1].elevation;
    if (diff > 0) gain += diff;
  }
  return Math.round(gain);
}

// Main
const dataDir = path.join(__dirname, '..', 'src', 'data');
const gpxFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.gpx'));

const routes = {};

console.log('Parsing GPX files...\n');

gpxFiles.forEach(file => {
  const filePath = path.join(dataDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { name, points } = parseGpx(content);

  console.log(`File: ${file}`);
  console.log(`  Name: ${name}`);
  console.log(`  Points: ${points.length}`);

  // Simplify for display
  const simplified = simplifyTrack(points, 0.0003);
  console.log(`  Simplified: ${simplified.length} points`);

  const distance = calculateDistance(points);
  const elevation = calculateElevationGain(points);
  console.log(`  Distance: ${distance} km`);
  console.log(`  Elevation: ${elevation} m`);

  // Get start point
  const start = points[0];
  console.log(`  Start: ${start.lat.toFixed(4)}, ${start.lng.toFixed(4)}`);
  console.log('');

  const key = file.replace('.gpx', '').replace(/[^a-zA-Z0-9]/g, '_');
  routes[key] = {
    fileName: file,
    name,
    distance,
    elevation,
    startPoint: { lat: start.lat, lng: start.lng },
    points: simplified.map(p => [p.lat, p.lng])
  };
});

// Generate TypeScript file
let output = `/**
 * Auto-generated route data from GPX files
 * Generated on: ${new Date().toISOString()}
 */

export interface GpxRouteData {
  fileName: string;
  name: string;
  distance: number;
  elevation: number;
  startPoint: { lat: number; lng: number };
  points: [number, number][];
}

export const gpxRoutes: Record<string, GpxRouteData> = {\n`;

Object.entries(routes).forEach(([key, data]) => {
  output += `  '${key}': {\n`;
  output += `    fileName: '${data.fileName}',\n`;
  output += `    name: '${data.name}',\n`;
  output += `    distance: ${data.distance},\n`;
  output += `    elevation: ${data.elevation},\n`;
  output += `    startPoint: { lat: ${data.startPoint.lat}, lng: ${data.startPoint.lng} },\n`;
  output += `    points: [\n`;
  data.points.forEach(p => {
    output += `      [${p[0]}, ${p[1]}],\n`;
  });
  output += `    ],\n`;
  output += `  },\n`;
});

output += `};\n\n`;

// Add mapping to track IDs
output += `// Mapping GPX routes to track IDs in mockData
export const gpxToTrackMapping: Record<string, string> = {
  'Al_Qudra_stick_loop_Extension_1and2': '1', // Al Qudra Loop
  'JabelHafeet': '6', // Jebel Hafeet Climb
  'Morning_Ride': '4', // Could be Yas Island area
  'Lunch_Ride': '5', // Could be Al Wathba area
  'MaydantoKite': '3', // Could be Hatta area
};

// Get route for a track ID
export function getRouteForTrack(trackId: string): [number, number][] | undefined {
  const entry = Object.entries(gpxToTrackMapping).find(([_, id]) => id === trackId);
  if (entry) {
    const [gpxKey] = entry;
    return gpxRoutes[gpxKey]?.points;
  }
  return undefined;
}
`;

const outputPath = path.join(dataDir, 'gpxRouteData.ts');
fs.writeFileSync(outputPath, output);
console.log(`Generated: ${outputPath}`);
