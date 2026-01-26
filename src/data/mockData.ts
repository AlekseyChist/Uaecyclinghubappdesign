import type { Track } from '@/app/components/cards/TrackCard';
import type { Event } from '@/app/components/cards/EventCard';
import type { Shop } from '@/app/components/cards/ShopCard';

export const mockTracks: Track[] = [
  {
    id: '1',
    name: 'Al Qudra Loop',
    region: 'Dubai',
    distance: 86,
    elevation: 45,
    difficulty: 'easy',
    surface: 'road',
    thumbnail: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&h=300&fit=crop',
    isFavorite: false,
    coordinates: { lat: 24.8607, lng: 55.2094 },
  },
  {
    id: '2',
    name: 'Jebel Jais Summit',
    region: 'Ras Al Khaimah',
    distance: 32,
    elevation: 1250,
    difficulty: 'hard',
    surface: 'road',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    isFavorite: true,
    coordinates: { lat: 25.9574, lng: 56.1339 },
  },
  {
    id: '3',
    name: 'Hatta Mountain Trail',
    region: 'Dubai',
    distance: 18,
    elevation: 320,
    difficulty: 'medium',
    surface: 'gravel',
    thumbnail: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop',
    isFavorite: false,
    coordinates: { lat: 24.8030, lng: 56.1281 },
  },
  {
    id: '4',
    name: 'Yas Island Circuit',
    region: 'Abu Dhabi',
    distance: 12,
    elevation: 25,
    difficulty: 'easy',
    surface: 'road',
    thumbnail: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
    isFavorite: false,
    coordinates: { lat: 24.4672, lng: 54.6031 },
  },
  {
    id: '5',
    name: 'Al Wathba Wetlands',
    region: 'Abu Dhabi',
    distance: 24,
    elevation: 15,
    difficulty: 'easy',
    surface: 'mixed',
    thumbnail: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop',
    isFavorite: false,
    coordinates: { lat: 24.2544, lng: 54.6394 },
  },
  {
    id: '6',
    name: 'Jebel Hafeet Climb',
    region: 'Al Ain',
    distance: 24,
    elevation: 1100,
    difficulty: 'hard',
    surface: 'road',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    isFavorite: true,
    coordinates: { lat: 24.0667, lng: 55.7833 },
  },
  {
    id: '7',
    name: 'DBB CR 2.0 LONG',
    region: 'Serbia',
    distance: 78,
    elevation: 320,
    difficulty: 'medium',
    surface: 'road',
    thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop',
    isFavorite: false,
    coordinates: { lat: 44.80535, lng: 20.44608 },
  },
  {
    id: '8',
    name: 'DBB CR 5.0 EPIC',
    region: 'Serbia',
    distance: 98,
    elevation: 450,
    difficulty: 'hard',
    surface: 'road',
    thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop',
    isFavorite: false,
    coordinates: { lat: 44.80536, lng: 20.44608 },
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'UAE Tour Challenge',
    date: '2026-02-15',
    time: '06:00 AM',
    location: 'Dubai Autodrome',
    type: 'race',
    distanceOptions: ['60km', '100km', '160km'],
    status: 'upcoming',
    isSaved: false,
  },
  {
    id: '2',
    name: 'Al Qudra Gran Fondo',
    date: '2026-03-08',
    time: '07:00 AM',
    location: 'Al Qudra Lakes',
    type: 'granfondo',
    distanceOptions: ['50km', '86km'],
    status: 'upcoming',
    isSaved: true,
  },
  {
    id: '3',
    name: 'Friday Group Ride - Abu Dhabi',
    date: '2026-01-17',
    time: '06:30 AM',
    location: 'Yas Marina Circuit',
    type: 'group-ride',
    status: 'upcoming',
    isSaved: false,
  },
  {
    id: '4',
    name: 'Jebel Jais Hill Climb',
    date: '2026-04-12',
    time: '08:00 AM',
    location: 'Ras Al Khaimah',
    type: 'race',
    distanceOptions: ['32km'],
    status: 'sold-out',
    isSaved: false,
  },
  {
    id: '5',
    name: 'Desert Century',
    date: '2026-05-20',
    time: '05:30 AM',
    location: 'Al Ain',
    type: 'granfondo',
    distanceOptions: ['100km', '160km'],
    status: 'canceled',
    isSaved: false,
  },
];

