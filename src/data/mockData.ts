import type { Event } from '@/app/components/cards/EventCard';
import type { Shop } from '@/app/components/cards/ShopCard';

// Track data has been migrated to Supabase — see scripts/seed-tracks.cjs

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
