export interface GpxPoint {
  lat: number;
  lng: number;
  elevation?: number;
}

export interface GpxTrack {
  name: string;
  points: GpxPoint[];
  totalDistance: number;
  totalElevationGain: number;
}

/**
 * Parse GPX XML string and extract track points
 */
export function parseGpx(gpxString: string): GpxTrack | null {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(gpxString, 'text/xml');

    // Get track name
    const nameElement = xmlDoc.querySelector('trk > name') || xmlDoc.querySelector('name');
    const name = nameElement?.textContent || 'Unnamed Track';

    // Get all track points
    const trackPoints = xmlDoc.querySelectorAll('trkpt');
    const points: GpxPoint[] = [];

    trackPoints.forEach((point) => {
      const lat = parseFloat(point.getAttribute('lat') || '0');
      const lng = parseFloat(point.getAttribute('lon') || '0');
      const eleElement = point.querySelector('ele');
      const elevation = eleElement ? parseFloat(eleElement.textContent || '0') : undefined;

      if (lat && lng) {
        points.push({ lat, lng, elevation });
      }
    });

    // Calculate total distance and elevation gain
    let totalDistance = 0;
    let totalElevationGain = 0;

    for (let i = 1; i < points.length; i++) {
      totalDistance += calculateDistance(points[i - 1], points[i]);

      if (points[i].elevation && points[i - 1].elevation) {
        const elevDiff = points[i].elevation! - points[i - 1].elevation!;
        if (elevDiff > 0) {
          totalElevationGain += elevDiff;
        }
      }
    }

    return {
      name,
      points,
      totalDistance: Math.round(totalDistance * 10) / 10,
      totalElevationGain: Math.round(totalElevationGain),
    };
  } catch (error) {
    console.error('Error parsing GPX:', error);
    return null;
  }
}

/**
 * Calculate distance between two points using Haversine formula
 */
function calculateDistance(point1: GpxPoint, point2: GpxPoint): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(point2.lat - point1.lat);
  const dLng = toRad(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) *
      Math.cos(toRad(point2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Simplify track points to reduce rendering load
 * Uses Douglas-Peucker algorithm simplified version
 */
export function simplifyTrack(points: GpxPoint[], tolerance: number = 0.0001): GpxPoint[] {
  if (points.length <= 2) return points;

  // Find the point with the maximum distance
  let maxDistance = 0;
  let maxIndex = 0;

  for (let i = 1; i < points.length - 1; i++) {
    const distance = perpendicularDistance(
      points[i],
      points[0],
      points[points.length - 1]
    );

    if (distance > maxDistance) {
      maxDistance = distance;
      maxIndex = i;
    }
  }

  // If max distance is greater than tolerance, recursively simplify
  if (maxDistance > tolerance) {
    const left = simplifyTrack(points.slice(0, maxIndex + 1), tolerance);
    const right = simplifyTrack(points.slice(maxIndex), tolerance);

    return [...left.slice(0, -1), ...right];
  }

  return [points[0], points[points.length - 1]];
}

function perpendicularDistance(
  point: GpxPoint,
  lineStart: GpxPoint,
  lineEnd: GpxPoint
): number {
  const dx = lineEnd.lng - lineStart.lng;
  const dy = lineEnd.lat - lineStart.lat;

  const numerator = Math.abs(
    dy * point.lng - dx * point.lat + lineEnd.lng * lineStart.lat - lineEnd.lat * lineStart.lng
  );
  const denominator = Math.sqrt(dy * dy + dx * dx);

  return numerator / denominator;
}

/**
 * Convert points array to Leaflet LatLng array format
 */
export function toLatLngArray(points: GpxPoint[]): [number, number][] {
  return points.map((p) => [p.lat, p.lng]);
}
