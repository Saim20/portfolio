/**
 * Explorer mode: the visitor picks who they are and the home page re-prioritises.
 *
 * Every variant is server-rendered and toggled with CSS via `html[data-persona]`,
 * so there is no flash and no JavaScript requirement. Hiring is the default for
 * first-time visitors and crawlers. `generic` is unused fallback copy.
 */

export type PersonaId = 'generic' | 'hiring' | 'founder' | 'browsing';

export type Persona = {
  id: PersonaId;
  /** Label on the segmented control. */
  label: string;
  /** Hero headline; the accent span is marked with `*...*`. */
  headline: string;
  /** Hero paragraph. */
  intro: string;
  cta: { label: string; href: string };
  secondary: { label: string; href: string };
  /** Which proof chips lead; the rest follow in default order. */
  lead: string[];
};

export const personas: Persona[] = [
  {
    id: 'generic',
    label: 'Everyone',
    headline: 'I build software products *end to end* - and keep them running.',
    intro:
      'I am a product lead and full-stack engineer in Dhaka. Five years of Flutter apps and Next.js platforms, from the first architecture call through app store review and the unglamorous production support afterwards.',
    cta: { label: 'See the work', href: '/work' },
    secondary: { label: 'Start a project', href: '/contact' },
    lead: [],
  },
  {
    id: 'hiring',
    label: 'Hiring',
    headline: 'Product lead who still *ships the code* - and has the receipts.',
    intro:
      'Head of Product at Upturn for 2.5 years, Tech Lead on a 4.3-rated App Store app, and now Project Associate at Invest Bangladesh on a government platform. IBA business degree in progress, IELTS Band 8, and three years of teaching.',
    cta: { label: 'Read the full timeline', href: '/about' },
    secondary: { label: 'Email me', href: '/contact' },
    lead: ['years', 'ielts', 'iba'],
  },
  {
    id: 'founder',
    label: 'Building something',
    headline: 'One person for the *whole technical scope* of your product.',
    intro:
      'Scoping, architecture, build, store release, and the production support afterwards. I have taken three products from nothing to real users and can tell you in one reply what yours will take.',
    cta: { label: 'Start a project', href: '/contact' },
    secondary: { label: 'See what I ship', href: '/work' },
    lead: ['live', 'rating', 'years'],
  },
  {
    id: 'browsing',
    label: 'Just looking',
    headline: 'Welcome. There is *more here than it looks* - go explore.',
    intro:
      'The terminal on the right actually works: type help. There are achievements to find, a hidden git log, and a page that only unlocks once you have seen everything.',
    cta: { label: 'Open the work', href: '/work' },
    secondary: { label: 'Who is this?', href: '/about' },
    lead: ['live', 'rating'],
  },
];

export const personaIds = personas.map((persona) => persona.id);

export function getPersona(id: PersonaId): Persona {
  return personas.find((persona) => persona.id === id) ?? personas[0];
}

/** Splits `before *accent* after` into renderable parts. */
export function splitHeadline(headline: string): { before: string; accent: string; after: string } {
  const match = headline.match(/^(.*?)\*(.+?)\*(.*)$/);
  if (!match) return { before: headline, accent: '', after: '' };
  return { before: match[1], accent: match[2], after: match[3] };
}
