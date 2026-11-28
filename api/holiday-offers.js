const query = '*[_type == "offer" && defined(title) && (!defined(validUntil) || validUntil >= $today)] | order(_createdAt desc){title,destination,summary,priceNote,validUntil,"img":image.asset->url}';
const calendar = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' });

export default async function holidayOffers(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).end();
  }
  const url = new URL('https://xaf8quzi.api.sanity.io/v2025-01-01/data/query/production');
  url.searchParams.set('query', query);
  url.searchParams.set('$today', JSON.stringify(calendar.format(new Date())));
  url.searchParams.set('perspective', 'published');
  try {
    const result = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!result.ok) throw new Error('Holiday feed unavailable');
    const { result: offers } = await result.json();
    if (!Array.isArray(offers)) throw new Error('Invalid holiday feed');
    response.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60');
    return response.status(200).json(offers);
  } catch {
    response.setHeader('Cache-Control', 'no-store');
    return response.status(503).json({ message: 'Holiday offers are temporarily unavailable.' });
  }
}