export const mockShops: Shop[] = [
  {
    id: '1',
    name: 'Wolfi\'s Bike Shop',
    category: 'Bike Shop & Service',
    description: 'Premium bikes, parts, and professional service. Specialized dealer with expert mechanics.',
    location: 'Dubai Marina',
    website: 'https://example.com',
  },
  {
    id: '2',
    name: 'Revolution Cycles',
    category: 'Bike Shop',
    description: 'Road and mountain bikes from top brands. Full range of accessories and cycling gear.',
    location: 'Abu Dhabi',
    website: 'https://example.com',
  },
  {
    id: '3',
    name: 'Bike Hub UAE',
    category: 'Service & Repairs',
    description: 'Expert bike servicing, custom builds, and fitting services. Same-day repairs available.',
    location: 'Dubai Sports City',
    website: 'https://example.com',
  },
  {
    id: '4',
    name: 'Pedal Power',
    category: 'Sponsor',
    description: 'Supporting the UAE cycling community through events and rider programs.',
    website: 'https://example.com',
  },
  {
    id: '5',
    name: 'Cycle Safe UAE',
    category: 'Sponsor',
    description: 'Promoting cycling safety and awareness across the Emirates.',
    website: 'https://example.com',
  },
];

export const mockRegulations = [
  {
    id: '1',
    category: 'Road Safety',
    items: [
      {
        id: '1-1',
        title: 'Cycling Lanes',
        content: 'Always use designated cycling lanes where available. Stay in single file when riding on roads.',
      },
      {
        id: '1-2',
        title: 'Traffic Rules',
        content: 'Obey all traffic signals and signs. Cyclists must follow the same rules as motor vehicles.',
      },
      {
        id: '1-3',
        title: 'Road Position',
        content: 'Ride on the right side of the road. Keep a safe distance from parked vehicles to avoid door collisions.',
      },
    ],
  },
  {
    id: '2',
    category: 'Group Ride Etiquette',
    items: [
      {
        id: '2-1',
        title: 'Paceline Protocol',
        content: 'Maintain steady speed when leading. Signal before pulling off. Avoid sudden braking.',
      },
      {
        id: '2-2',
        title: 'Communication',
        content: 'Call out hazards, turns, and stops. Use hand signals for turning and slowing down.',
      },
      {
        id: '2-3',
        title: 'Group Size',
        content: 'Large groups should split into smaller packs of 8-12 riders for safety and traffic flow.',
      },
    ],
  },
  {
    id: '3',
    category: 'Required Equipment',
    items: [
      {
        id: '3-1',
        title: 'Helmet',
        content: 'Helmets are mandatory for all riders. Ensure proper fit and certification standards.',
      },
      {
        id: '3-2',
        title: 'Lights',
        content: 'Front white light and rear red light required for low-light conditions. Recommended for all rides.',
      },
      {
        id: '3-3',
        title: 'Reflective Gear',
        content: 'Wear bright, reflective clothing to increase visibility, especially during dawn and dusk.',
      },
    ],
  },
  {
    id: '4',
    category: 'Shared Paths',
    items: [
      {
        id: '4-1',
        title: 'Pedestrian Priority',
        content: 'Pedestrians have right of way on shared paths. Ring bell and announce when passing.',
      },
      {
        id: '4-2',
        title: 'Speed Control',
        content: 'Reduce speed on crowded paths. Maximum 20 km/h on most shared pathways.',
      },
    ],
  },
  {
    id: '5',
    category: 'Desert Heat Guidelines',
    items: [
      {
        id: '5-1',
        title: 'Hydration',
        content: 'Carry at least 2 water bottles. Drink regularly, not just when thirsty. Consider electrolyte drinks.',
      },
      {
        id: '5-2',
        title: 'Timing',
        content: 'Avoid riding between 11 AM - 3 PM during summer months. Early morning rides (before 7 AM) recommended.',
      },
      {
        id: '5-3',
        title: 'Sun Protection',
        content: 'Use sunscreen SPF 50+, wear UV-protective clothing, and sunglasses. Watch for heat exhaustion symptoms.',
      },
    ],
  },
  {
    id: '6',
    category: 'Emergency Information',
    items: [
      {
        id: '6-1',
        title: 'Emergency Numbers',
        content: 'Police: 999, Ambulance: 998. Always carry ID and emergency contact information.',
      },
      {
        id: '6-2',
        title: 'Breakdown Kit',
        content: 'Carry spare tube, tire levers, multi-tool, pump or CO2, and basic first aid supplies.',
      },
    ],
  },
];

export interface TrackDetail extends Track {
  description: string;
  safetyNotes: string;
  estimatedTime: string;
  photos: string[];
  startPoint: { lat: number; lng: number };
  endPoint: { lat: number; lng: number };
}

