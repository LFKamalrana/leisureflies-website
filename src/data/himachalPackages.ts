export const himachalPlanNote = 'All four packages visit Shimla and Manali. The night splits and stops below are sample plans. Pickup and drop-off are agreed for each booking. Options include Chandigarh Airport, Amritsar Airport, Ambala Cantt railway station or another agreed point. Share your timings so we can plan the first and last road journeys.';

const arrival = 'Travel from your agreed pickup point to Shimla and check in. If you arrive early enough, walk along the Ridge to Christ Church and Mall Road.';
const kufri = 'Head out to Kufri for the hill views, then return to Shimla. Spend the evening browsing the shops on Mall Road.';
const shimla = 'Explore Shimla at a gentler pace. Start at the Ridge and Christ Church, then visit Summer Hill or the State Museum depending on opening hours.';
const transfer = 'Set aside the day for the mountain drive from Shimla to Manali. Check in and leave the evening free after the journey.';
const manali = 'Visit Hadimba Devi Temple among the cedars, then explore Old Manali on foot. Return to town for the evening.';
const solang = 'Take a day trip from Manali to Solang Valley for the mountain scenery, subject to road conditions. Ask about any seasonal activities you would like to book separately.';
const departure = 'Check out in Manali and allow the day for the drive to your agreed drop-off point. Plan your onward connection around the road journey.';
const exclusions = [
  'Shopping, personal expenses and meals outside your booked meal plan.',
  'Adventure activities, equipment hire and entrance tickets unless specifically included in your written quote.',
];
const confirm = [
  'Your written quote confirms hotels, room types, meal plan, pickup and drop-off points, vehicle arrangements and the sightseeing covered.',
];

export const himachalRoutes = [{
  slug: 'himachal',
  name: 'Shimla and Manali',
  quoteRoute: 'Shimla + Manali',
  packages: [
    {
      nights: 3,
      nightsByCity: '1 night in Shimla · 2 nights in Manali',
      difference: 'A short introduction to both towns. Shimla is an overnight stop before the drive to Manali, where you have one full day for local sights.',
      days: [arrival, transfer, manali, departure],
      inclusions: ['Three nights of accommodation across Shimla and Manali, with local sightseeing as agreed in your quote.'],
      exclusions, confirm,
    },
    {
      nights: 4,
      nightsByCity: '2 nights in Shimla · 2 nights in Manali',
      difference: 'Add a second Shimla night for a full day around Kufri. Keep the Manali sightseeing day and both nights there.',
      days: [arrival, kufri, transfer, manali, departure],
      inclusions: ['Four nights of accommodation across Shimla and Manali. The sample sightseeing route adds Kufri.'],
      exclusions, confirm,
    },
    {
      nights: 6,
      nightsByCity: '3 nights in Shimla · 3 nights in Manali',
      difference: 'Add one night in each town. Explore Shimla separately from the Kufri outing, then use the extra Manali day for Solang Valley.',
      days: [arrival, shimla, kufri, transfer, manali, solang, departure],
      inclusions: ['Six nights of accommodation across Shimla and Manali. The sample plan allows separate sightseeing days for Shimla town, Kufri, Manali town and Solang Valley.'],
      exclusions, confirm,
    },
    {
      nights: 9,
      nightsByCity: '4 nights in Shimla · 5 nights in Manali',
      difference: 'Add three days to the six-night route. There is time for a Kalka–Shimla railway outing, a day around Naggar and a flexible day in Manali.',
      days: [
        arrival, shimla, kufri,
        'Use the extra Shimla day for a short ride on the Kalka–Shimla toy train if tickets are available. Alternatively, stay in town and explore the lanes of Lakkar Bazaar.',
        transfer, manali, solang,
        'Spend a day around Naggar in the Kullu Valley. Explore the village and ask about a visit to Naggar Castle before returning to Manali.',
        'Keep a day free in Manali. If you prefer a Rohtang Pass excursion, ask us to check road access, permits and local vehicle arrangements for your dates.',
        departure,
      ],
      inclusions: ['Nine nights of accommodation across Shimla and Manali. The sample includes time for Naggar and a flexible day before departure.'],
      exclusions: [...exclusions, 'Toy train tickets and the optional Rohtang Pass excursion, including permits and any local vehicle, unless added to the quote.'],
      confirm,
    },
  ],
}];
