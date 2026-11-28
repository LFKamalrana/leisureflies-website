export const goaPlanNote = 'All three packages include daily breakfast at your hotel, private airport pickup and drop-off, and sightseeing by private vehicle. Day 2 explores North Goa and Day 3 explores South Goa. The stops below are examples you can tailor with us.';

const arrival = 'Your driver meets you at Goa airport and takes you by private car to your hotel. Check in and leave the evening free to settle in.';
const north = 'After breakfast, explore North Goa by private vehicle. A sample route pairs Chapora Fort’s river views with time at Candolim and Sinquerim beaches before returning to your hotel.';
const south = 'After breakfast, set out by private vehicle for South Goa. Visit the Basilica of Bom Jesus in Old Goa on the way, then spend the afternoon at Benaulim Beach before returning to your hotel.';
const beachDay = 'Enjoy breakfast and a day at your own pace. Walk to the beach near your hotel or stay by the pool. If you would like to try watersports, ask about the options for your dates.';
const heritageDay = 'Use the extra day for a different side of Goa. Ask us to arrange an optional outing to Panaji to walk through Fontainhas and stop for a Goan lunch, or keep the day free.';
const departure = 'Check out of your hotel. Your private car takes you back to Goa airport for your departing flight.';
const services = [
  'Daily breakfast at your hotel.',
  'Private car pickup from Goa airport on arrival and a private return transfer on departure.',
  'North Goa sightseeing on Day 2 and South Goa sightseeing on Day 3, both by private vehicle.',
];
const exclusions = [
  'Personal shopping and meals or drinks outside your booked meal plan.',
  'Watersports, dolphin boat trips and a Dudhsagar Falls excursion unless added to your written quote.',
];
const confirm = [
  'Confirm your hotel, room type, sightseeing stops and any entry tickets. Share your arrival and departure airport details so we can schedule your car.',
];

export const goaRoutes = [{
  slug: 'goa',
  name: 'North and South Goa',
  quoteRoute: 'North + South Goa',
  packages: [
    {
      nights: 3,
      difference: 'A short break with two sightseeing days between arrival and departure. Explore the northern forts and beaches first, then head south the next day.',
      days: [arrival, north, south, departure],
      inclusions: ['Three nights of hotel accommodation.', ...services],
      exclusions, confirm,
    },
    {
      nights: 4,
      difference: 'Keep both sightseeing days and add a full day at leisure for the beach or your hotel.',
      days: [arrival, north, south, beachDay, departure],
      inclusions: ['Four nights of hotel accommodation.', ...services],
      exclusions, confirm,
    },
    {
      nights: 5,
      difference: 'Enjoy two flexible days after the North and South Goa tours. Keep one for the beach and use the other for an optional visit to Panaji’s Fontainhas neighbourhood.',
      days: [arrival, north, south, beachDay, heritageDay, departure],
      inclusions: ['Five nights of hotel accommodation.', ...services],
      exclusions: [...exclusions, 'The optional Panaji outing and transport on leisure days unless added to your booking.'],
      confirm,
    },
  ],
}];