export const mockTrackDetails: Record<string, TrackDetail> = {
  '1': {
    ...mockTracks[0],
    description: 'The iconic Al Qudra cycling track is a must-ride for every cyclist in Dubai. This flat, well-maintained loop circles the beautiful Al Qudra Lakes, offering stunning desert scenery and occasional wildlife sightings.',
    safetyNotes: 'Best ridden early morning (5-7 AM) to avoid heat. Watch for sand on the road after windy days. Stay hydrated - no water stops on route.',
    estimatedTime: '3h 30min',
    photos: [
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop',
    ],
    startPoint: { lat: 24.8607, lng: 55.2094 },
    endPoint: { lat: 24.8607, lng: 55.2094 },
  },
  '2': {
    ...mockTracks[1],
    description: 'Jebel Jais Summit is the ultimate climbing challenge in the UAE. This demanding ascent rewards riders with breathtaking mountain views and the satisfaction of conquering the highest peak in the Emirates.',
    safetyNotes: 'Start early - road is steep with sharp hairpins. Carry warm clothing for descent. Check weather conditions before riding. Limited mobile coverage in some areas.',
    estimatedTime: '2h 15min',
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop',
    ],
    startPoint: { lat: 25.9574, lng: 56.1339 },
    endPoint: { lat: 25.9574, lng: 56.1339 },
  },
  '3': {
    ...mockTracks[2],
    description: 'Hatta Mountain Trail offers an exciting off-road adventure through rocky terrain and wadi landscapes. Perfect for gravel and mountain bike enthusiasts looking for technical challenges.',
    safetyNotes: 'Technical terrain requires good bike handling skills. Carry extra water and repair kit. Inform someone of your route. Best avoided during summer months.',
    estimatedTime: '1h 45min',
    photos: [
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop',
    ],
    startPoint: { lat: 24.8030, lng: 56.1281 },
    endPoint: { lat: 24.8030, lng: 56.1281 },
  },
  '4': {
    ...mockTracks[3],
    description: 'A smooth, flat circuit around Yas Island\'s famous Formula 1 track. Perfect for beginners and training rides with well-maintained paths and scenic waterfront views.',
    safetyNotes: 'Watch for pedestrians on shared paths. Circuit is well-lit for evening rides. Water fountains available around the island.',
    estimatedTime: '45min',
    photos: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop',
    ],
    startPoint: { lat: 24.4672, lng: 54.6031 },
    endPoint: { lat: 24.4672, lng: 54.6031 },
  },
  '5': {
    ...mockTracks[4],
    description: 'A peaceful ride through the Al Wathba Wetlands Reserve, combining paved and packed gravel paths. Great for wildlife watching and photography while cycling.',
    safetyNotes: 'Respect wildlife areas. Paths can be narrow in some sections. Best visited during cooler months. Bring binoculars for flamingo watching!',
    estimatedTime: '1h 30min',
    photos: [
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop',
    ],
    startPoint: { lat: 24.2544, lng: 54.6394 },
    endPoint: { lat: 24.2544, lng: 54.6394 },
  },
  '6': {
    ...mockTracks[5],
    description: 'The legendary Jebel Hafeet climb is one of the greatest road cycling challenges in the region. 60 hairpin bends lead to spectacular panoramic views from the summit.',
    safetyNotes: 'Extremely challenging climb - assess your fitness level. Start very early to avoid heat. Descend with caution - road can be windy. Emergency services available at summit.',
    estimatedTime: '2h 30min',
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    ],
    startPoint: { lat: 24.0667, lng: 55.7833 },
    endPoint: { lat: 24.0667, lng: 55.7833 },
  },
  '7': {
    ...mockTracks[6],
    description: 'DBB CR 2.0 LONG is a scenic 78km road cycling route through the beautiful Serbian countryside. Features rolling hills, charming villages, and several cafe stops for refueling.',
    safetyNotes: 'Group ride - stay with the pack. POI stops: km 30 Shelby cafe, km 40 101 Ruza cafe, km 54 Dea bakery, km 78 Supertramp lunch. Estimated time: 3-4 hours.',
    estimatedTime: '3h 30min',
    photos: [
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop',
    ],
    startPoint: { lat: 44.80535, lng: 20.44608 },
    endPoint: { lat: 44.80535, lng: 20.44608 },
  },
  '8': {
    ...mockTracks[7],
    description: 'DBB CR 5.0 EPIC is the ultimate challenge - a 98km epic route through Serbia. This demanding ride takes you through diverse terrain with spectacular views and rewarding cafe stops.',
    safetyNotes: 'Advanced riders only. POI stops: km 33 PerSu store, km 69 Gomex store, km 97 Dilemma brewery lunch. Estimated time: 3.5-4.5 hours. Bring sufficient nutrition and hydration.',
    estimatedTime: '4h 00min',
    photos: [
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop',
    ],
    startPoint: { lat: 44.80536, lng: 20.44608 },
    endPoint: { lat: 44.80536, lng: 20.44608 },
  },
};