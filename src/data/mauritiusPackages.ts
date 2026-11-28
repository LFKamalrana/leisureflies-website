export const mauritiusPlanNote = 'Compare the same four nights and five days at three hotel standards. Each plan shows one way to spend your time. You can request the North Tour, South Tour or Île aux Cerfs outing with any category. Your written quote will confirm the hotel, meals, transfers and excursions for your dates.';

const north = 'Explore Port Louis on the North Tour. Take in the city from the Citadelle, visit Aapravasi Ghat and finish at Le Caudan Waterfront.';
const south = 'Head south to Trou aux Cerfs crater and Ganga Talao. Continue to Chamarel for the waterfall and the Seven Coloured Earths.';
const island = 'Take a boat to Île aux Cerfs for a beach day on the lagoon. Ask which crossings and island activities your quote covers.';
const departure = 'Check out and allow time for the journey to the airport before your flight home.';
const transport = 'Check flights, airport transfers, tour transport, boat crossings and entrance tickets in your written quote.';

export const mauritiusRoutes = [{
  slug: 'mauritius-hotels',
  name: 'Compare 3-, 4- and 5-star stays',
  quoteRoute: 'Mauritius',
  packages: [
    {
      title: '3-Star Hotels', slug: '3-star-hotels', nights: 4,
      difference: 'A practical base for days out. If you plan to tour every day, look first at the hotel’s location, excursion pickup point and nearby places to eat.',
      days: [
        'Arrive in Mauritius and check into your hotel. Walk around the neighbourhood to find dinner and your pickup point for the morning.',
        north, south, island, departure,
      ],
      inclusions: ['Accommodation at the named 3-star hotel in the room category and for the nights shown in your booking.'],
      exclusions: ['Meals outside the booked meal plan, personal shopping and watersports booked on the island.'],
      confirm: ['Ask about breakfast times on tour days, walking distance to the beach and hotel pickup for each outing.', transport],
    },
    {
      title: '4-Star Hotels', slug: '4-star-hotels', nights: 4,
      difference: 'A good fit for a mix of sightseeing and hotel time. Compare the pools, beach access and on-site dining at the properties on your shortlist.',
      days: [
        'Arrive and check into your hotel. Explore the grounds and choose where you would like to eat after your first tour.',
        south, island,
        'Keep a day free for the hotel pool or a nearby beach. If you prefer a day in town, request the North Tour to Port Louis instead.',
        departure,
      ],
      inclusions: ['Accommodation at the named 4-star hotel in the room category and for the nights shown in your booking.'],
      exclusions: ['Drinks and restaurant upgrades outside your meal plan, plus any activities you book separately.'],
      confirm: ['Ask which restaurants your meal plan covers, how you reach the beach and which pool or leisure facilities guests can use.', transport],
    },
    {
      title: '5-Star Hotels', slug: '5-star-hotels', nights: 4,
      difference: 'Choose this if the hotel itself is a highlight. Compare room layouts and views, restaurant choice and the level of service you want during a resort day.',
      days: [
        'Arrive and settle into your hotel. Ask the team about restaurant reservations and the best place on the property to enjoy the evening.',
        north,
        'Spend a full day at the resort. Reserve a spa treatment or a special dinner if you would like to add one to your stay.',
        'Choose a boat outing to Île aux Cerfs or request the South Tour for the volcanic scenery at Chamarel.',
        departure,
      ],
      inclusions: ['Accommodation at the named 5-star hotel in the room category and for the nights shown in your booking.'],
      exclusions: ['Suite upgrades, spa treatments, private dining and private excursions are extras unless your quote includes them.'],
      confirm: ['Check the room view, board basis, restaurant reservations and any honeymoon benefits for your dates.', transport],
    },
  ],
}];
