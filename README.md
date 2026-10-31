# SM Saimul Islam - Portfolio

A static, SEO-complete personal site for product and engineering work.
Built with [Astro](https://astro.build) so every page ships as HTML with almost no JavaScript.

## Stack

- **Astro 7** - prerendered pages, islands only where interaction is needed
- **Tailwind CSS 4** - utility styles, inlined at build time
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
| [`src/data/site.ts`](src/data/site.ts) | Person, contact, experience (with tracks), skills, certifications, "now" card, milestones |
| [`src/data/projects.ts`](src/data/projects.ts) | Case studies, links, stack chips, director's commentary |
| [`src/data/personas.ts`](src/data/personas.ts) | Hero copy and emphasis per visitor type (hiring / founder / browsing) |
| [`src/data/quests.ts`](src/data/quests.ts) | Explorer-mode achievements and their hints |

`/llms.txt`, the JSON-LD graph, and every page pull from the same modules, so they stay in sync.

### Project screenshots

Drop a file named after the project slug into `src/assets/projects/`:

```
src/assets/projects/tathirmichil.jpg
src/assets/projects/flow-upturn.jpg
src/assets/projects/studays-1.webp   # mobile: up to three portrait screens
src/assets/projects/studays-2.webp   # become a fanned phone composite
src/assets/projects/studays-3.webp
```

Cards and case studies pick them up automatically. Without an image, a card uses a generated poster.

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
| `/unlocked` | Explorer-mode reward (noindex, soft-gated until every achievement is found) |
| `/llms.txt` | Plain-text site digest for language models |
| `/robots.txt` | Crawl rules + sitemap pointer |

## Explorer mode

The facts a visitor needs are static and above the fold. On top of that:

- **Persona switch** in the hero ("Hiring / Building something / Just looking") swaps the headline and CTAs, promotes different proof chips, and reorders the home sections. Stored in `localStorage`, applied before first paint, pure CSS for the ordering.
- **Working terminal**: once the replay finishes, the prompt takes input. `help`, `work`, `open <slug>`, `about`, `contact`, `stack`, `ielts`, `theme`, `achievements`, `git log`, `clear`, plus a few hidden ones. Tab completion and history.
- **Achievements**: ten quests (scroll, pick a persona, use the terminal, read case studies, flip the theme, find the easter egg, reach for a contact link...). A HUD pill appears bottom-left after the first unlock; finding all ten opens `/unlocked`.
- Everything is per-browser `localStorage`. Nothing is sent anywhere, so the "no trackers" line stays true.

Hooks are declarative: `data-quest="id"` unlocks on click, `data-quest-view="id"` on scroll into view, `data-quest-page="case-study:<slug>"` records a visited case study. Inline scripts dispatch `quest:request` events. See [`src/scripts/quests.ts`](src/scripts/quests.ts).

## Fun bits

- CLI typewriter hero (skipped under `prefers-reduced-motion`), then a real prompt
- Light / dark theme with no flash of wrong theme
- Dhaka local time in the footer
- Scroll-driven section reveals (CSS `animation-timeline`, no JS) and pointer-tracked card tilt (fine pointers only)
- Easter egg: Konami code, or triple-click the logo, for a fake `git log` of career milestones
