const munnarDrive = 'Drive from Kochi into the hills around Munnar. Stop for views of Cheeyappara or Valara Falls if time permits, then check in for two nights.';
const munnarDay = 'Spend the day among Munnar’s tea gardens. Choose a tea museum visit or request a visit to Eravikulam National Park, subject to opening dates and ticket availability.';
const thekkady = 'Continue to Thekkady. Browse the spice shops in Kumily and, if you would like to go out on Periyar Lake, ask for a timed boat ticket. Stay overnight in Thekkady.';
const alleppey = 'Travel to Alleppey and board your houseboat for an afternoon on the backwaters. Have dinner on board and spend the night in your cabin.';
const kochi = 'Arrive in Kochi (Cochin) and check in. If your arrival time allows, explore Fort Kochi on foot and see the Chinese fishing nets along the waterfront.';
const returnKochi = 'Have breakfast aboard the houseboat, disembark in Alleppey and travel back to Kochi for your onward journey.';
const coreStops: [string, number][] = [['Munnar', 2], ['Thekkady', 1], ['Alleppey', 1]];
const withKochi: [string, number][] = [['Kochi', 1], ...coreStops];

export const keralaInclusions = [
  'One night on an Alleppey houseboat, with all meals aboard.',
  'Local sightseeing across the destinations on your selected route.',
];
export const keralaExclusions = [
  'Personal shopping, drinks and meals outside the booked meal plan.',
  'Optional activities and entrance tickets, including Periyar boating and Eravikulam National Park, unless your written quote includes them.',
];
export const keralaConfirm = 'Check hotel and houseboat categories, private or shared boat arrangements, meals ashore, flights, airport transfers and intercity transport in your written quote.';

export const keralaPackages = [
  {
    nights: 4, stops: coreStops,
    difference: 'Two nights in Munnar give you a full day in the tea country before Thekkady and the Alleppey houseboat.',
    days: [munnarDrive, munnarDay, thekkady, alleppey, returnKochi],
  },
  {
    nights: 5, stops: withKochi,
    difference: 'Add a night in Kochi before the hills. There is time for the Fort Kochi waterfront before you follow the four-night route.',
    days: [kochi, munnarDrive, munnarDay, thekkady, alleppey, returnKochi],
  },
  {
    nights: 7, stops: [...withKochi, ['Kovalam', 2] as [string, number]],
    difference: 'Keep the Kochi stay and add two nights in Kovalam after the houseboat, with a full day on the coast.',
    days: [
      kochi, munnarDrive, munnarDay, thekkady, alleppey,
      'After breakfast aboard, disembark and drive south to Kovalam. Check in and spend the evening by the beach.',
      'Spend a full day in Kovalam. Walk along Lighthouse Beach, visit the cafés by the shore or leave the afternoon free at your hotel. Stay a second night in Kovalam.',
      'Check out in Kovalam and travel to the airport or railway station named in your quote.',
    ],
  },
];
