import type { APIRoute } from 'astro';

import { site } from '../data/site';

export const GET: APIRoute = () => {
  const body = `# ${site.name}
User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap-index.xml', site.url).href}
# Plain-text summary of this site for language models
# ${new URL('/llms.txt', site.url).href}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
