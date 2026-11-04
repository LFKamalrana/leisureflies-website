export const SITE = {
  name: 'LeisureFlies Travels',
  legalName: 'LeisureFlies Travels Pvt Ltd',
  tagline: 'Your Travel Our Passion',
  url: 'https://leisureflies.com',
  waNumber: '919814910087',
  phones: [
    { label: '+91 98149 10087', tel: '+919814910087' },
    { label: '+91 78372 80087', tel: '+917837280087' },
    { label: '+91 78372 30087', tel: '+917837230087' },
  ],
  email: 'info@leisureflies.com',
  address: ['SCO 70, 2nd Floor, Sector 38-C', 'Chandigarh 160014'],
  hours: '10 am to 7 pm',
  gst: '04AABCL8211G1ZX',
  facebook: 'https://facebook.com/leisureflies',
  instagram: 'https://instagram.com/leisure.flies',
  google: 'https://share.google/pRkmxrpVo126YOx9t',
};
export const wa = (text) => `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(text)}`;

// region: india | international. photo: true when a real brochure photo exists. art: illustrated fallback motif.
export const DEST = {
  bali:           { name: 'Bali',           region: 'international', photo: true,  tag: 'Honeymoons' },
  thailand:       { name: 'Thailand',       region: 'international', photo: true,  tag: 'Families' },
  dubai:          { name: 'Dubai',          region: 'international', photo: true },
  maldives:       { name: 'Maldives',       region: 'international', photo: false, art: 'beach',  tag: 'Honeymoons' },
  singapore:      { name: 'Singapore',      region: 'international', photo: false, art: 'city',   tag: 'Families' },
  vietnam:        { name: 'Vietnam',        region: 'international', photo: false, art: 'beach' },
  'sri-lanka':    { name: 'Sri Lanka',      region: 'international', photo: false, art: 'beach' },
  mauritius:      { name: 'Mauritius',      region: 'international', photo: false, art: 'beach',  tag: 'Honeymoons' },
  'saudi-arabia': { name: 'Saudi Arabia',   region: 'international', photo: false, art: 'desert' },
  kashmir:        { name: 'Kashmir',        region: 'india',         photo: true },
  kerala:         { name: 'Kerala',         region: 'india',         photo: true },
  goa:            { name: 'Goa',            region: 'india',         photo: true },
  himachal:       { name: 'Himachal',       region: 'india',         photo: true },
  andaman:        { name: 'Andaman',        region: 'india',         photo: false, art: 'beach' },
};
export const FEATURED = ['bali', 'thailand', 'dubai', 'maldives', 'kashmir', 'kerala', 'goa', 'himachal'];
export const VISA_COUNTRIES = [
  { slug: 'canada', name: 'Canada' },
  { slug: 'europe', name: 'Europe (Schengen)' },
  { slug: 'australia-new-zealand', name: 'Australia & New Zealand' },
  { slug: 'singapore', name: 'Singapore' },
  { slug: 'georgia', name: 'Georgia' },
];
export const NAV = [
  { href: '/holidays', label: 'Holidays' },
  { href: '/visa', label: 'Visa' },
  { href: '/cruises', label: 'Cruises' },
  { href: '/flights-hotels', label: 'Flights & Hotels' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
