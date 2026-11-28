export const andamanPlanNote = 'Each sample starts and ends in Sri Vijaya Puram (Port Blair), with the final night there before your flight. All three visit Swaraj Dweep (Havelock). The longer stays also visit Shaheed Dweep (Neil Island). The order of visits can change with ferry timings and sea conditions.';

const arrival = 'Meet your airport transfer in Port Blair and check into your hotel. If your arrival time allows, visit Cellular Jail. A later arrival leaves time for the visit on your return to town.';
const havelock = 'Transfer to the jetty and take the ferry to Havelock. After check-in, spend the afternoon at Radhanagar Beach and stay overnight on the island.';
const havelockDay = 'Spend a full day on Havelock. Visit Kalapathar Beach, then leave the afternoon free. If you would like to dive or snorkel, ask about adding a guided session.';
const neil = 'Take the ferry from Havelock to Neil Island. Settle in, then head to Laxmanpur Beach for an evening walk before your first night on Neil.';
const neilDay = 'Spend the full day on Neil Island. Walk along Bharatpur Beach and time a visit to the natural rock bridge at Laxmanpur for low tide.';
const returnToTown = 'Take the ferry back to Port Blair and transfer to your hotel. Use the afternoon for Cellular Jail if you missed it on arrival, or unwind at Corbyn’s Cove. Stay in town for your final night.';
const departure = 'Check out in Port Blair and take your included airport transfer for your flight home.';
const services = [
  'Daily hotel breakfast and transfers between the airport, hotels and ferry jetties on your route.',
  'Sightseeing and entry tickets for the visits listed in your booked itinerary.',
];
const exclusions = [
  'Meals and drinks outside your booked meal plan, shopping and personal expenses.',
  'Optional scuba diving, snorkelling trips and equipment hire unless added to your booking.',
];
const confirm = ['Your written quote names the hotels, room types, ferry sailings and seat class, sightseeing stops and admissions. Tell us your flight times so we can arrange the connections.'];

export const andamanRoutes = [{
  slug: 'andaman',
  name: 'Port Blair, Havelock and Neil Island',
  quoteRoute: 'Port Blair + Havelock',
  packages: [
    {
      nights: 4,
      nightsByCity: '2 nights in Port Blair · 2 nights on Havelock',
      difference: 'Visit Port Blair and Havelock with a full day on Havelock between ferry journeys. This is the shortest route and uses two ferry crossings.',
      days: [arrival, havelock, havelockDay, returnToTown, departure],
      inclusions: ['Four nights of accommodation and return inter-island ferry tickets between Port Blair and Havelock.', ...services],
      exclusions, confirm,
    },
    {
      nights: 5, quoteRoute: 'Port Blair + Havelock + Neil Island',
      nightsByCity: '2 nights in Port Blair · 2 nights on Havelock · 1 night on Neil Island',
      difference: 'Keep both Havelock nights and add a night on Neil Island. Visit Laxmanpur Beach before returning to Port Blair the next day.',
      days: [arrival, havelock, havelockDay, neil, returnToTown, departure],
      inclusions: ['Five nights of accommodation and inter-island ferry tickets from Port Blair to Havelock, onward to Neil Island and back to Port Blair.', ...services],
      exclusions, confirm,
    },
    {
      nights: 6, quoteRoute: 'Port Blair + Havelock + Neil Island',
      nightsByCity: '2 nights in Port Blair · 2 nights on Havelock · 2 nights on Neil Island',
      difference: 'A second night on Neil Island gives you a full day between ferries for Bharatpur Beach and the natural rock bridge at low tide.',
      days: [arrival, havelock, havelockDay, neil, neilDay, returnToTown, departure],
      inclusions: ['Six nights of accommodation and inter-island ferry tickets from Port Blair to Havelock, onward to Neil Island and back to Port Blair.', ...services],
      exclusions, confirm,
    },
  ],
}];
