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

export const mockEvents: Event[] = [];

export const mockShops: Shop[] = [
  {
    id: 'planetbike',
    name: 'Planet Bike',
    category: 'Bike Shop & Service',
    description: 'You can ask one of their shops to get what you need from another. We would not use their service.',
    location: 'Belgrade and more',
    link: 'https://planetbike.rs',
    linkLabel: 'planetbike.rs',
    logo: '/shops/planetbike.jpg',
    tabs: ['shops'],
  },
  {
    id: 'probike',
    name: 'Probike',
    category: 'Bike Shop & Service',
    description: 'They now have a second shop on Svetogorska street. We would only use their service in a pinch.',
    location: 'Belgrade',
    link: 'https://probike.rs',
    linkLabel: 'probike.rs',
    logo: '/shops/probike.jpg',
    tabs: ['shops'],
  },
  {
    id: 'sportofis',
    name: 'Sportofis',
    category: 'Bike Shop',
    description: 'A shop close by to both the recommended mechanics. There is a discount if you order online.',
    location: 'Belgrade',
    link: 'https://sportofis.com',
    linkLabel: 'sportofis.com',
    logo: '/shops/sportofis.png',
    tabs: ['shops'],
  },
  {
    id: 'dbb',
    name: 'DBB Bike Rent',
    category: 'Bike Rental',
    description: 'Premium road/gravel bicycles with carbon frames & wheels fitted to your body geometry.',
    location: 'Belgrade',
    link: 'https://dropba.rs/rent',
    linkLabel: 'dropba.rs/rent',
    logo: '/shops/dbb.png',
    tabs: ['shops', 'services'],
  },
  {
    id: 'mihail',
    name: 'Mihail Bajev',
    category: 'Bike Service',
    description: 'A high-level mechanic speaking English and Russian. A 10% service discount for DBB app users.',
    location: 'Belgrade',
    link: 'tel:+381641194005',
    linkLabel: '+381641194005',
    logo: '/shops/mihail.png',
    tabs: ['services'],
    isPersonal: true,
  },
  {
    id: 'marko',
    name: 'Marko Curčić',
    category: 'Bike Service',
    description: 'A high-level mechanic speaking English. He tends to be too busy to also manage appointments.',
    location: 'Belgrade',
    link: 'tel:+381641557332',
    linkLabel: '+381641557332',
    logo: '/shops/marko.png',
    tabs: ['services'],
    isPersonal: true,
  },
  {
    id: 'denis',
    name: 'Denis Chertkov',
    category: 'Sports Massage',
    description: 'A medical rehabilitation and massage therapist. An individual discount for DBB app users.',
    location: 'Belgrade',
    link: 'https://physioscience.ru/en',
    linkLabel: 'physioscience.ru/en',
    logo: '/shops/denis.png',
    tabs: ['services'],
    isPersonal: true,
  },
  {
    id: 'recoverypoint',
    name: 'Recovery Point',
    category: 'Sports Massage',
    description: 'Female and male sports massage therapists. A 20% discount on the first visit for DBB app users.',
    location: 'Belgrade',
    link: 'https://dikidi.net/891836',
    linkLabel: 'dikidi.net/891836',
    logo: '/shops/recoverypoint.jpg',
    tabs: ['services'],
  },
  {
    id: 'sonder',
    name: 'Sonder',
    category: 'Coffee Shop',
    description: 'In Gastrošor they have bike parking, a hose to wash your bike and a floor pump, courtesy of DBB.',
    location: 'Belgrade',
    link: 'https://sonderbelgrade.com',
    linkLabel: 'sonderbelgrade.com',
    logo: '/shops/Sonder Logo.png',
    tabs: ['friends'],
  },
  {
    id: 'dechkotzar',
    name: 'Dechkotzar',
    category: 'Apparel Shop',
    description: 'The coolest Serbian brand where you can buy cycling merch made in collaboration with DBB.',
    location: 'Belgrade',
    link: 'https://dechkotzar.com',
    linkLabel: 'dechkotzar.com',
    logo: '/shops/DechkoTzar Logo.png',
    tabs: ['friends'],
  },
  {
    id: 'chopchop',
    name: 'Chop×Chop',
    category: 'Barber Shop',
    description: 'Park your bike safely at dedicated spots organised by DBB. A 10% discount for DBB app users.',
    location: 'Belgrade',
    link: 'https://chopchop.one/belgrade',
    linkLabel: 'chopchop.one/belgrade',
    logo: '/shops/Chop-Chop Logo.png',
    tabs: ['friends'],
  },
];

