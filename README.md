# LeisureFlies Travels — website

Static site. No build step. Vercel serves the files as they are.

---

## Deploy

Upload the contents of this folder to `github.com/LFKamalrana/leisureflies-website`,
replacing what is there. Vercel redeploys automatically. If you upload through
GitHub's web interface, extract the zip on your computer first — GitHub does not
unpack zip files on upload.

---

## Do these three things after deploying

### 1. Activate the contact form  ← the site loses enquiries until this is done

The form posts to FormSubmit. The first time anyone submits it, FormSubmit emails
`info@leisureflies.com` with an activation link. Until someone clicks that link,
**no enquiry is delivered**.

So: open `/contact.html` on the live site, submit the form yourself with real
details, then open the info@ inbox and click the activation link. Submit once more
to confirm the email now arrives.

### 2. Confirm the Google review count

The homepage says "4.9 out of 5 · 172 Google reviews". The old structured data said
19. One of those is wrong. Check the live Google Business profile and tell me the
right figure so the page matches reality.

I removed the `aggregateRating` block from the structured data rather than guess.
That is also the correct call regardless — Google discounts self-declared ratings on
a business's own site, and publishing a number that does not match the profile is a
risk not worth taking.

### 3. Point the domain

Add `leisureflies.com` in Vercel → Settings → Domains. Every canonical URL, the
sitemap and `llms.txt` already point at `https://leisureflies.com`, so nothing in the
code needs changing. Then submit `https://leisureflies.com/sitemap.xml` in Google
Search Console.

---

## Still outstanding

- **Real photos of Kamal and Saroj** for the About page. The stock portraits of
  strangers have been replaced with monograms in the meantime.
- **Legal review** of `legal.html` by a lawyer familiar with Indian consumer
  protection and travel trade rules. The internal draft note has been removed from
  the public page, but the review itself has not happened.
- **Destination photography.** Seven destinations have real brochure photos
  (Bali, Thailand, Dubai, Kashmir, Kerala, Goa, Himachal). The rest use stock
  imagery for the main photo only. Send photos and they drop straight in.
- **IATA logo** from the agent portal, once you have the official file.
- **`og-image.jpg`** — a 1200×630 image in the site root. Pages without their own
  photo fall back to it for WhatsApp and Facebook link previews.

---

## What is in here

```
index.html                 homepage
destinations.html          all 14 destinations
destinations/*.html        14 destination pages
services.html  cruise.html  eurail-pass.html
about.html  contact.html  faq.html  legal.html
thank-you.html             form confirmation (noindex)
404.html                   not-found page (noindex)

assets/css/enhance.css     shared: mobile drawer, footer, assistant, form
assets/js/site.js          shared: drawer, assistant, reveals, table scroll
api/chat.js                optional AI upgrade — off unless you add a key

sitemap.xml  robots.txt  llms.txt  vercel.json
destinations/images/       real brochure photos
```

Each page still carries its own inline `<style>` block, as before. `enhance.css`
loads last and only adds what is shared across pages.

---

## The site assistant

The robot button, bottom right, opens "Ask LeisureFlies". It answers from a fixed
knowledge base written into `assets/js/site.js`:

- all 14 destinations — durations, best travel months, visa position
- cruises, cabin categories, Eurail and Swiss Pass guidance
- pricing approach, price match terms, payment, cancellation
- vegetarian and Jain food, honeymoon and family suggestions
- office address, hours, phone, email

It collects name, phone, destination and travel dates, emails them to
`info@leisureflies.com` through the same FormSubmit account as the contact form, and
offers a WhatsApp handoff with the details pre-filled.

No server, no API key, no running cost.

### Optional: make it a real AI assistant

`api/chat.js` is ready but dormant. To switch it on:

1. Get a key from `console.anthropic.com` and set a monthly spend limit.
2. Vercel → Settings → Environment Variables → add `ANTHROPIC_API_KEY`.
3. Redeploy.

The assistant then answers with Claude, using a prompt that keeps it grounded in
LeisureFlies' real details and forbids it from inventing prices, availability or visa
rules. If the key is missing or the API fails, it falls back to the built-in
assistant automatically — nothing breaks.

Do not put the key in the code or commit it to GitHub.

---

## Editing later

- **Nav links** — `NAV_ITEMS` at the top of `assets/js/site.js` controls the mobile
  drawer. The desktop `<ul class="nav-links">` is in each page's HTML.
- **Assistant answers** — `DEST` and `INTENTS` in `assets/js/site.js`.
- **FAQ** — `faq.html`. Edit the visible text *and* the matching entry in the
  `FAQPage` JSON-LD at the top of the file, or the two will disagree.
- **Footer** — appears in every page as `<footer class="lff">`. Changing it means
  changing it in all 25 files.
