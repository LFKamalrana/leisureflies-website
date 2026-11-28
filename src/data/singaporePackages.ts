export const singaporePlanNote = 'The three- and four-night options are city stays. The five-night option divides the trip between Singapore and a cruise. These are sample plans. Your written quote will confirm the hotel, transfers and attraction tickets, plus the sailing and cabin for a cruise holiday.';

const cityArrival = 'Arrive in Singapore and check in. With an early arrival, take a city tour past the Merlion at Marina Bay and visit the SkyPark Observation Deck during a non-peak time slot. A later flight may change the order.';
const studios = 'Spend a full day at Universal Studios Singapore on Sentosa, with time to explore the themed areas and choose your rides.';
const sentosa = 'Ride the cable car to Sentosa, leave the afternoon free for the beach and finish with the Wings of Time Fireworks Symphony at Siloso Beach.';
const departure = 'Check out of your Singapore hotel and travel to Changi Airport for your flight home.';
const cityTours = 'City sightseeing, a non-peak SkyPark visit, a Universal Studios day, and a Sentosa outing with the cable car and Wings of Time in this sample plan.';
const cityExtras = 'Universal Express passes, personal shopping and meals outside your booked meal plan.';
const cityConfirm = 'Check your hotel and room, breakfast, flights, visa assistance, airport transfers, private or shared sightseeing and the exact admission tickets for your dates.';

export const singaporeRoutes = [{
  slug: 'singapore',
  name: 'City stays and Singapore with a cruise',
  quoteRoute: 'Singapore city',
  packages: [
    {
      nights: 3, quoteLabel: '3 nights / 4 days',
      nightsByCity: '3 nights in Singapore',
      difference: 'A short city break with two full days for Sentosa. Use one for Universal Studios and the other for the cable car, beach and evening show.',
      days: [cityArrival, studios, sentosa, departure],
      inclusions: ['Three nights in Singapore when booked with accommodation.', cityTours],
      exclusions: [cityExtras, 'Extra attractions such as Night Safari are booked separately.'],
      confirm: [cityConfirm],
    },
    {
      nights: 4, quoteLabel: '4 nights / 5 days',
      nightsByCity: '4 nights in Singapore',
      difference: 'Keep both Sentosa days and add a full day at your own pace. Spend it in Chinatown or use it for the conservatories at Gardens by the Bay.',
      days: [
        cityArrival, studios, sentosa,
        'Explore Chinatown at your own pace. If you prefer Gardens by the Bay, request Flower Dome and Cloud Forest tickets for this free day.',
        departure,
      ],
      inclusions: ['Four nights in Singapore when booked with accommodation, with one day free.', cityTours],
      exclusions: [cityExtras, 'Tickets and transport for optional activities on the free day, including the Gardens by the Bay conservatories, unless added to your quote.'],
      confirm: [cityConfirm],
    },
    {
      nights: 5, quoteRoute: 'Singapore + Cruise',
      nightsByCity: 'Sample split · 3 nights in Singapore and 2 nights aboard',
      difference: 'Combine city sightseeing with two nights aboard on a suitable sailing. In this example, the ship becomes your base after three hotel nights.',
      days: [
        'Arrive at Changi Airport, check into your Singapore hotel and spend the evening along the Marina Bay waterfront.',
        'Visit Gardens by the Bay for the Flower Dome and Cloud Forest, then take in the skyline from the SkyPark Observation Deck.',
        studios,
        'Check out of your hotel and head to the cruise terminal for your assigned boarding time. Settle into your cabin for the first night aboard.',
        'Spend the day aboard, or explore ashore if your sailing has a port call. Return to your cabin for the second night.',
        'Disembark in Singapore. Allow time for immigration and the journey to Changi Airport before your onward flight.',
      ],
      inclusions: ['Singapore hotel stay and cruise accommodation in the cabin category named in your combined quote.', 'The sample land programme visits Gardens by the Bay, SkyPark and Universal Studios Singapore.'],
      exclusions: ['Optional shore excursions, speciality dining, drinks packages and onboard purchases unless your cruise fare expressly covers them.'],
      confirm: ['Request the ship, sailing dates, night split, ports and cabin category for your travel dates. Check the onboard meals, port taxes and gratuities covered.', 'Confirm flights, visas, attraction admissions and transfers between the airport, hotel and cruise terminal.'],
    },
  ],
}];
