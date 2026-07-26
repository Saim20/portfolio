# SM Saimul Islam — Portfolio

A static, SEO-complete personal site for product and engineering work.
Built with [Astro](https://astro.build) so every page ships as HTML with almost no JavaScript.

## Stack

- **Astro 7** — prerendered pages, islands only where interaction is needed
- **Tailwind CSS 4** — utility styles, inlined at build time
- **Self-hosted fonts** via Astro Fonts (Inter + JetBrains Mono)
- **Vercel** adapter for deploy and cache headers

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Content

All copy lives in two files:

| File | What it owns |
|------|--------------|
| [`src/data/site.ts`](src/data/site.ts) | Person, contact, experience, skills, certifications |
| [`src/data/projects.ts`](src/data/projects.ts) | Case studies, links, stack chips |

`/llms.txt`, the JSON-LD graph, and every page pull from the same modules, so they stay in sync.

### Project screenshots

Drop a file named after the project slug into `src/assets/projects/`:

```
src/assets/projects/tathirmichil.webp
src/assets/projects/flow-upturn.webp
src/assets/projects/studays.webp
```

Cards and case studies pick them up automatically. Until then, each card uses a generated poster.

## Environment

Copy [`.env.example`](.env.example) and set the public site URL before deploying:

```bash
PUBLIC_SITE_URL=https://your-domain.com
```

This value drives the sitemap, Open Graph tags, canonical URLs, JSON-LD, and `llms.txt`.

## Deploy (Vercel)

1. Import the repo in Vercel (framework preset: Astro).
2. Set `PUBLIC_SITE_URL` to the production origin (no trailing slash).
3. Deploy. Cache and security headers come from [`vercel.json`](vercel.json).

## Routes

| Path | Purpose |
|------|---------|
| `/` | Hero, featured work, services, stack |
| `/work` | All projects with CSS-only category filters |
| `/work/[slug]` | Case study |
| `/about` | Narrative + timeline |
| `/contact` | Email, LinkedIn, phone |
| `/llms.txt` | Plain-text site digest for language models |
| `/robots.txt` | Crawl rules + sitemap pointer |

## Fun bits

- CLI typewriter hero (skipped under `prefers-reduced-motion`)
- Light / dark theme with no flash of wrong theme
- Dhaka local time in the footer
- Easter egg: Konami code, or triple-click the logo, for a fake `git log` of career milestones
