export const dubaiPlanNote = 'All three sample itineraries use one hotel base in Dubai. Compare what each extra day adds, then choose a package on WhatsApp for a written quote. We can adjust the order to suit your flights.';

const days = {
  arrival: 'Take an airport transfer to your Dubai hotel and check in. In the evening, have dinner aboard a traditional dhow as it passes the waterfront lights. Overnight in Dubai.',
  city: 'Join a half-day Dubai city tour. Keep the afternoon for Dubai Mall or explore the neighbourhood around your hotel at your own pace. Overnight in Dubai.',
  safari: 'Enjoy a free morning before the afternoon desert safari. Spend the evening at the desert camp for a barbecue dinner, then return to your Dubai hotel.',
  leisure: 'Choose how to spend a full day in Dubai. Walk the lanes of Al Fahidi and browse the souks along Dubai Creek, or ask about a Burj Khalifa observation-deck ticket. Overnight in Dubai.',
  abuDhabi: 'Take a day trip from Dubai to Abu Dhabi with a stop at Ferrari World on Yas Island. Return to your Dubai hotel for the night.',
  departure: 'Check out of your Dubai hotel and take the airport transfer for your return flight.',
};

const inclusions = [
  'Daily breakfast and airport transfers on arrival and departure.',
  'Dubai city tour, dhow dinner cruise and desert safari with a barbecue dinner.',
];

const exclusions = [
  'Personal shopping, souvenirs and meals you arrange independently.',
  'Extra activities and attraction tickets you book on your own during free time.',
];

const confirm = [
  'Hotel and room category, and whether sightseeing and transfers are private or shared.',
  'Any flights, visa assistance or additional entrance tickets you would like in your quote.',
];

export const dubaiRoutes = [
  {
    slug: 'dubai',
    name: 'Dubai city stays',
    quoteRoute: 'Dubai city',
    packages: [
      {
        nights: 3,
        nightsByCity: '3 nights in Dubai',
        difference: 'Fit the dhow dinner cruise, city tour and desert safari into a short stay.',
        days: [days.arrival, days.city, days.safari, days.departure],
        inclusions,
        exclusions,
        confirm,
      },
      {
        nights: 4,
        nightsByCity: '4 nights in Dubai',
        difference: 'Add a full free day after the safari for the souks, the waterfront or an attraction of your choice.',
        days: [days.arrival, days.city, days.safari, days.leisure, days.departure],
        inclusions,
        exclusions,
        confirm,
      },
      {
        nights: 5,
        nightsByCity: '5 nights in Dubai · Day trip to Abu Dhabi',
        quoteRoute: 'Dubai city + Abu Dhabi & Ferrari World',
        difference: 'Keep the free day in Dubai and add Abu Dhabi with a Ferrari World stop. Park admission is confirmed with each quote.',
        days: [days.arrival, days.city, days.safari, days.leisure, days.abuDhabi, days.departure],
        inclusions: [...inclusions, 'Abu Dhabi day trip with a stop at Ferrari World.'],
        exclusions,
        confirm: ['Whether standard Ferrari World park admission is included for your dates.', ...confirm],
      },
    ],
  },
];
