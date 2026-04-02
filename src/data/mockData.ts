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

const RULES_IMG = '/DBB App · Rules _ Pics';

export const mockRegulations = [
  {
    id: '1',
    category: 'Basic Rules',
    items: [
      {
        id: '1-1',
        title: '1. Wear a helmet',
        content: 'In a group, not wearing a helmet puts extra liability on others in case the non-wearer gets a head injury — whether through one\'s own fault or somebody else\'s.\nThus, wearing a helmet is a matter of baseline respect for the others, even though you\'re not going to crash.',
      },
      {
        id: '1-2',
        title: '2. Come on a road or gravel bike',
        content: 'The narrow handlebars let us ride closer to each other — two abreast and when overtaking. This leaves more space for maneuvers.\nMoreover, road bars don\'t tend to get caught on each other. And in case of a crash the rear-facing bar ends are less likely to cause injuries.\n\nPlease don\'t ride any of these in the group:\n• time-trial, triathlon bikes, or with clip-on bars\n• flat-bar or other bikes with wide handlebars\n• fixed-gear bikes without at least a front brake\n• bikes with malfunctions (e.g. a failed brake)',
      },
    ],
  },
  {
    id: '2',
    category: 'Traffic Laws',
    items: [
      {
        id: '2-1',
        title: '3. No drunk riding',
        content: 'The tolerated blood alcohol limit for cyclists in Serbia is 0.2 mg/ml.\nA beer should be fine, but two or more may put you in jail. The police do check cyclists, even if rarely. And they will certainly test in case of a traffic accident.',
      },
      {
        id: '2-2',
        title: '4. Use lights when appropriate',
        content: 'A non-blinking white light at the front and a red one at the back must be attached to the bicycle and turned on when it\'s dark, foggy, or raining.\nPlease avoid brightly blinking rear lights in the group when there\'s no particular reason for those. In the daytime the group is clearly visible from behind.',
      },
      {
        id: '2-3',
        title: '5. No stereo',
        content: 'Riding with earphones in both ears is prohibited by law.\nIn the group, please don\'t listen to music at all, including through a single earphone, open-ear or bone-conducting headphones, or a portable speaker.\nYou should be able to hear the others, and they have the right not to share your music tastes, no matter how good they are.',
      },
      {
        id: '2-4',
        title: '6. Full traffic laws guide',
        content: 'There is a comprehensive and constantly updated guide on the Serbian traffic laws by Bike Gremlin.',
      },
    ],
  },
  {
    id: '3',
    category: 'Etiquette',
    items: [
      {
        id: '3-1',
        title: '7. Don\'t overtake the pacer',
        content: 'Some of our rides are paced by a ride leader. Please do not overtake him or her without a really good reason.',
      },
      {
        id: '3-2',
        title: '8. Use hand signals',
        content: 'Cycling etiquette assumes the riders in front of you show potholes & other stuff by hand gestures — and you pass those further on to people behind.\n\n• A pothole large enough to cause a flat tyre is shown by pointing down (or flicking the same-side elbow while keeping both hands on the bar).\n• Pointing to the side horizontally or upwards is a turn signal.\n• If there\'s a risk of collision (with a car, pedestrian, parking post, etc.), wave away from the danger with the hand behind your back.\n• Obstacles that we cannot go around (speed bumps or rail tracks) are shown by swinging either hand on your side (but not behind your back).',
        image: `${RULES_IMG}/0-signs.png`,
      },
      {
        id: '3-3',
        title: '9. Don\'t slow down without reason',
        content: 'All your moves in the group should be smooth and predictable. Try to never brake or even stop pedaling. If you start coasting suddenly, that may slow you down enough to cause a disastrous chain reaction behind you.\nParticularly, there is no reason to coast after you see the sign for a speed bump or rail tracks — instead of trying to increase the space in front of you, try shifting to the side (see the checkerboard pattern tip below).',
      },
      {
        id: '3-4',
        title: '10. Be self-sufficient',
        content: 'You should have all you may need in case of a puncture or mechanical failure: a spare tube and/or tyre plugs, a minipump or other inflating device, a multitool. You\'re supposed to know how to fix a flat tyre without resorting to others\' help (even though we always help each other).\nOn longer rides, it makes sense to carry some carbs and a couple of bottles of water or electrolytes. It\'s also a good idea to have a charged-up phone with an internet connection and some emergency cash.',
      },
      {
        id: '3-5',
        title: '11. Take and share pictures',
        content: 'We encourage you to take photos & videos during our rides, provided that doesn\'t endanger you or others (particularly when riding with one or no hands on the bars — and please no long selfie sticks in the group).\nPlease share your photos & videos in DBB chats on Telegram, WhatsApp & Viber.\nBy doing so, you grant us your irrevocable consent to use them in any imaginable way (but mostly on our Instagram).\nBy coming to our events and riding with the group, you agree to be filmed, and you grant us your irrevocable consent to use images of you in any imaginable way. Thanks!',
      },
    ],
  },
  {
    id: '4',
    category: 'Tips',
    items: [
      {
        id: '4-1',
        title: '12. Distance to the rider in front',
        content: 'The closer you are behind another rider, the easier it is for you to keep the pace, due to the lesser air resistance. The difference can be huge! Staying in the draft is the key to not struggling with the pace.\nThere is no need to be centimeters-close if you don\'t feel comfortable doing so. About half a meter is a good distance that is safe enough, but will also let you have most of the aero benefit.',
        image: `${RULES_IMG}/1-distance.png`,
      },
      {
        id: '4-2',
        title: '13. Riding in a checkerboard pattern',
        content: 'If the rider in front of you skips hand signals or you\'re not comfortable being right on their wheel for another reason, consider shifting to the outside of the group by about half a meter. There\'ll still be plenty of draft.\nThat way, you\'ll see obstacles farther in front of you, and the cyclist behind will also get some space in front of them for extra reaction time. Such spacing also works well before speed bumps and rail tracks.',
        image: `${RULES_IMG}/2-shift.png`,
      },
      {
        id: '4-3',
        title: '14. Never overlap wheels',
        content: 'It\'s important to not overlap your wheels with the rider in front. If it\'s them who has shifted outside, stay where you are relative to them to maintain the checkerboard order — don\'t squeeze them out!\nAlso, avoid riding three abreast: that doesn\'t allow the person in the middle to freely maneuver and avoid obstacles.\nWhen standing up on the pedals, be careful not to suddenly roll back your bike underneath you into the wheel of the cyclist behind. Show your intention by double-flicking both your elbows a few seconds before standing up, then shift your weight up smoothly.',
        image: `${RULES_IMG}/3-overlap.png`,
      },
      {
        id: '4-4',
        title: '15. Catching up after a turn or a stop',
        content: 'After a corner or a traffic light, the group will inevitably stretch. The ride leader should gain speed gradually, allowing each member of the group to catch up. Don\'t rush, but also don\'t hesitate.\nWhen catching up, imagine you are a boat that wants to "moor" to the rider in front without much of a delay — but without brakes. Try to close the distance, but do it without sudden changes in speed.\nIf you happen to overshoot, try not to brake, but shift sideways more than half a meter. You will lose the draft, and the air will slow you down softly, so the rider in the back will not run into you.',
        image: `${RULES_IMG}/4-overshoot.png`,
      },
      {
        id: '4-5',
        title: '16. Sidewind positioning',
        content: 'If there is sidewind, it may be difficult to keep the pace, as the draft is compromised. First, it\'s easier to be in the line that is away from the wind. Also, you can try shifting a bit sideways from it if there\'s enough space on the road.',
        image: `${RULES_IMG}/5-wind.png`,
      },
      {
        id: '4-6',
        title: '17. Don\'t get left behind accidentally',
        content: 'If you have a puncture, or just cannot keep riding at the pace of the group, don\'t worry. Say loud and clear that you need to slow down or stop. As soon as this is passed on to the ride leader, he or she will do just that.\nSpecific to DBB rides — if everyone around is accelerating suddenly, don\'t feel that you must do that. We have certain segments where some people push hard, but then they wait for the rest. Live location is on the WhatsApp.',
      },
      {
        id: '4-7',
        title: '18. Use the best tyres you can',
        content: 'Of all your bike components, tyres are by far the most important for maintaining speed in the group. Apart from that, we all benefit if one doesn\'t puncture all the time or crash in a slippery turn.\n\nRecommended gravel tyres:\n• Hutchinson Caracal RACE (avoid the model without the word race)\n• Tufo Thundero or Speedero (both are equally good, no need for HD)\n\nRecommended road tyres:\n• Pirelli P Zero Race RS (RS is also a distinctive part of the name)\n• Continental Grand Prix 5000 S TR\n\nImportantly, inflate your tyres to the optimal pressure, not the one indicated on the sidewall or advised to you anecdotally. We suggest using tyre pressure calculators from Silca or Wolftooth.',
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