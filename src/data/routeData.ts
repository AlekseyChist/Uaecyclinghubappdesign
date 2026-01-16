/**
 * Sample route data for demonstration
 * These are simplified routes - real GPX files will have more detail
 */

export interface RouteData {
  trackId: string;
  points: [number, number][]; // [lat, lng]
}

// Al Qudra Loop - simplified route around the lakes
export const alQudraRoute: [number, number][] = [
  [24.8607, 55.2094], // Start point
  [24.8650, 55.2150],
  [24.8700, 55.2200],
  [24.8750, 55.2280],
  [24.8800, 55.2350],
  [24.8850, 55.2400],
  [24.8900, 55.2350],
  [24.8950, 55.2280],
  [24.9000, 55.2200],
  [24.9050, 55.2100],
  [24.9000, 55.2000],
  [24.8900, 55.1900],
  [24.8800, 55.1850],
  [24.8700, 55.1900],
  [24.8650, 55.1950],
  [24.8607, 55.2094], // Back to start
];

// Yas Island Circuit - loop around Yas Island
export const yasIslandRoute: [number, number][] = [
  [24.4672, 54.6031], // Start near Yas Marina
  [24.4700, 54.6100],
  [24.4750, 54.6150],
  [24.4800, 54.6100],
  [24.4850, 54.6050],
  [24.4900, 54.6000],
  [24.4850, 54.5950],
  [24.4800, 54.5900],
  [24.4750, 54.5950],
  [24.4700, 54.6000],
  [24.4672, 54.6031], // Back to start
];

// Jebel Hafeet Climb - mountain road
export const jebelHafeetRoute: [number, number][] = [
  [24.0667, 55.7833], // Start at base
  [24.0600, 55.7800],
  [24.0550, 55.7750],
  [24.0500, 55.7700],
  [24.0450, 55.7650],
  [24.0400, 55.7600],
  [24.0350, 55.7550],
  [24.0300, 55.7500],
  [24.0250, 55.7450],
  [24.0200, 55.7400],
  [24.0150, 55.7350], // Summit area
];

// Jebel Jais Summit - RAK mountain
export const jebelJaisRoute: [number, number][] = [
  [25.9574, 56.1339], // Start
  [25.9600, 56.1400],
  [25.9650, 56.1450],
  [25.9700, 56.1500],
  [25.9750, 56.1550],
  [25.9800, 56.1600],
  [25.9850, 56.1650],
  [25.9900, 56.1700],
  [25.9950, 56.1750], // Near summit
];

// Hatta Mountain Trail - gravel trail
export const hattaRoute: [number, number][] = [
  [24.8030, 56.1281], // Start
  [24.8080, 56.1320],
  [24.8120, 56.1380],
  [24.8150, 56.1420],
  [24.8100, 56.1480],
  [24.8050, 56.1520],
  [24.8000, 56.1480],
  [24.7950, 56.1420],
  [24.7980, 56.1350],
  [24.8030, 56.1281], // Loop back
];

// Al Wathba Wetlands
export const alWathbaRoute: [number, number][] = [
  [24.2544, 54.6394], // Start
  [24.2580, 54.6450],
  [24.2620, 54.6500],
  [24.2660, 54.6450],
  [24.2700, 54.6400],
  [24.2660, 54.6350],
  [24.2620, 54.6300],
  [24.2580, 54.6350],
  [24.2544, 54.6394], // Back to start
];

// Map of track IDs to routes
export const trackRoutes: Record<string, [number, number][]> = {
  '1': alQudraRoute,
  '2': jebelJaisRoute,
  '3': hattaRoute,
  '4': yasIslandRoute,
  '5': alWathbaRoute,
  '6': jebelHafeetRoute,
};
