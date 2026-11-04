import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

export default defineConfig({
  site: 'https://leisureflies.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    react(),
    sanity({ projectId: 'xaf8quzi', dataset: 'production', useCdn: true, apiVersion: '2025-01-01', studioBasePath: '/studio' }),
  ],
});
