import raw from '../data/destinations.json';
import visas from '../data/visas.json';
export function GET() {
  const base = 'https://leisureflies.com';
  const paths = ['/', '/holidays', '/offers', '/visa', '/cruises', '/flights-hotels', '/about', '/contact', '/legal',
    ...Object.keys(raw).map((s) => `/holidays/${s}`), ...Object.keys(visas).map((s) => `/visa/${s}`)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
