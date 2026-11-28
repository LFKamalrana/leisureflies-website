const india = 'Asia/Kolkata';
const cityZones = {
  Delhi: india, Chandigarh: india, Amritsar: india, Mumbai: india,
  Bangkok: 'Asia/Bangkok', Phuket: 'Asia/Bangkok', 'Kuala Lumpur': 'Asia/Kuala_Lumpur',
  Melbourne: 'Australia/Melbourne', Sydney: 'Australia/Sydney', Milan: 'Europe/Rome', Rome: 'Europe/Rome',
  Calgary: 'America/Edmonton', Edmonton: 'America/Edmonton', Montreal: 'America/Toronto',
  Toronto: 'America/Toronto', Vancouver: 'America/Vancouver',
};
const offsetFormats = new Map();
const dayMs = 86_400_000;

function offsetAt(zone, instant) {
  if (!offsetFormats.has(zone)) {
    offsetFormats.set(zone, new Intl.DateTimeFormat('en', { timeZone: zone, timeZoneName: 'longOffset' }));
  }
  const offset = offsetFormats.get(zone).formatToParts(instant).find(part => part.type === 'timeZoneName').value;
  if (offset === 'GMT') return 0;
  const [, sign, hours, minutes] = /^GMT([+-])(\d{2}):(\d{2})$/.exec(offset);
  return (sign === '-' ? -1 : 1) * (Number(hours) * 60 + Number(minutes)) * 60_000;
}

// The first instant an option must disappear, in milliseconds since the Unix epoch.
export function departureCutoff(offer, pair) {
  const date = (offer.validUntil || pair || '').split('/')[0];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return 0;
  const outbound = offer.schedule?.split('→')[0].match(/\b([01]\d|2[0-3]):[0-5]\d\b/)?.[0];
  const time = offer.validUntil ? '00:00' : outbound || '00:00';
  const wall = Date.parse(date + 'T' + time + ':00Z') + (offer.validUntil ? dayMs : 0);
  if (!Number.isFinite(wall)) return 0;
  // A validity-only promotion with no origin follows the agency's business day.
  // An unrecognised origin expires conservatively in the earliest civil time zone.
  const zone = offer.originTimeZone || (offer.domestic || (offer.validUntil && !offer.origin) ? india : cityZones[offer.origin]) || 'Pacific/Kiritimati';
  const earlierOffset = offsetAt(zone, wall - dayMs);
  const first = wall - earlierOffset;
  // Try the earlier occurrence of a repeated wall time at the end of daylight saving.
  return offsetAt(zone, first) === earlierOffset ? first : wall - offsetAt(zone, wall + dayMs);
}
