import { defineType, defineField } from 'sanity';

// One document = one offer or package card shown on the website.
export const offer = defineType({
  name: 'offer',
  title: 'Offer or package',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', description: 'Example: Bali 5 nights from Chandigarh', validation: (r) => r.required().max(80) }),
    defineField({ name: 'destination', title: 'Destination', type: 'string', description: 'Example: Bali' }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'summary', title: 'Short description', type: 'text', rows: 3, description: 'Two or three lines: what is included.', validation: (r) => r.required().max(300) }),
    defineField({ name: 'priceNote', title: 'Price note (optional)', type: 'string', description: 'Example: From Rs 55,000 per person. Leave empty to show "Ask for a quote".' }),
    defineField({ name: 'validUntil', title: 'Valid until (optional)', type: 'date', description: 'The offer hides itself after this date.' }),
  ],
  orderings: [{ title: 'Newest first', name: 'newest', by: [{ field: '_createdAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'destination', media: 'image' } },
});
