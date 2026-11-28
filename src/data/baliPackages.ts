export const baliPlanNote = 'The night splits and day order are examples. Choose a package on WhatsApp for a written quote confirming your hotels, travel dates and tour arrangements.';

const arrival = 'Arrive at Bali’s airport and take a private transfer to Ubud. Settle in for your first night.';
const kintamani = 'Head to Kintamani for views of Mount Batur. Visit Cantik Coffee Plantation, Tegalalang Rice Terraces and Tukad Cepung Falls before returning to Ubud.';
const uluwatu = 'Spend the day on a private watersports and Uluwatu Temple outing. Return to Kuta for the night.';
const departure = 'Check out and take your private transfer from the Kuta area to Bali’s airport.';
const transfers = 'Private airport transfers on arrival and departure.';
const exclusions = [
  'Personal shopping, drinks and meals you order independently.',
  'Extra activities and excursions you book during free time.',
];
const arrangements = 'Your written quote will specify hotels, meal plan, flights, transfers between hotels and any entry tickets covered.';
const watersports = 'Check which watersports rides and equipment are covered before booking.';

export const baliRoutes = [{
  slug: 'ubud-kuta',
  name: 'Ubud and Kuta',
  quoteRoute: 'Ubud + Kuta',
  packages: [
    {
      nights: 4,
      quoteLabel: 'Ubud + Kuta — 4 nights / 5 days',
      nightsByCity: '2 nights in Ubud · 2 nights in Kuta',
      difference: 'Three private touring days cover the Kintamani highlands, the lakes around Bedugul and the coast at Uluwatu.',
      days: [
        arrival, kintamani,
        'Explore Bedugul’s Beratan Temple and Bali Botanical Garden, with photo stops at Handara Gate and the Twin Lake View Point. Finish the day in Kuta.',
        uluwatu, departure,
      ],
      inclusions: [
        'Private Kintamani tour with Mount Batur views, Cantik Coffee Plantation, Tegalalang Rice Terraces and Tukad Cepung Falls.',
        'Private Bedugul tour with Beratan Temple, Bali Botanical Garden and both photo stops.',
        'Private full-day watersports and Uluwatu Temple tour.', transfers,
      ],
      exclusions,
      confirm: [arrangements, watersports],
    },
    {
      nights: 5,
      quoteLabel: 'Ubud + Kuta — 5 nights / 6 days',
      nightsByCity: '2 nights in Ubud · 3 nights in North Kuta',
      difference: 'The extra coast night makes room for West Nusa Penida with lunch. The mainland tours also change to Ubud’s terraces and falls, East Bali and a Kecak dance at Uluwatu.',
      days: [
        arrival,
        'Travel east to Lempuyang Temple, then visit Amed Beach before returning to Ubud.',
        'Visit Alas Harum, Tegalalang Rice Terraces and Tibumana Falls. Move to North Kuta for the next three nights.',
        'Join the shared West Nusa Penida day tour from your North Kuta hotel. Lunch is included on the island outing.',
        'Explore Garuda Wisnu Kencana Cultural Park and Melasti Beach. End the tour at Uluwatu Temple with a Kecak dance.',
        departure,
      ],
      inclusions: [
        'Shared West Nusa Penida tour from a North Kuta hotel, with lunch.',
        'Private Ubud tour with Alas Harum, Tegalalang Rice Terraces and Tibumana Falls.',
        'Private tour of Lempuyang Temple and Amed Beach.',
        'Private tour of Garuda Wisnu Kencana Cultural Park, Melasti Beach and Uluwatu Temple with Kecak dance.', transfers,
      ],
      exclusions,
      confirm: [arrangements, 'Confirm your North Kuta pickup point and the boat arrangements for the island day.'],
    },
    {
      nights: 6,
      quoteLabel: 'Ubud + Kuta — 6 nights / 7 days',
      nightsByCity: '3 nights in Ubud · 3 nights in Kuta',
      difference: 'Stay a third night in Ubud for its market and craft villages. Four private mainland tours replace the five-night programme, including its island outing, and leave a day free in Kuta.',
      days: [
        arrival, kintamani,
        'Browse Ubud Art Market, visit the silversmiths’ village of Celuk and explore the woodcarving village of Mas. Overnight in Ubud.',
        'Visit Taman Ayun Temple, Alas Kedaton Monkey Forest and Tanah Lot Temple on a private tour. Continue to Kuta for the night.',
        uluwatu,
        'Spend the day at your own pace in Kuta. Walk along the beach or enjoy the day at your hotel.',
        departure,
      ],
      inclusions: [
        'Private Kintamani tour with Mount Batur views, Cantik Coffee Plantation, Tegalalang Rice Terraces and Tukad Cepung Falls.',
        'Private shopping tour of Ubud Art Market, Celuk and Mas.',
        'Private full-day tour of Tanah Lot Temple, Alas Kedaton Monkey Forest and Taman Ayun Temple.',
        'Private full-day watersports and Uluwatu Temple tour.', transfers,
      ],
      exclusions,
      confirm: [arrangements, watersports],
    },
  ],
}];
