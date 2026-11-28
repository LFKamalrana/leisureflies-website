export const maldivesPlanNote = 'Each example uses three nights at one resort so you can compare the villas over the same four days. Ask for any length of stay. Your written quote will name the resort, villa, meal plan and return airport transfer, and show which services are covered.';

const departure = 'Check out and take the resort transfer arranged for your return flight from Malé.';
const confirmTravel = 'Check the flights, taxes and meal plan in your quote, plus the return transfer by speedboat, seaplane or domestic flight and boat.';

export const maldivesRoutes = [{
  slug: 'maldives-villas',
  name: 'Compare the four villa options',
  quoteRoute: 'Maldives',
  packages: [
    {
      title: 'Garden villa', slug: 'garden-villa', nights: 3,
      photo: { src: '/img/holidays/garden-villa.webp', width: 900, height: 514 },
      difference: 'Stay among the island’s gardens and walk to the shared beach. Choose this if you expect to spend most of the day exploring the resort.',
      days: [
        'Transfer from Malé airport to the resort, check into your garden villa and find the path to the beach.',
        'Spend the morning at the resort beach, then walk the island’s garden paths back to your villa.',
        'Leave the day free for the lagoon or ask the dive centre about an optional guided snorkelling trip.',
        departure,
      ],
      inclusions: ['A stay in the garden villa category for the nights in your booking, with access to the resort beach.'],
      exclusions: ['A beachfront or overwater room and a private pool are upgrades.', 'Guided snorkelling and equipment hire are extras unless listed in your quote.'],
      confirm: ['Ask how far the villa is from the beach and which shared facilities you can use.', confirmTravel],
    },
    {
      title: 'Beach villa', slug: 'beach-villa', nights: 3,
      photo: { src: '/img/holidays/beach-villa.webp', width: 900, height: 636 },
      difference: 'Stay on the beachfront so it is easy to go back and forth between your room and the sand. The stretch of beach and its outlook depend on the resort.',
      days: [
        'Take your resort transfer, settle into your beach villa and explore the shoreline beside your room.',
        'Enjoy a slow morning by the water, return to the villa for a break and head back to the beach at sunset.',
        'Keep another day for the beach or ask the resort to arrange an optional kayak outing or private beach dinner.',
        departure,
      ],
      inclusions: ['A stay in the beachfront villa category for the nights in your booking, with the beach close to your room.'],
      exclusions: ['A private pool, kayak hire and private beach dining are extras unless specifically included in your quote.'],
      confirm: ['Ask about the position of the villa, steps to the sand and any sunrise or sunset preference.', confirmTravel],
    },
    {
      title: 'Water villa', slug: 'water-villa', nights: 3,
      photo: { src: '/img/holidays/water-villa.webp', width: 494, height: 750 },
      difference: 'Sleep over the lagoon in a villa on stilts. This suits travellers who want water views from the room and are happy to walk along a jetty to the island beach.',
      days: [
        'Transfer to the island and follow the jetty to your water villa. Ask the resort team about lagoon access at your villa.',
        'Enjoy the lagoon views from your villa, then walk back along the jetty for an afternoon on the beach.',
        'Watch the water from your villa or book an optional guided reef excursion with the resort.',
        departure,
      ],
      inclusions: ['Overwater villa accommodation for the nights in your booking, with views across the water.'],
      exclusions: ['A private pool and guided reef trips are extras unless specified in your quote.'],
      confirm: ['Check whether this villa has steps into the lagoon and whether the resort accepts children of the ages travelling.', confirmTravel],
    },
    {
      title: 'Villa with pool', slug: 'villa-with-pool', nights: 3,
      photo: { src: '/img/holidays/pool-villa.webp', width: 900, height: 600 },
      difference: 'Choose this for a pool reserved for your villa. Pool villas can be in the gardens, on the beach or over water, so ask for the setting you prefer.',
      days: [
        'Take your transfer to the resort, check into your pool villa and spend the rest of the day by your own pool.',
        'Set aside a morning for a private swim. If the resort offers floating breakfast, you can request it as an extra.',
        'Walk to the resort beach for a change of scene, then return for a quiet afternoon by your pool.',
        departure,
      ],
      inclusions: ['Villa accommodation with a private pool for the nights in your booking.'],
      exclusions: ['Floating breakfast, spa treatments and private dinners are extras unless listed in your quote.'],
      confirm: ['Ask for the villa’s exact setting, pool size and depth, and any pool safety features you need.', confirmTravel],
    },
  ],
}];
