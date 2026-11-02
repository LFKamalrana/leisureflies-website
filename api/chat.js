/**
 * Optional upgrade: turns the site assistant into a real AI assistant.
 *
 * The website works fine without this file. The built-in assistant in
 * assets/js/site.js answers from a fixed knowledge base and needs no server.
 *
 * To switch the real model on:
 *   1. Get an API key from https://console.anthropic.com
 *   2. In Vercel → your project → Settings → Environment Variables,
 *      add ANTHROPIC_API_KEY with that key. Do not put the key in this file
 *      and do not commit it to GitHub.
 *   3. Redeploy.
 *
 * With no key set this returns 501 and the site silently falls back to the
 * built-in assistant, so nothing breaks either way.
 *
 * Note that API usage is billed per message. Set a spend limit in the
 * Anthropic console before pointing this at a public website.
 */

const SYSTEM_PROMPT = `You are the assistant on the website of LeisureFlies Travels Pvt Ltd,
an IATA and TAAI accredited travel agency in Chandigarh, India, founded in 2010 by Kamal Rana.

Facts you may rely on:
- Office: SCO 70, 2nd Floor, Sector 38-C, Chandigarh 160014
- Phone and WhatsApp: +91 98149 10087. Alternate: +91 78372 80087
- Email: info@leisureflies.com
- Hours: Monday to Saturday, 10:00 to 19:00 IST. Closed Sunday.
- Accredited by IATA and TAAI since 2013.
- Destinations with full itineraries: Bali, Thailand, Dubai, Singapore, Vietnam,
  Maldives, Mauritius, Sri Lanka, Saudi Arabia, Goa, Kerala, Kashmir,
  Himachal Pradesh, Andaman and Nicobar.
- Also books: flights, 4-star-and-above hotels, Cordelia and international cruises,
  Eurail Global Pass and Swiss Travel Pass, visa documentation, corporate travel,
  educational tours, and chauffeur-driven cars in Dubai and Europe via Blacklane.

Rules:
- Never invent a price, an availability, a flight time or a hotel name. Package pricing
  is always quoted individually. If asked for a specific price, explain that and offer
  to have a specialist come back with a real quote.
- Never invent visa rules. Give the general position from the site and tell the person to
  confirm current requirements, since these change.
- Keep answers short: a few sentences, plain language, no marketing padding.
- If the person wants to book, wants a quote, or needs anything time-sensitive,
  point them to WhatsApp on +91 98149 10087 or the contact form at /contact.html.
- You are an assistant, not a member of staff. If asked, say so plainly.
- Answer in the language the person writes in. English, Hindi and Punjabi are all fine.`;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    // No key configured — the front end falls back to the built-in assistant.
    return res.status(501).json({ error: 'Assistant API not configured' });
  }

  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Missing message' });
    }
    if (message.length > 1500) {
      return res.status(400).json({ error: 'Message too long' });
    }

    const messages = [];
    (Array.isArray(history) ? history.slice(-8) : []).forEach((m) => {
      if (m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string') {
        messages.push({ role: m.role, content: m.content.slice(0, 2000) });
      }
    });
    messages.push({ role: 'user', content: message });

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!r.ok) {
      return res.status(502).json({ error: 'Upstream error' });
    }

    const data = await r.json();
    const reply = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    if (!reply) return res.status(502).json({ error: 'Empty reply' });

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: 'Assistant unavailable' });
  }
};
