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
  image?: string;
}

export interface RegulationCategory {
  id: string;
  category: string;
  items: RegulationItem[];
}

const RULES_IMG = '/DBB App \u00b7 Rules _ Pics';

export const mockRegulations: RegulationCategory[] = [
  {
    id: 'basic-rules',
    category: 'Basic Rules',
    items: [
      {
        id: 'basic-1',
        title: '1. We ask you to wear a helmet',
        content: 'In a group, not wearing a helmet puts extra liability on others in case the non-wearer gets a head injury \u2014 whether through one\u2019s own fault or somebody else\u2019s.\nThus, wearing a helmet is a matter of baseline respect for the others, even though you\u2019re not going to crash.',
      },
      {
        id: 'basic-2',
        title: '2. Come on a road or gravel bike',
        content: 'The narrow handlebars let us ride closer to each other \u2014 two abreast and when overtaking. This leaves more space for maneuvers.\nMoreover, road bars don\u2019t tend to get caught on each other. And in case of a crash the rear-facing bar ends are less likely to cause injuries.\n\nPlease don\u2019t ride any of these in the group:\n\u2022 time-trial, triathlon bikes, or with clip-on bars\n\u2022 flat-bar or other bikes with wide handlebars\n\u2022 fixed-gear bikes without at least a front brake\n\u2022 bikes with malfunctions (e.g. a failed brake)',
      },
    ],
  },
  {
    id: 'traffic-laws',
    category: 'Traffic Laws',
    items: [
      {
        id: 'traffic-1',
        title: '3. No drunk riding',
        content: 'The tolerated blood alcohol limit for cyclists in Serbia is 0.2 mg/ml.\nA beer should be fine, but two or more may put you in jail. The police do check cyclists, even if rarely. And they will certainly test in case of a traffic accident.',
      },
      {
        id: 'traffic-2',
        title: '4. Use lights when appropriate',
        content: 'A non-blinking white light at the front and a red one at the back must be attached to the bicycle and turned on when it\u2019s dark, foggy, or raining.\nPlease avoid brightly blinking rear lights in the group when there\u2019s no particular reason for those. In the daytime the group is clearly visible from behind.',
      },
      {
        id: 'traffic-3',
        title: '5. No stereo',
        content: 'Riding with earphones in both ears is prohibited by law.\nIn the group, please don\u2019t listen to music at all, including through a single earphone, open-ear or bone-conducting headphones, or a portable speaker.\nYou should be able to hear the others, and they have the right not to share your music tastes, no matter how good they are.',
      },
      {
        id: 'traffic-4',
        title: '6. See the full traffic laws guide',
        content: 'There is a comprehensive and constantly updated guide on the Serbian traffic laws by Bike Gremlin.',
      },
    ],
  },
  {
    id: 'etiquette',
    category: 'Etiquette',
    items: [
      {
        id: 'etiq-1',
        title: '7. Don\u2019t overtake the pacer',
        content: 'Some of our rides are paced by a ride leader. Please do not overtake him or her without a really good reason.',
      },
      {
        id: 'etiq-2',
        title: '8. Use hand signals',
        content: 'Cycling etiquette assumes the riders in front of you show potholes & other stuff by hand gestures \u2014 and you pass those further on to people behind.\n\n\u2022 A pothole large enough to cause a flat tyre is shown by pointing down (or flicking the same-side elbow while keeping both hands on the bar).\n\u2022 Pointing to the side horizontally or upwards is a turn signal.\n\u2022 If there\u2019s a risk of collision (with a car, pedestrian, parking post, etc.), wave away from the danger with the hand behind your back.\n\u2022 Obstacles that we cannot go around (speed bumps or rail tracks) are shown by swinging either hand on your side (but not behind your back).',
        image: `${RULES_IMG}/0-signs.png`,
      },
      {
        id: 'etiq-3',
        title: '9. Don\u2019t slow down without reason',
        content: 'All your moves in the group should be smooth and predictable. Try to never brake or even stop pedaling. If you start coasting suddenly, that may slow you down enough to cause a disastrous chain reaction behind you.\nParticularly, there is no reason to coast after you see the sign for a speed bump or rail tracks \u2014 instead of trying to increase the space in front of you, try shifting to the side (see the checkerboard pattern tip below).',
      },
      {
        id: 'etiq-4',
        title: '10. Be self-sufficient',
        content: 'You should have all you may need in case of a puncture or mechanical failure: a spare tube and/or tyre plugs, a minipump or other inflating device, a multitool. You\u2019re supposed to know how to fix a flat tyre without resorting to others\u2019 help (even though we always help each other).\nOn longer rides, it makes sense to carry some carbs and a couple of bottles of water or electrolytes. It\u2019s also a good idea to have a charged-up phone with an internet connection and some emergency cash.',
      },
      {
        id: 'etiq-5',
        title: '11. Take and share pictures',
        content: 'We encourage you to take photos & videos during our rides, provided that doesn\u2019t endanger you or others (particularly when riding with one or no hands on the bars \u2014 and please no long selfie sticks in the group).\nPlease share your photos & videos in DBB chats on Telegram, WhatsApp & Viber.\nBy doing so, you grant us your irrevocable consent to use them in any imaginable way (but mostly on our Instagram).\nBy coming to our events and riding with the group, you agree to be filmed, and you grant us your irrevocable consent to use images of you in any imaginable way. Thanks!',
      },
    ],
  },
  {
    id: 'tips',
    category: 'Tips',
    items: [
      {
        id: 'tip-1',
        title: '12. Distance to the rider in front',
        content: 'The closer you are behind another rider, the easier it is for you to keep the pace, due to the lesser air resistance. The difference can be huge! Staying in the draft is the key to not struggling with the pace.\nThere is no need to be centimeters-close if you don\u2019t feel comfortable doing so. About half a meter is a good distance that is safe enough, but will also let you have most of the aero benefit.',
        image: `${RULES_IMG}/1-distance.png`,
      },
      {
        id: 'tip-2',
        title: '13. Riding in a checkerboard pattern',
        content: 'If the rider in front of you skips hand signals or you\u2019re not comfortable being right on their wheel for another reason, consider shifting to the outside of the group by about half a meter. There\u2019ll still be plenty of draft.\nThat way, you\u2019ll see obstacles farther in front of you, and the cyclist behind will also get some space in front of them for extra reaction time. Such spacing also works well before speed bumps and rail tracks.',
        image: `${RULES_IMG}/2-shift.png`,
      },
      {
        id: 'tip-3',
        title: '14. Never overlap wheels',
        content: 'It\u2019s important to not overlap your wheels with the rider in front. If it\u2019s them who has shifted outside, stay where you are relative to them to maintain the checkerboard order \u2014 don\u2019t squeeze them out!\nAlso, avoid riding three abreast: that doesn\u2019t allow the person in the middle to freely maneuver and avoid obstacles.\nWhen standing up on the pedals, be careful not to suddenly roll back your bike underneath you into the wheel of the cyclist behind. Show your intention by double-flicking both your elbows a few seconds before standing up, then shift your weight up smoothly.',
        image: `${RULES_IMG}/3-overlap.png`,
      },
      {
        id: 'tip-4',
        title: '15. Catching up after a turn or a stop',
        content: 'After a corner or a traffic light, the group will inevitably stretch. The ride leader should gain speed gradually, allowing each member of the group to catch up. Don\u2019t rush, but also don\u2019t hesitate.\nWhen catching up, imagine you are a boat that wants to \u201cmoor\u201d to the rider in front without much of a delay \u2014 but without brakes. Try to close the distance, but do it without sudden changes in speed.\nIf you happen to overshoot, try not to brake, but shift sideways more than half a meter. You will lose the draft, and the air will slow you down softly, so the rider in the back will not run into you.',
        image: `${RULES_IMG}/4-overshoot.png`,
      },
      {
        id: 'tip-5',
        title: '16. Sidewind positioning',
        content: 'If there is sidewind, it may be difficult to keep the pace, as the draft is compromised. First, it\u2019s easier to be in the line that is away from the wind. Also, you can try shifting a bit sideways from it if there\u2019s enough space on the road.',
        image: `${RULES_IMG}/5-wind.png`,
      },
      {
        id: 'tip-6',
        title: '17. Don\u2019t get left behind accidentally',
        content: 'If you have a puncture, or just cannot keep riding at the pace of the group, don\u2019t worry. Say loud and clear that you need to slow down or stop. As soon as this is passed on to the ride leader, he or she will do just that.\nSpecific to DBB rides \u2014 if everyone around is accelerating suddenly, don\u2019t feel that you must do that. We have certain segments where some people push hard, but then they wait for the rest. Live location is on the WhatsApp.',
      },
      {
        id: 'tip-7',
        title: '18. Use the best tyres you can',
        content: 'Of all your bike components, tyres are by far the most important for maintaining speed in the group. Apart from that, we all benefit if one doesn\u2019t puncture all the time or crash in a slippery turn.\n\nRecommended gravel tyres:\n\u2022 Hutchinson Caracal RACE (avoid the model without the word race)\n\u2022 Tufo Thundero or Speedero (both are equally good, no need for HD)\n\nRecommended road tyres:\n\u2022 Pirelli P Zero Race RS (RS is also a distinctive part of the name)\n\u2022 Continental Grand Prix 5000 S TR\n\nImportantly, inflate your tyres to the optimal pressure, not the one indicated on the sidewall or advised to you anecdotally. We suggest using tyre pressure calculators from Silca or Wolftooth.',
      },
    ],
  },
];
