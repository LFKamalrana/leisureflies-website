export const kashmirPlanNote = 'All three sample itineraries start and finish in Srinagar and allow for a houseboat on the first night. Choose your package on WhatsApp for a written quote confirming the stays, sightseeing and transfers for your dates.';

const days = {
  arrival: 'Arrive in Srinagar and settle in. Take your included one-hour shikara ride on Dal Lake. Overnight in Srinagar.',
  gulmarg: 'Drive to Gulmarg and explore the hill station. If you want to ride the Gondola, ask us to confirm tickets for this day. Overnight in Gulmarg.',
  pahalgam: 'Travel from Gulmarg to Pahalgam. After check-in, spend the rest of the day around town and the Lidder River. Overnight in Pahalgam.',
  pahalgamFullDay: 'Spend a full day in Pahalgam without changing hotels. Walk by the river or request an outing to Aru Valley. We confirm local sightseeing taxis in your written quote. Overnight in Pahalgam.',
  returnToSrinagar: 'Return from Pahalgam to Srinagar. Leave the afternoon for local sightseeing along the Dal Lake waterfront. Overnight in Srinagar.',
  srinagarGardens: 'Use the extra day for Srinagar’s Mughal gardens, such as Nishat Bagh, with time afterwards to browse the old-city markets. Overnight in Srinagar.',
  departure: 'Check out in Srinagar and leave for the airport in time for your onward flight.',
};

const inclusions = [
  'A one-hour shikara ride on Dal Lake in Srinagar.',
  'Local sightseeing in Srinagar, Gulmarg and Pahalgam.',
];

const exclusions = [
  'Personal shopping, souvenirs and meals you arrange yourself.',
  'Extra activities or excursions you book independently during free time.',
];

const confirm = [
  'Gulmarg Gondola tickets and local sightseeing taxis in Pahalgam are confirmed with your written quote.',
  'Check the hotels or houseboat, meal plan, flights, airport transfers and garden entry tickets covered for your dates.',
];

export const kashmirRoutes = [
  {
    slug: 'kashmir',
    name: 'Srinagar, Gulmarg and Pahalgam',
    quoteRoute: 'Srinagar + Gulmarg + Pahalgam',
    packages: [
      {
        nights: 4,
        nightsByCity: '2 nights in Srinagar · 1 night in Gulmarg · 1 night in Pahalgam',
        difference: 'Stay overnight in all three places, with a shikara ride in Srinagar and local sightseeing in Gulmarg and Pahalgam.',
        days: [days.arrival, days.gulmarg, days.pahalgam, days.returnToSrinagar, days.departure],
        inclusions,
        exclusions,
        confirm,
      },
      {
        nights: 5,
        nightsByCity: '3 nights in Srinagar · 1 night in Gulmarg · 1 night in Pahalgam',
        difference: 'Add a night in Srinagar for a full day visiting the Mughal gardens and old-city markets before your flight home.',
        days: [days.arrival, days.gulmarg, days.pahalgam, days.returnToSrinagar, days.srinagarGardens, days.departure],
        inclusions,
        exclusions,
        confirm,
      },
      {
        nights: 6,
        nightsByCity: '3 nights in Srinagar · 1 night in Gulmarg · 2 nights in Pahalgam',
        difference: 'Keep the extra Srinagar day and add a second night in Pahalgam for a full day in the Lidder Valley.',
        days: [days.arrival, days.gulmarg, days.pahalgam, days.pahalgamFullDay, days.returnToSrinagar, days.srinagarGardens, days.departure],
        inclusions,
        exclusions,
        confirm,
      },
    ],
  },
];
