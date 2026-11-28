export const thailandPlanNote = 'These sample plans show how you could spend each night. The longer options add time to explore at your own pace. Choose a route and duration on WhatsApp for a price and a written itinerary for your dates.';

const sharedTerms = {
  inclusions: [
    'Private airport transfers on arrival and departure.',
    'Temple sightseeing and a ticketed island or coral excursion on your route.',
  ],
  exclusions: [
    'Personal shopping and souvenirs.',
    'Activities you book independently during free time.',
  ],
  confirm: [
    'Ask which flights, hotels and meals your quote covers.',
    'Check the intercity transfer, excursion stops, boat type and any park or admission fees for your dates.',
  ],
};

const pattaya = {
  arrive: 'Arrive at Bangkok airport. Take a private transfer to Pattaya and settle in. Overnight in Pattaya.',
  island: 'Spend the day on a coral-island excursion from Pattaya. Ko Lan is the suggested island for this plan. Return to Pattaya for the night.',
  free: 'Enjoy an unhurried day in Pattaya. Spend time at Jomtien Beach or keep the day free. Overnight in Pattaya.',
  toBangkok: 'Travel from Pattaya to Bangkok. After check-in, explore your neighbourhood at your own pace. Overnight in Bangkok.',
  temples: 'Explore Bangkok’s temples on the sightseeing tour. Leave the evening free. Overnight in Bangkok.',
  riverside: 'Spend the extra day exploring Bangkok’s riverside at your own pace. You can request a Chao Phraya dinner cruise as an optional addition. Overnight in Bangkok.',
  depart: 'Check out and take a private transfer to Bangkok airport for your return flight.',
};

const phuket = {
  arrive: 'Arrive at Phuket airport. Take a private transfer to your hotel and spend the evening settling in. Overnight in Phuket.',
  temples: 'Visit a Phuket temple on the sightseeing tour. Leave the afternoon for a walk through Phuket Old Town. Overnight in Phuket.',
  free: 'Keep a full day in Phuket for the beach or a slower day at your hotel. Overnight in Phuket.',
  toKrabi: 'Travel from Phuket to Krabi by road. Take an evening stroll in Ao Nang if time allows. Overnight in Krabi.',
  islands: 'Head out on an island excursion from Krabi. The Four Islands circuit is the suggested outing for this plan. Return to Krabi for the night.',
  coast: 'Take an extra day on the Krabi coast. Relax in Ao Nang or ask about an optional boat trip to Railay. Overnight in Krabi.',
  depart: 'Check out and take a private transfer to Krabi airport for your onward flight.',
};

export const thailandRoutes = [
  {
    slug: 'bangkok-pattaya',
    name: 'Bangkok–Pattaya',
    quoteRoute: 'Bangkok-Pattaya',
    packages: [
      {
        nights: 4,
        nightsByCity: '2 nights in Pattaya · 2 nights in Bangkok',
        difference: 'Take a coral-island trip from Pattaya and spend a day visiting Bangkok’s temples.',
        days: [pattaya.arrive, pattaya.island, pattaya.toBangkok, pattaya.temples, pattaya.depart],
        ...sharedTerms,
      },
      {
        nights: 5,
        nightsByCity: '3 nights in Pattaya · 2 nights in Bangkok',
        difference: 'Compared with 4 nights, you gain a full beach day in Pattaya before moving to Bangkok.',
        days: [pattaya.arrive, pattaya.island, pattaya.free, pattaya.toBangkok, pattaya.temples, pattaya.depart],
        ...sharedTerms,
      },
      {
        nights: 6,
        nightsByCity: '3 nights in Pattaya · 3 nights in Bangkok',
        difference: 'Keep the beach day from the 5-night plan and add a day to explore Bangkok’s riverside.',
        days: [pattaya.arrive, pattaya.island, pattaya.free, pattaya.toBangkok, pattaya.temples, pattaya.riverside, pattaya.depart],
        ...sharedTerms,
      },
    ],
  },
  {
    slug: 'phuket-krabi',
    name: 'Phuket–Krabi',
    quoteRoute: 'Phuket-Krabi',
    packages: [
      {
        nights: 4,
        nightsByCity: '2 nights in Phuket · 2 nights in Krabi',
        difference: 'Pair a Phuket temple visit and time in the Old Town with an island excursion from Krabi.',
        days: [phuket.arrive, phuket.temples, phuket.toKrabi, phuket.islands, phuket.depart],
        ...sharedTerms,
      },
      {
        nights: 5,
        nightsByCity: '3 nights in Phuket · 2 nights in Krabi',
        difference: 'Compared with 4 nights, you gain a free day in Phuket between sightseeing and the journey to Krabi.',
        days: [phuket.arrive, phuket.temples, phuket.free, phuket.toKrabi, phuket.islands, phuket.depart],
        ...sharedTerms,
      },
      {
        nights: 6,
        nightsByCity: '3 nights in Phuket · 3 nights in Krabi',
        difference: 'Compared with 5 nights, you keep the extra Phuket day and gain a full day in Krabi after the island excursion.',
        days: [phuket.arrive, phuket.temples, phuket.free, phuket.toKrabi, phuket.islands, phuket.coast, phuket.depart],
        ...sharedTerms,
      },
    ],
  },
];
