export const sriLankaPlanNote = 'All three packages follow the same route from Kandy through the tea country of Nuwara Eliya to the coast at Bentota. The night splits and sightseeing below are examples. Your written quote will confirm the hotels, meals, transport and admission tickets for your dates.';

const arrival = 'Arrive at Colombo airport and travel inland to Kandy. After check-in, take a walk beside Kandy Lake if your flight leaves time.';
const hills = 'Drive from Kandy into the tea country. Break the journey for a view of Ramboda Falls before checking in at Nuwara Eliya.';
const templeAndHills = 'Start with the Temple of the Sacred Tooth Relic in Kandy, then drive through the tea country to Nuwara Eliya. Stop for a view of Ramboda Falls if time allows.';
const hillDay = 'Spend the day in Nuwara Eliya without changing hotels. Request a morning tea estate visit to see how the leaves are processed, then enjoy a lakeside walk at Gregory Lake.';
const coast = 'Set aside the day for the road journey from Nuwara Eliya to Bentota. Check in by the coast and leave the evening free.';
const beach = 'Enjoy a full day in Bentota. Walk along the beach or ask about a boat trip on the Bentota River if you would like to spend the morning on the water.';
const departure = 'Check out in Bentota and travel to Colombo airport for your return flight.';

const extras = 'Personal shopping, meals outside your booked meal plan and activities you arrange independently.';
const beachExtras = 'The optional Bentota River boat trip and watersports unless added to your quote.';
const confirm = [
  'Check the hotels, room types, night split and meal plan for your dates.',
  'Ask which airport transfers, intercity journeys, driver or guide services and admission tickets are covered. Check flights and travel insurance separately.',
];

export const sriLankaRoutes = [{
  slug: 'sri-lanka',
  name: 'Kandy, Nuwara Eliya and Bentota',
  quoteRoute: 'Kandy + Nuwara Eliya + Bentota',
  packages: [
    {
      nights: 4,
      nightsByCity: '1 night in Kandy · 1 night in Nuwara Eliya · 2 nights in Bentota',
      difference: 'See the temple and tea country on the journey between hotels, then spend a full day by the sea in Bentota.',
      days: [arrival, templeAndHills, coast, beach, departure],
      inclusions: ['Four nights of accommodation across Kandy, Nuwara Eliya and Bentota, with two nights on the coast in this sample.'],
      exclusions: [extras, beachExtras],
      confirm,
    },
    {
      nights: 5,
      nightsByCity: '1 night in Kandy · 2 nights in Nuwara Eliya · 2 nights in Bentota',
      difference: 'Add a second night in Nuwara Eliya for a full day around the tea estates and Gregory Lake. Keep the full beach day in Bentota.',
      days: [arrival, templeAndHills, hillDay, coast, beach, departure],
      inclusions: ['Five nights of accommodation across the three stops, with a full day in Nuwara Eliya and a full day in Bentota in this sample.'],
      exclusions: [extras, beachExtras, 'Tea estate tours and lake activities unless listed in your booking.'],
      confirm,
    },
    {
      nights: 6,
      nightsByCity: '2 nights in Kandy · 2 nights in Nuwara Eliya · 2 nights in Bentota',
      difference: 'Add a second night in Kandy. Visit the temple and the gardens at Peradeniya on a dedicated sightseeing day before heading into the hills.',
      days: [
        arrival,
        'Visit the Temple of the Sacred Tooth Relic in the morning. Spend the afternoon walking the avenues of the Royal Botanic Gardens at Peradeniya, then return to Kandy for the night.',
        hills, hillDay, coast, beach, departure,
      ],
      inclusions: ['Six nights of accommodation across the three stops. The sample gives you two nights in each place and a full day to explore each one.'],
      exclusions: [extras, beachExtras, 'Garden admission, guided tea estate tours and lake activities unless listed in your booking.'],
      confirm,
    },
  ],
}];
