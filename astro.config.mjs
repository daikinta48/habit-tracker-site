import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://habit-tracker-site.pages.dev',
  output: 'static',
  integrations: [sitemap()],
});
