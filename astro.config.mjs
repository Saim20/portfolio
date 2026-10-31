// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// Canonical origin. Override with PUBLIC_SITE_URL in Vercel once the domain is live.
const site = process.env.PUBLIC_SITE_URL || 'https://www.saimulislam.com';

// https://astro.build/config
export default defineConfig({
  site,

  // Keep URLs slash-free so canonical tags, the sitemap, and Vercel routes agree.
  trailingSlash: 'never',

  // Every page is prerendered to static HTML at build time; the adapter only
  // handles Vercel output conventions (headers, redirects, static hosting).
  adapter: vercel(),

  // The explorer-mode reward page is noindex, so keep it out of the sitemap too.
  integrations: [sitemap({ filter: (page) => !page.endsWith('/unlocked') })],

  // Same-origin navigations are prefetched, so page-to-page feels instant.
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },

  build: {
    // The stylesheet is small enough that inlining removes a render-blocking request.
    inlineStylesheets: 'always',
  },

  // Fonts are downloaded, subset, and self-hosted at build time: no third-party
  // request, no layout shift (Astro generates metric-matched fallbacks).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jbmono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
