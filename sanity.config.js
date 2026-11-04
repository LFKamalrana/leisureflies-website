import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { offer } from './src/sanity/offer.js';

export default defineConfig({
  name: 'leisureflies',
  title: 'LeisureFlies Offers',
  projectId: 'xaf8quzi',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: [offer] },
});
