export const vietnamPlanNote = 'All three routes begin in Hanoi and spend a night at Halong Bay. The four-night trip ends in Hanoi. The longer trips finish in Ho Chi Minh City. Use these sample plans to choose your route. Your written quote will specify the accommodation, transport and activities covered for your dates.';

const arrival = 'Arrive in Hanoi and settle in. If your flight allows, walk around Hoan Kiem Lake and explore the Old Quarter before your first night in the city.';
const hanoi = 'Spend the day in Hanoi. Visit the Temple of Literature, then leave the afternoon free for the cafés and food stalls of the Old Quarter.';
const bay = 'Travel by road from Hanoi to Halong Bay for one night. Choose a stay ashore or request an overnight cruise to see the limestone islands from the water.';
const saigon = 'Explore central Ho Chi Minh City, from the Central Post Office to Ben Thanh Market. If you would like to visit the Cu Chi Tunnels, request a half-day excursion and use the rest of the day for the city.';
const flyHome = 'Check out in Ho Chi Minh City and head to the airport for your onward flight.';
const bayDetails = 'Confirm the hotels and rooms, whether your Halong Bay night is ashore or in a cruise cabin, and any boat trips, meals and activities included.';
const extras = 'Personal shopping, meals outside the agreed meal plan and activities you book independently.';

export const vietnamRoutes = [{
  slug: 'vietnam',
  name: 'Northern Vietnam, north and south, or three regions',
  quoteRoute: 'Hanoi + Halong Bay',
  packages: [
    {
      nights: 4,
      quoteLabel: '4 nights / 5 days (3N Hanoi + 1N Halong Bay)',
      nightsByCity: '3 nights in Hanoi · 1 night at Halong Bay',
      difference: 'Stay in the north with a full day in Hanoi and a night at the bay. Return to Hanoi for the final night, so there is no domestic flight in this route.',
      days: [
        arrival, hanoi, bay,
        'Enjoy the morning at Halong Bay, then return by road to Hanoi. Spend your final evening around the lake or at a neighbourhood restaurant.',
        'Check out in Hanoi and travel to the airport for your flight home.',
      ],
      inclusions: ['Three nights in Hanoi and one night at Halong Bay in the accommodation listed in your quote.'],
      exclusions: [extras, 'Optional guided Hanoi visits and attraction tickets unless listed in your quote.'],
      confirm: [bayDetails, 'Check airport transfers, return road transport to Halong Bay, flights and visa assistance.'],
    },
    {
      nights: 5,
      quoteRoute: 'Hanoi + Halong Bay + Ho Chi Minh City',
      quoteLabel: '5 nights / 6 days (2N Hanoi + 1N Halong Bay + 2N HCMC)',
      nightsByCity: '2 nights in Hanoi · 1 night at Halong Bay · 2 nights in Ho Chi Minh City',
      difference: 'Trade the final Hanoi night for two nights in Ho Chi Minh City. One domestic flight connects the northern and southern legs, leaving a full day to explore the south.',
      days: [
        arrival, hanoi, bay,
        'Leave Halong Bay and travel to Hanoi airport for a suitably timed flight to Ho Chi Minh City. Check in for the first of two nights in the south.',
        saigon, flyHome,
      ],
      inclusions: ['Two nights in Hanoi, one night at Halong Bay and two nights in Ho Chi Minh City in the accommodation listed in your quote.'],
      exclusions: [extras, 'The optional Cu Chi Tunnels excursion and entrance tickets unless added to your booking.'],
      confirm: [bayDetails, 'Check the Hanoi–Ho Chi Minh City flight, baggage allowance and road transfers, including the connection from Halong Bay to the airport.'],
    },
    {
      nights: 6,
      quoteRoute: 'Hanoi + Halong Bay + Hoi An + Ho Chi Minh City',
      quoteLabel: '6 nights / 7 days (Hanoi + Halong Bay + Hoi An + HCMC)',
      nightsByCity: 'Sample split · 1 night in Hanoi · 1 at Halong Bay · 2 in Hoi An · 2 in Ho Chi Minh City',
      difference: 'Add central Vietnam with two nights in Hoi An and a full day in its Old Town. This sample uses one fewer night in Hanoi and two domestic flights via Da Nang.',
      days: [
        arrival, bay,
        'Leave Halong Bay for Hanoi airport. Fly to Da Nang, then continue by road to Hoi An for two nights.',
        'Explore Hoi An Old Town on foot. Browse the old merchant streets, take a break by the river and return in the evening for the lanterns along the waterfront.',
        'Travel back to Da Nang airport and fly to Ho Chi Minh City. Settle into your hotel for the final two nights.',
        saigon, flyHome,
      ],
      inclusions: ['Six nights across Hanoi, Halong Bay, Hoi An and Ho Chi Minh City. Your quote confirms the night split and accommodation at each stop.'],
      exclusions: [extras, 'Optional Hoi An boat rides, Old Town admission and the Cu Chi Tunnels excursion unless listed in your booking.'],
      confirm: [bayDetails, 'Check both domestic flights, baggage allowances and the road connections between Halong Bay and Hanoi airport and between Da Nang and Hoi An.'],
    },
  ],
}];
