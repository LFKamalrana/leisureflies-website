import fares from '../data/departures.json';
import { departureCutoff } from '../data/flightAvailability.js';

export function GET() {
  const now = Date.now();
  const candidates = fares.flatMap(offer => offer.validUntil ? [] : offer.groups.flatMap(group => group.dates.map(dates => ({
    origin: offer.origin, destination: offer.destination, domestic: offer.domestic,
    airline: offer.airline, kind: offer.kind, dates, fare: group.fare,
    until: departureCutoff(offer, dates)
  })))).filter(card => card.until > now);
  candidates.sort((a, b) => Number(a.fare == null) - Number(b.fare == null) || a.fare - b.fare || a.until - b.until);

  // Precompute only the changes visitors can see, keeping the full fare board off the homepage.
  const cards = [];
  const indexes = new Map();
  const periods = [];
  let start = now;
  while (true) {
    const routes = new Set();
    const domestic = [], international = [];
    for (const card of candidates) {
      const bucket = card.domestic ? domestic : international;
      const route = [card.origin, card.destination].sort().join('|');
      if (card.until <= start || routes.has(route) || bucket.length === 3) continue;
      bucket.push(card);
      routes.add(route);
      if (domestic.length === 3 && international.length === 3) break;
    }
    const selected = [...domestic.slice(0, international.length ? 2 : 3), ...international].slice(0, 3);
    if (!selected.length) break;
    start = Math.min(...selected.map(card => card.until));
    const picks = selected.map(card => {
      if (!indexes.has(card)) {
        indexes.set(card, cards.length);
        const { until, ...display } = card;
        cards.push(display);
      }
      return indexes.get(card);
    });
    periods.push({ until: start, picks });
  }
  return new Response(JSON.stringify({ cards, periods }), { headers: { 'Content-Type': 'application/json' } });
}
