/* ==========================================================================
   LeisureFlies Travels — shared site script
   1. Mobile navigation drawer
   2. Nav scroll state + section reveals
   3. "Ask LeisureFlies" travel assistant
   ========================================================================== */
(function () {
  'use strict';

  var ROOT = document.documentElement.getAttribute('data-lf-root') || '';
  var WA = 'https://wa.me/919814910087';
  var LEAD_ENDPOINT = 'https://formsubmit.co/ajax/info@leisureflies.com';

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ====================================================== 1. NAV DRAWER === */

  var NAV_ITEMS = [
    { label: 'Home',        href: 'index.html' },
    { label: 'Destinations',href: 'destinations.html' },
    { label: 'Services',    href: 'services.html' },
    { label: 'Cruise',      href: 'cruise.html' },
    { label: 'Eurail Pass', href: 'eurail-pass.html' },
    { label: 'Visa',        href: 'visa.html' },
    { label: 'About',       href: 'about.html' },
    { label: 'FAQ',         href: 'faq.html' },
    { label: 'Contact',     href: 'contact.html' }
  ];

  function currentPage() {
    var p = window.location.pathname.split('/').pop();
    if (!p || p === '') return 'index.html';
    return p;
  }

  function buildDrawer() {
    if ($('.lf-drawer')) return;
    var here = currentPage();
    var links = NAV_ITEMS.map(function (i) {
      var isHere = (i.href === here) && window.location.pathname.indexOf('/destinations/') === -1;
      return '<a href="' + ROOT + i.href + '"' + (isHere ? ' aria-current="page"' : '') + '>' + i.label + '</a>';
    }).join('');

    var el = document.createElement('div');
    el.className = 'lf-drawer';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Site menu');
    el.innerHTML =
      '<div class="lf-drawer-veil" data-lf-close></div>' +
      '<div class="lf-drawer-panel">' +
        '<div class="lf-drawer-head">' +
          '<div class="lf-drawer-title">LeisureFlies <span>Travels</span></div>' +
          '<button class="lf-drawer-close" type="button" aria-label="Close menu" data-lf-close>&times;</button>' +
        '</div>' +
        '<nav aria-label="Main">' + links + '</nav>' +
        '<div class="lf-drawer-actions">' +
          '<a class="lf-drawer-quote" href="' + ROOT + 'contact.html">Request a free quote</a>' +
          '<a class="lf-drawer-wa" href="' + WA + '?text=Hi%2C%20I%27d%20like%20to%20plan%20a%20trip" target="_blank" rel="noopener">Chat on WhatsApp</a>' +
          '<a class="lf-drawer-call" href="tel:+919814910087">Call +91 98149 10087</a>' +
        '</div>' +
        '<div class="lf-drawer-meta">SCO 70, 2nd Floor, Sector 38-C,<br>Chandigarh 160014<br>Mon–Sat, 10:00 AM – 7:00 PM</div>' +
      '</div>';
    document.body.appendChild(el);

    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      el.classList.add('open');
      document.body.style.overflow = 'hidden';
      var first = $('.lf-drawer-panel a', el);
      if (first) setTimeout(function () { first.focus(); }, 260);
    }
    function close() {
      el.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }

    $$('.nav-toggle').forEach(function (btn) {
      btn.setAttribute('aria-label', 'Open menu');
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function () {
        var isOpen = el.classList.contains('open');
        btn.setAttribute('aria-expanded', String(!isOpen));
        isOpen ? close() : open();
      });
    });

    $$('[data-lf-close]', el).forEach(function (n) {
      n.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && el.classList.contains('open')) close();
    });
  }

  /* ================================================ 2. SCROLL / REVEAL === */

  function bindScrollState() {
    var nav = $('nav');
    if (!nav) return;
    if (!nav.id) nav.id = 'nav';
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function bindReveals() {
    var els = $$('.reveal:not(.in)');
    if (!els.length || !('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  function wrapWideTables() {
    $$('table').forEach(function (t) {
      if (t.closest('.lf-table-scroll')) return;
      var w = document.createElement('div');
      w.className = 'lf-table-scroll';
      t.parentNode.insertBefore(w, t);
      w.appendChild(t);
    });
  }

  /* =================================================== 3. THE ASSISTANT === */

  // --- destination knowledge -------------------------------------------
  var DEST = {
    bali:        { name: 'Bali',              file: 'bali.html',        durations: '4N/5D, 5N/6D, 6N/7D', visa: 'Visa on arrival — nothing to apply for in advance. Valid 30 days.', when: 'April to October', note: 'Ubud + Kuta combinations, all tours on a private basis.' },
    thailand:    { name: 'Thailand',          file: 'thailand.html',    durations: '4N/5D, 5N/6D, 6N/7D (Bangkok–Pattaya or Phuket–Krabi)', visa: 'Visa on arrival for Indian passport holders.', when: 'December to April', note: 'Private airport transfers, temple tours and island excursions included.' },
    dubai:       { name: 'Dubai',             file: 'dubai.html',       durations: '3N/4D, 4N/5D, 5N/6D (with Abu Dhabi & Ferrari World)', visa: 'E-visa on soft copies only — passport first/last page, photo on white background, PAN card.', when: 'November to April', note: 'Every package includes the Dubai Trio: city tour, desert safari and dhow cruise.' },
    maldives:    { name: 'the Maldives',      file: 'maldives.html',    durations: 'Built around your resort, transfer type and meal plan', visa: 'Free visa on arrival for Indian passport holders.', when: 'November to April', note: 'We match villa category, transfer (speedboat / seaplane) and meal plan to your budget.' },
    singapore:   { name: 'Singapore',         file: 'singapore.html',   durations: '3N/4D, 4N/5D, 5N/6D (with a cruise add-on)', visa: 'Pre-applied visa needed — passport valid 6+ months with 3 blank pages, 2 photos (3.5×5cm), return ticket.', when: 'February to April', note: 'Sentosa, Universal Studios, Gardens by the Bay and Night Safari.' },
    vietnam:     { name: 'Vietnam',           file: 'vietnam.html',     durations: '4N/5D, 5N/6D, 6N/7D', visa: 'Simple online e-visa, applied at least 2 days before departure. Single entry.', when: 'March–April and October–December', note: 'Hanoi, Halong Bay, Hoi An and Ho Chi Minh City combinations.' },
    mauritius:   { name: 'Mauritius',         file: 'mauritius.html',   durations: 'Packages across 3, 4 and 5-star hotels', visa: 'Visa on arrival — no advance registration needed.', when: 'May to December', note: 'Île aux Cerfs, plus full-day North and South island tours.' },
    'sri lanka': { name: 'Sri Lanka',         file: 'sri-lanka.html',   durations: '4N/5D, 5N/6D, 6N/7D', visa: 'ETA applied online in advance; valid 30 days, extendable to 6 months.', when: 'Year-round, 22–31°C', note: 'Kandy, Nuwara Eliya, Sigiriya and Bentota.' },
    'saudi arabia': { name: 'Saudi Arabia',   file: 'saudi-arabia.html',durations: '2N/3D, 4N/5D (Riyadh, Jeddah, or both)', visa: 'Tourist e-visa. Ask us about current requirements for your passport.', when: 'October to February', note: 'Edge of the World, At-Turaif, Jeddah waterfront, Hegra and AlUla.' },
    goa:         { name: 'Goa',               file: 'goa.html',         durations: '3N/4D, 4N/5D, 5N/6D', visa: 'Domestic — no visa needed.', when: 'October to March', note: 'North and South Goa, fully customisable around the mix you want.' },
    himachal:    { name: 'Himachal Pradesh',  file: 'himachal.html',    durations: '3N/4D, 4N/5D, 6N/7D, 9N/10D', visa: 'Domestic — no visa needed.', when: 'March–June and September–December', note: 'Shimla, Manali, Solang Valley and Rohtang Pass (open June–October).' },
    kashmir:     { name: 'Kashmir',           file: 'kashmir.html',     durations: '4N/5D, 5N/6D, 6N/7D', visa: 'Domestic — no visa needed.', when: 'April–June and October–March', note: 'Srinagar, Gulmarg and Pahalgam, with a shikara ride on Dal Lake included.' },
    kerala:      { name: 'Kerala',            file: 'kerala.html',      durations: '4N/5D, 5N/6D, 7N/8D', visa: 'Domestic — no visa needed.', when: 'September to March', note: 'Munnar, Thekkady and an Alleppey houseboat with all meals aboard.' },
    andaman:     { name: 'the Andamans',      file: 'andaman.html',     durations: '4N/5D, 5N/6D, 6N/7D', visa: 'Domestic — no visa needed.', when: 'December to April for diving', note: 'Port Blair, Havelock and Neil Island.' }
  };

  var DEST_ALIASES = {
    'indonesia': 'bali', 'ubud': 'bali', 'kuta': 'bali',
    'bangkok': 'thailand', 'pattaya': 'thailand', 'phuket': 'thailand', 'krabi': 'thailand',
    'uae': 'dubai', 'abu dhabi': 'dubai', 'burj': 'dubai',
    'male': 'maldives', 'maldive': 'maldives',
    'sentosa': 'singapore',
    'hanoi': 'vietnam', 'halong': 'vietnam', 'saigon': 'vietnam', 'da nang': 'vietnam', 'hoi an': 'vietnam',
    'srilanka': 'sri lanka', 'colombo': 'sri lanka', 'kandy': 'sri lanka',
    'saudi': 'saudi arabia', 'riyadh': 'saudi arabia', 'jeddah': 'saudi arabia', 'alula': 'saudi arabia',
    'shimla': 'himachal', 'manali': 'himachal', 'rohtang': 'himachal', 'kufri': 'himachal', 'dharamshala': 'himachal', 'himachal pradesh': 'himachal',
    'srinagar': 'kashmir', 'gulmarg': 'kashmir', 'pahalgam': 'kashmir', 'dal lake': 'kashmir',
    'munnar': 'kerala', 'alleppey': 'kerala', 'thekkady': 'kerala', 'cochin': 'kerala', 'kochi': 'kerala',
    'port blair': 'andaman', 'havelock': 'andaman', 'nicobar': 'andaman', 'andamans': 'andaman'
  };

  function findDestination(text) {
    var keys = Object.keys(DEST);
    for (var i = 0; i < keys.length; i++) {
      if (text.indexOf(keys[i]) !== -1) return keys[i];
    }
    var al = Object.keys(DEST_ALIASES);
    for (var j = 0; j < al.length; j++) {
      if (text.indexOf(al[j]) !== -1) return DEST_ALIASES[al[j]];
    }
    return null;
  }

  // --- general intents --------------------------------------------------
  var INTENTS = [
    {
      id: 'greeting',
      keys: [['hi', 3], ['hello', 3], ['hey', 3], ['namaste', 3], ['good morning', 4], ['good evening', 4], ['sat sri akal', 4]],
      reply: function () {
        return 'Hello. I can help with destinations, visas, cruises, Eurail passes and quotes.\n\nWhat are you planning?';
      },
      chips: ['Popular destinations', 'Get a quote', 'Visa help']
    },
    {
      id: 'thanks',
      keys: [['thank', 3], ['thanks', 3], ['shukriya', 3], ['dhanyavad', 3]],
      reply: function () { return 'Happy to help. Anything else you want to look at?'; },
      chips: ['Get a quote', 'Talk to a person']
    },
    {
      id: 'human',
      keys: [['talk to', 3], ['speak to', 3], ['human', 3], ['real person', 4], ['agent', 2], ['call you', 3], ['phone number', 3], ['contact number', 3], ['whatsapp', 3]],
      reply: function () {
        return 'Best to talk to the team directly:\n\n• WhatsApp: <a href="' + WA + '?text=Hi%2C%20I%27d%20like%20to%20plan%20a%20trip" target="_blank" rel="noopener">+91 98149 10087</a>\n• Phone: <a href="tel:+919814910087">+91 98149 10087</a> or <a href="tel:+917837280087">+91 78372 80087</a>\n• Email: <a href="mailto:info@leisureflies.com">info@leisureflies.com</a>\n\nOffice hours are Mon–Sat, 10:00 AM to 7:00 PM.';
      },
      chips: ['Leave my details', 'Where is your office?']
    },
    {
      id: 'office',
      keys: [['office', 3], ['address', 3], ['where are you', 4], ['located', 3], ['location', 2], ['visit you', 3], ['chandigarh', 2], ['directions', 3]],
      reply: function () {
        return 'The office is at SCO 70, 2nd Floor, Sector 38-C, Chandigarh 160014.\n\nOpen Monday to Saturday, 10:00 AM – 7:00 PM. <a href="' + ROOT + 'contact.html">Map and directions are on the contact page.</a>';
      },
      chips: ['Talk to a person', 'Get a quote']
    },
    {
      id: 'hours',
      keys: [['timing', 3], ['open', 2], ['hours', 3], ['closed', 3], ['sunday', 3], ['what time', 3]],
      reply: function () {
        return 'Office hours are Monday to Saturday, 10:00 AM to 7:00 PM. Closed Sundays.\n\nIf you are already travelling with us, support runs outside those hours on WhatsApp.';
      },
      chips: ['Talk to a person']
    },
    {
      id: 'cruise',
      keys: [['cruise', 4], ['cordelia', 4], ['royal caribbean', 4], ['msc', 3], ['ship', 2], ['sailing', 3], ['cabin', 3]],
      reply: function () {
        return 'We book Cordelia Cruises for domestic sailings and all the major international lines — Royal Caribbean, MSC, Costa, NCL, Disney, Celebrity, Silversea and more.\n\nThe part most people get wrong is the cabin choice and pre-booking shows and shore excursions. <a href="' + ROOT + 'cruise.html">Full cruise guide here.</a>';
      },
      chips: ['Which cabin should I pick?', 'Get a quote']
    },
    {
      id: 'cabin',
      keys: [['which cabin', 5], ['cabin should', 5], ['stateroom', 4], ['balcony', 3]],
      reply: function () {
        return 'Rough guide:\n\n• Interior (117 sq ft) — you are barely in the room during the day, so it saves real money.\n• Ocean View (142 sq ft) — a window without balcony pricing.\n• Mini Suite / Suite (194–303 sq ft, balcony) — most-booked for couples and families.\n• Chairman\'s Suite (596 sq ft) — the top tier.\n\nGroups often do better with adjoining cabins than one large suite.';
      },
      chips: ['Get a cruise quote', 'Talk to a person']
    },
    {
      id: 'eurail',
      keys: [['eurail', 5], ['rail pass', 4], ['swiss travel pass', 5], ['train in europe', 4], ['interrail', 4], ['europe by train', 4], ['glacier express', 4]],
      reply: function () {
        return 'We sell the Eurail Global Pass (33 countries) and the Swiss Travel Pass, and we handle the mandatory seat reservations that catch most first-timers out.\n\nWorth saying plainly: a rail pass is not always cheaper than point-to-point tickets. We will tell you when it is not. <a href="' + ROOT + 'eurail-pass.html">Current fares are here.</a>';
      },
      chips: ['Is a pass worth it for me?', 'Get a quote']
    },
    {
      id: 'passworth',
      keys: [['worth it', 4], ['pass worth', 5], ['cheaper to buy', 4], ['point to point', 4]],
      reply: function () {
        return 'It depends on how many long journeys you are actually taking. Two or three short hops between neighbouring cities usually come out cheaper as individual tickets. Five or more travel days across several countries is where a pass starts to win.\n\nSend us your rough route and we will price both ways before you commit.';
      },
      chips: ['Leave my details', 'Talk to a person']
    },
    {
      id: 'visa',
      keys: [['visa', 4], ['passport', 3], ['documents', 3], ['e-visa', 4], ['visa on arrival', 5]],
      reply: function () {
        return 'We handle visa documentation as part of the booking. Requirements vary a lot by destination — Thailand, Bali, Maldives and Mauritius are visa-on-arrival for Indian passports, Vietnam and Dubai are online e-visas, and Singapore needs a pre-applied visa.\n\nWhich country are you asking about?';
      },
      chips: ['Dubai', 'Singapore', 'Vietnam', 'Thailand']
    },
    {
      id: 'flights',
      keys: [['flight', 4], ['air ticket', 4], ['airfare', 4], ['ticket booking', 4], ['air ticket booking', 5]],
      reply: function () {
        return 'Yes — domestic and international flights at pre-negotiated fares, on both full-service and low-cost carriers. Being IATA accredited is what gives us access to those fares.\n\nSend your route and dates and we will come back with options.';
      },
      chips: ['Leave my details', 'Talk to a person']
    },
    {
      id: 'corporate',
      keys: [['corporate', 4], ['business travel', 4], ['company', 3], ['school', 3], ['educational', 4], ['group tour', 4], ['group booking', 4], ['picnic', 3]],
      reply: function () {
        return 'We do a fair amount of both. Corporate accounts get negotiated rates, credit facilities and a dedicated contact. School and educational trips are planned around safety and logistics so teachers can focus on the students.\n\n<a href="' + ROOT + 'services.html">More on our services.</a>';
      },
      chips: ['Leave my details', 'Talk to a person']
    },
    {
      id: 'chauffeur',
      keys: [['chauffeur', 5], ['blacklane', 5], ['limousine', 4], ['luxury car', 4], ['car rental', 3], ['airport transfer', 3]],
      reply: function () {
        return 'Through our Blacklane partnership we arrange chauffeur-driven cars in Dubai and across Europe — Mercedes S/E/C Class, BMW 7/5/3 Series, Audi A8 and A6, Bentley, Cadillac Escalade and Land Cruisers. Self-driven sports cars are available in Dubai and Monaco.';
      },
      chips: ['Get a quote', 'Talk to a person']
    },
    {
      id: 'price',
      keys: [['price', 3], ['cost', 3], ['budget', 3], ['how much', 4], ['quote', 4], ['rate', 3], ['cheap', 3], ['expensive', 2], ['per person', 3]],
      reply: function () {
        return 'Pricing depends on your dates, hotel category, number of travellers and how much sightseeing you want built in — so we quote properly rather than posting one number.\n\nWhat we do commit to: the quote you get is what you pay, with no convenience fees added later. And if you find the same thing cheaper elsewhere, send the screenshot within 5 minutes and we will match it where we can.';
      },
      chips: ['Leave my details', 'Price match rules']
    },
    {
      id: 'pricematch',
      keys: [['price match', 5], ['match the price', 5], ['found cheaper', 5], ['screenshot', 4], ['guarantee', 3]],
      reply: function () {
        return 'The screenshot has to reach us within 5 minutes of our quote, show a date and time stamp, and be for the exact same product — same dates, same hotel category, same inclusions, from a publicly bookable source.\n\nIt does not apply once a booking is confirmed and paid. <a href="' + ROOT + 'legal.html#pricematch">Full terms here.</a>';
      },
      chips: ['Get a quote']
    },
    {
      id: 'payment',
      keys: [['payment', 4], ['pay', 3], ['emi', 4], ['installment', 4], ['advance', 3], ['deposit', 3], ['upi', 3]],
      reply: function () {
        return 'A booking is confirmed once we have your written confirmation and the booking amount. Payment terms depend on the supplier and how far out you are travelling — the team will set that out in writing before you pay anything.';
      },
      chips: ['Cancellation policy', 'Talk to a person']
    },
    {
      id: 'cancellation',
      keys: [['cancel', 4], ['refund', 4], ['reschedule', 4], ['postpone', 3]],
      reply: function () {
        return 'Cancellation charges come from the supplier — airline, hotel, cruise line or operator — and are set out at the time of booking. Cancelling well in advance costs less; some promotional fares and hotel rates are non-refundable, and that is always disclosed before you pay.\n\nRefunds are released once the supplier releases them to us, which can take a few weeks. <a href="' + ROOT + 'legal.html#cancellation">Full policy here.</a>';
      },
      chips: ['Talk to a person']
    },
    {
      id: 'honeymoon',
      keys: [['honeymoon', 5], ['couple', 3], ['romantic', 4], ['anniversary', 4]],
      reply: function () {
        return 'The Maldives and Mauritius are the two we book most for honeymoons — water villas, private beach dinners and spa inclusions. Bali works well if you want temples and scenery alongside the beach, and it usually costs less.\n\nWhat sort of budget are you working with?';
      },
      chips: ['Maldives', 'Mauritius', 'Bali', 'Leave my details']
    },
    {
      id: 'family',
      keys: [['family', 4], ['kids', 4], ['children', 4], ['child', 3], ['parents', 3], ['senior', 3]],
      reply: function () {
        return 'Singapore is the easiest first international trip with children — Sentosa, Universal Studios and the Night Safari all in a compact, very manageable city. Dubai works well too. For domestic, Kerala and Goa are gentle on older parents.\n\nHow many travellers, and what ages?';
      },
      chips: ['Singapore', 'Dubai', 'Kerala', 'Leave my details']
    },
    {
      id: 'food',
      keys: [['vegetarian', 4], ['jain', 5], ['veg food', 5], ['indian food', 4], ['halal', 4]],
      reply: function () {
        return 'This comes up constantly and we plan around it. Cordelia Cruises runs pure-veg counters and dedicated Jain meals. Most Maldives resorts now do proper vegetarian, Indian and Jain options — we confirm it in writing when we book. On group tours we arrange Indian food at each destination.';
      },
      chips: ['Talk to a person', 'Get a quote']
    },
    {
      id: 'trust',
      keys: [['iata', 4], ['taai', 4], ['accredited', 4], ['licensed', 3], ['genuine', 3], ['trust', 3], ['review', 3], ['reliable', 3], ['how long', 3], ['established', 3]],
      reply: function () {
        return 'LeisureFlies Travels Pvt Ltd has been running from Chandigarh since 2010, and has been IATA and TAAI accredited since 2013. Over 10,000 travellers, 30+ countries.\n\nThe reviews on our Google listing are real and public — worth reading before you book with anyone. <a href="' + ROOT + 'about.html">More about us.</a>';
      },
      chips: ['Talk to a person']
    },
    {
      id: 'destinations',
      keys: [['destination', 3], ['where should', 4], ['suggest', 3], ['recommend', 3], ['packages', 3], ['popular', 3], ['options', 2], ['ideas', 3]],
      reply: function () {
        return 'Fourteen destinations with full itineraries on the site:\n\nInternational — Bali, Thailand, Dubai, Singapore, Vietnam, Maldives, Mauritius, Sri Lanka, Saudi Arabia.\nDomestic — Goa, Kerala, Kashmir, Himachal, Andamans.\n\n<a href="' + ROOT + 'destinations.html">Browse them all</a>, or tell me roughly what you are after — beach, mountains, city, honeymoon, family.';
      },
      chips: ['Beach trip', 'Mountains', 'Honeymoon', 'Family trip']
    },
    {
      id: 'beach',
      keys: [['beach', 4], ['island', 3], ['sea', 2], ['snorkel', 3], ['scuba', 3], ['diving', 3]],
      reply: function () {
        return 'For beaches: the Maldives and Mauritius at the higher end, Thailand and Bali for better value, and the Andamans or Goa if you want to stay domestic. The Andamans have the best diving in India.';
      },
      chips: ['Maldives', 'Thailand', 'Andaman', 'Goa']
    },
    {
      id: 'mountains',
      keys: [['mountain', 4], ['snow', 4], ['hill', 3], ['trek', 4], ['skiing', 4], ['himalaya', 4]],
      reply: function () {
        return 'Kashmir for Gulmarg, Pahalgam and the Dal Lake houseboats, or Himachal for Shimla, Manali and Solang Valley. Both are drivable from Chandigarh, which keeps costs down.\n\nIf you want Europe instead, the Swiss Travel Pass covers the panorama trains — Glacier Express, Bernina Express, GoldenPass.';
      },
      chips: ['Kashmir', 'Himachal', 'Eurail Pass']
    },
    {
      id: 'about_bot',
      keys: [['who are you', 5], ['are you a bot', 5], ['are you ai', 5], ['chatbot', 4], ['robot', 3]],
      reply: function () {
        return 'I am the assistant on the LeisureFlies site — I can answer questions about destinations, visas, cruises, rail passes and how we work, and pass you to the team when you want an actual quote.\n\nI am not a person, and I do not have live prices or availability. For those, the team replies within a few hours.';
      },
      chips: ['Talk to a person', 'Get a quote']
    }
  ];

  // --- lead capture -----------------------------------------------------
  var LEAD_STEPS = [
    { key: 'name',        ask: 'Sure. What is your name?' },
    { key: 'phone',       ask: 'Thanks. What is the best phone or WhatsApp number to reach you on?' },
    { key: 'destination', ask: 'And where are you thinking of going? (A rough idea is fine.)' },
    { key: 'travel',      ask: 'Last one — roughly when, and how many travellers?' }
  ];

  var bot = {
    el: null, log: null, chips: null, input: null, send: null,
    lead: null, leadStep: 0, history: [], useApi: null, opened: false
  };

  function normalise(s) {
    return ' ' + String(s).toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() + ' ';
  }

  function scoreIntent(intent, text) {
    var total = 0;
    intent.keys.forEach(function (k) {
      if (text.indexOf(' ' + k[0] + ' ') !== -1 || text.indexOf(k[0]) !== -1) total += k[1];
    });
    return total;
  }

  function destinationReply(key) {
    var d = DEST[key];
    return 'For ' + d.name + ':\n\n' +
      '• Typical durations — ' + d.durations + '\n' +
      '• Best time to go — ' + d.when + '\n' +
      '• Visa — ' + d.visa + '\n\n' +
      d.note + '\n\n' +
      '<a href="' + ROOT + 'destinations/' + d.file + '">Full ' + d.name + ' page, with the day-by-day detail.</a>';
  }

  function localAnswer(raw) {
    var text = normalise(raw);

    // a named destination beats a general intent
    var dest = findDestination(text);
    var best = null, bestScore = 0;

    INTENTS.forEach(function (i) {
      var s = scoreIntent(i, text);
      if (s > bestScore) { bestScore = s; best = i; }
    });

    if (dest && bestScore < 5) {
      var d = DEST[dest];
      return {
        text: destinationReply(dest),
        chips: ['Get a quote for ' + d.name.replace(/^the /, ''), 'Visa help', 'Talk to a person']
      };
    }

    if (best && bestScore >= 3) {
      return { text: best.reply(), chips: best.chips || ['Get a quote', 'Talk to a person'] };
    }

    return {
      text: 'I did not quite catch that. I can help with:\n\n• Any of our 14 destinations\n• Visas and documents\n• Cruises and Eurail passes\n• Quotes, payment and cancellation\n\nOr I can pass you straight to the team on WhatsApp.',
      chips: ['Popular destinations', 'Get a quote', 'Talk to a person']
    };
  }

  // Optional upgrade path: if /api/chat is deployed with an API key,
  // the assistant uses it and falls back here if anything goes wrong.
  function apiAnswer(raw, cb) {
    if (bot.useApi === false) { cb(null); return; }
    var ctrl = new AbortController();
    var timer = setTimeout(function () { ctrl.abort(); }, 9000);

    fetch(ROOT + 'api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: raw, history: bot.history.slice(-8) }),
      signal: ctrl.signal
    }).then(function (r) {
      clearTimeout(timer);
      if (!r.ok) throw new Error('no api');
      return r.json();
    }).then(function (data) {
      if (data && data.reply) { bot.useApi = true; cb(String(data.reply)); }
      else { bot.useApi = false; cb(null); }
    }).catch(function () {
      clearTimeout(timer);
      bot.useApi = false;
      cb(null);
    });
  }

  function addMsg(who, html) {
    var d = document.createElement('div');
    d.className = 'lfbot-msg lfbot-' + who;
    d.innerHTML = html;
    bot.log.appendChild(d);
    bot.log.scrollTop = bot.log.scrollHeight;
    return d;
  }

  function setChips(list) {
    bot.chips.innerHTML = '';
    (list || []).forEach(function (label) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'lfbot-chip';
      b.textContent = label;
      b.addEventListener('click', function () { submit(label); });
      bot.chips.appendChild(b);
    });
  }

  function typing(on) {
    var ex = $('.lfbot-typing', bot.log);
    if (on) {
      if (ex) return;
      var d = document.createElement('div');
      d.className = 'lfbot-typing';
      d.innerHTML = '<i></i><i></i><i></i>';
      bot.log.appendChild(d);
      bot.log.scrollTop = bot.log.scrollHeight;
    } else if (ex) {
      ex.remove();
    }
  }

  function respond(html, chips, delay) {
    typing(true);
    setChips([]);
    setTimeout(function () {
      typing(false);
      addMsg('bot', html);
      setChips(chips);
      bot.history.push({ role: 'assistant', content: html.replace(/<[^>]+>/g, '') });
    }, delay || (420 + Math.min(html.length * 4, 900)));
  }

  function sendLead() {
    var l = bot.lead || {};
    var payload = {
      _subject: 'Website assistant enquiry — ' + (l.name || 'no name'),
      Source: 'Website chat assistant',
      Name: l.name || '',
      Phone: l.phone || '',
      Destination: l.destination || '',
      'Dates & travellers': l.travel || '',
      Page: window.location.href
    };
    fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    }).catch(function () { /* handled by the WhatsApp fallback below */ });

    var waText = encodeURIComponent(
      'Hi, I filled in the enquiry on your website.\n' +
      'Name: ' + (l.name || '') + '\n' +
      'Phone: ' + (l.phone || '') + '\n' +
      'Destination: ' + (l.destination || '') + '\n' +
      'When / travellers: ' + (l.travel || '')
    );

    respond(
      'Got it — thank you, ' + esc((l.name || '').split(' ')[0]) + '. The team will call or message you on ' + esc(l.phone || 'that number') + ', usually within a few hours during office hours.\n\n' +
      'If you would rather not wait, <a href="' + WA + '?text=' + waText + '" target="_blank" rel="noopener">send the same details on WhatsApp</a> and someone will pick it up straight away.',
      ['Ask something else', 'Browse destinations']
    );
    bot.lead = null;
    bot.leadStep = 0;
  }

  function startLead(prefill) {
    bot.lead = { destination: prefill || '' };
    bot.leadStep = 0;
    respond(LEAD_STEPS[0].ask, []);
  }

  function handleLead(raw) {
    var step = LEAD_STEPS[bot.leadStep];
    bot.lead[step.key] = raw;

    // skip the destination question if we already captured it
    var next = bot.leadStep + 1;
    while (next < LEAD_STEPS.length && bot.lead[LEAD_STEPS[next].key]) next++;

    if (next >= LEAD_STEPS.length) { sendLead(); return; }
    bot.leadStep = next;
    respond(LEAD_STEPS[next].ask, []);
  }

  function submit(raw) {
    var value = String(raw || '').trim();
    if (!value) return;

    addMsg('user', esc(value));
    bot.history.push({ role: 'user', content: value });
    bot.input.value = '';
    bot.input.style.height = 'auto';

    if (bot.lead) { handleLead(value); return; }

    var lower = value.toLowerCase();

    if (/browse destinations/.test(lower)) {
      window.location.href = ROOT + 'destinations.html';
      return;
    }
    if (/leave my details|share my details|call me back|request a quote|\bquote\b/.test(lower)
        && !/price match|how do you quote/.test(lower)) {
      var d = findDestination(normalise(value));
      startLead(d ? DEST[d].name.replace(/^the /, '') : '');
      return;
    }

    typing(true);
    setChips([]);
    apiAnswer(value, function (apiText) {
      typing(false);
      if (apiText) {
        addMsg('bot', esc(apiText));
        bot.history.push({ role: 'assistant', content: apiText });
        setChips(['Get a quote', 'Talk to a person']);
      } else {
        var a = localAnswer(value);
        respond(a.text, a.chips, 260);
      }
    });
  }

  function buildBot() {
    if ($('.lfbot')) return;

    var stack = document.createElement('div');
    stack.className = 'lf-float-stack';
    stack.innerHTML =
      '<button class="lf-float lf-float-bot" type="button" aria-label="Ask LeisureFlies — travel assistant" aria-expanded="false">' +
        '<span class="lf-ping"></span>' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a1.25 1.25 0 0 1 1.25 1.25V4.5H16A3.5 3.5 0 0 1 19.5 8v6A3.5 3.5 0 0 1 16 17.5h-2.3l-2.86 2.62a.9.9 0 0 1-1.51-.66V17.5H8A3.5 3.5 0 0 1 4.5 14V8A3.5 3.5 0 0 1 8 4.5h2.75V3.25A1.25 1.25 0 0 1 12 2Zm-2.6 7.1a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Zm5.2 0a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"/></svg>' +
      '</button>' +
      '<a class="lf-float lf-float-wa" href="' + WA + '?text=Hi%2C%20I%27d%20like%20to%20plan%20a%20trip" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.1.82.83-3-.2-.32A8.2 8.2 0 1 1 12 20.2Zm4.5-6.15c-.25-.13-1.47-.72-1.7-.8-.23-.08-.4-.13-.56.13-.17.25-.65.8-.8.96-.15.17-.3.19-.55.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.3.37-.44.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.9 2.42 1.02 2.58c.13.17 1.77 2.7 4.28 3.79.6.26 1.06.41 1.43.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.28Z"/></svg>' +
      '</a>';
    document.body.appendChild(stack);

    var panel = document.createElement('div');
    panel.className = 'lfbot';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Ask LeisureFlies');
    panel.innerHTML =
      '<div class="lfbot-head">' +
        '<div class="lfbot-avatar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a1.25 1.25 0 0 1 1.25 1.25V4.5H16A3.5 3.5 0 0 1 19.5 8v6A3.5 3.5 0 0 1 16 17.5h-2.3l-2.86 2.62a.9.9 0 0 1-1.51-.66V17.5H8A3.5 3.5 0 0 1 4.5 14V8A3.5 3.5 0 0 1 8 4.5h2.75V3.25A1.25 1.25 0 0 1 12 2Zm-2.6 7.1a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Zm5.2 0a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"/></svg></div>' +
        '<div class="lfbot-id">' +
          '<div class="lfbot-name">Ask LeisureFlies</div>' +
          '<div class="lfbot-status"><span class="lfbot-dot"></span> Travel assistant · replies instantly</div>' +
        '</div>' +
        '<button class="lfbot-close" type="button" aria-label="Close assistant">&times;</button>' +
      '</div>' +
      '<div class="lfbot-log" role="log" aria-live="polite"></div>' +
      '<div class="lfbot-chips"></div>' +
      '<div class="lfbot-foot">' +
        '<form class="lfbot-form">' +
          '<textarea class="lfbot-input" rows="1" placeholder="Ask about a destination, visa or price…" aria-label="Your message"></textarea>' +
          '<button class="lfbot-send" type="submit" aria-label="Send">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z"/></svg>' +
          '</button>' +
        '</form>' +
        '<div class="lfbot-disclaimer">Automated assistant. For live prices and bookings, a specialist replies on WhatsApp.</div>' +
      '</div>';
    document.body.appendChild(panel);

    bot.el = panel;
    bot.log = $('.lfbot-log', panel);
    bot.chips = $('.lfbot-chips', panel);
    bot.input = $('.lfbot-input', panel);
    bot.send = $('.lfbot-send', panel);

    var launcher = $('.lf-float-bot', stack);

    function openBot() {
      panel.classList.add('open');
      launcher.setAttribute('aria-expanded', 'true');
      launcher.classList.add('dismissed');
      if (!bot.opened) {
        bot.opened = true;
        var hour = new Date().getHours();
        var greet = hour < 12 ? 'Good morning' : (hour < 17 ? 'Good afternoon' : 'Good evening');
        addMsg('bot', greet + '. I am the LeisureFlies assistant.\n\nI can help with our destinations, visa requirements, cruises and rail passes — or take your details so a specialist can call you back.');
        setChips(['Popular destinations', 'Get a quote', 'Visa help', 'Talk to a person']);
      }
      setTimeout(function () { bot.input.focus(); }, 240);
    }
    function closeBot() {
      panel.classList.remove('open');
      launcher.setAttribute('aria-expanded', 'false');
      launcher.focus();
    }

    launcher.addEventListener('click', function () {
      panel.classList.contains('open') ? closeBot() : openBot();
    });
    $('.lfbot-close', panel).addEventListener('click', closeBot);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) closeBot();
    });

    $('.lfbot-form', panel).addEventListener('submit', function (e) {
      e.preventDefault();
      submit(bot.input.value);
    });

    bot.input.addEventListener('input', function () {
      bot.input.style.height = 'auto';
      bot.input.style.height = Math.min(bot.input.scrollHeight, 96) + 'px';
    });
    bot.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submit(bot.input.value);
      }
    });

    // allow any element on the page to open the assistant
    $$('[data-lf-open-bot]').forEach(function (n) {
      n.addEventListener('click', function (e) { e.preventDefault(); openBot(); });
    });
  }

  /* ============================================================== INIT === */

  function init() {
    buildDrawer();
    bindScrollState();
    bindReveals();
    wrapWideTables();
    buildBot();

    // stamp the current year wherever it is marked up
    $$('[data-lf-year]').forEach(function (n) {
      n.textContent = new Date().getFullYear();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
