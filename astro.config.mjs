import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { blogPosts, isPublished } from './src/data/blog-posts.ts';

// Slugs of blog posts not yet live (liveAfter date still in the future).
// Kept out of the sitemap so search engines do not discover them before launch.
const scheduledSlugs = blogPosts.filter((p) => !isPublished(p)).map((p) => p.slug);

export default defineConfig({
  site: 'https://thryvmarketingsolutions.com',
  output: 'static',
  integrations: [sitemap({
    filter: (page) =>
      !page.includes('/case-studies') &&
      !scheduledSlugs.some((slug) => page.endsWith(slug)),
  })],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