export interface RegulationItem {
  id: string;
  title: string;
  content: string;
}

export interface RegulationCategory {
  id: string;
  category: string;
  items: RegulationItem[];
}

export const mockRegulations: RegulationCategory[] = [
  {
    id: 'dbb-rules',
    category: 'DBB Rules',
    items: [
      {
        id: 'dbb-1',
        title: '1. Use a Proper bike',
        content: 'Well, use whatever bike & gear, but if one crashes while riding an improper bike or without a properly fitting helmet, we will presume his or her sole responsibility \u2014 for both potential injuries and material damage \u2014 even if the crash was accidentally caused by another group member. There is a reason.',
      },
      {
        id: 'dbb-2',
        title: '2. Proper are Road & Gravel bikes',
        content: 'Improper bikes for riding in a group are:\n\u2022 time-trial or triathlon bikes, or bikes with attached aerobars,\n\u2022 flat-bar or other bikes with wide handlebars,\n\u2022 fixed-gear bikes without at least a front brake,\n\u2022 bikes with potential or actual significant malfunctions.',
      },
      {
        id: 'dbb-3',
        title: '3. All your picture are belong to us',
        content: 'People make photos & videos during our events and we will use them in any way your imaginary lawyer could imagine \u2014 but mostly in our Instagram \u2014 for which you grant us your irrevocable consent if you happen to be there. Club members have the right of access to all said images.',
      },
      {
        id: 'dbb-4',
        title: '4. You accept the Disclaimer',
        content: 'All the rides are organised by Baranchikov & Partners Ltd, a legal entity that you can sue if anything makes you unhappy. Alexander Baranchikov, the sole proprietor of said entity, will do his best to make you happy, but accepts no personal legal responsibility for that.',
      },
      {
        id: 'dbb-5',
        title: '5. Obey the Rules',
        content: 'If you come to our rides, you accept The Rules. And to enjoy any group ride you should also know the tips.',
      },
    ],
  },
  {
    id: 'traffic-rules',
    category: 'Traffic Rules to Obey',
    items: [
      {
        id: 'traffic-1',
        title: 'No drunk riding',
        content: 'The acceptable blood alcohol limit for cyclists is 0.2 mg/ml (one beer should be just fine).\nArt. 187 p. 3 of the Law',
      },
      {
        id: 'traffic-2',
        title: 'Ride on the road',
        content: 'A bicycle is a vehicle, same as a car. Thus, using pedestrian paths for cycling is forbidden.\nArt. 7 p. 32 of the Law',
      },
      {
        id: 'traffic-3',
        title: 'No earphones',
        content: 'No riding with earphones in both ears. One earphone is okay (but impolite for a group ride).\nArt. 90 p. 7 of the Law',
      },
      {
        id: 'traffic-4',
        title: 'Bicycle lights',
        content: 'Steady lights, white front and red back, shall be used during nighttime, fog, and/or rain.\nArt. 81 p. 5 of the Law',
      },
    ],
  },
  {
    id: 'other-traffic',
    category: 'Other Traffic Rules',
    items: [
      {
        id: 'other-1',
        title: 'Helmet ignorance',
        content: "A helmet on a bicycle is not required by law. According to us, not wearing one on a sporty bike suggests one didn\u2019t use that brain anyway.\nNo provision of the Law",
      },
      {
        id: 'other-2',
        title: 'A meter rule',
        content: "Cyclists should stay within one meter from the right side of the road \u2014 unless turning left, overtaking or avoiding an obstacle. Let\u2019s just say we avoid obstacles all the time.\nArt. 40 p. 1 of the Law",
      },
      {
        id: 'other-3',
        title: 'Always single',
        content: 'In a group, cyclists are obliged to go one after another, not two abreast. For our safety, we tend to ride, legally, in two groups where, according to the law, one overtakes the other slowly but steadily.\nArt. 89 p. 4 of the Law',
      },
      {
        id: 'other-4',
        title: 'Mandatory paths',
        content: "Cyclists are obliged to use a cycling path if there is one, in which case the road should not be used. Said paths are often in such poor state that we can\u2019t even recognise them \u2014 and hence keep on the road.\nArt. 89 p. 1 of the Law",
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