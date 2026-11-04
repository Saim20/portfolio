/**
 * Single source of truth for everything about the person behind the site.
 * The UI, the JSON-LD, and /llms.txt all read from here.
 */

export const site = {
  url: import.meta.env.PUBLIC_SITE_URL || 'https://www.saimulislam.com',
  name: 'SM Saimul Islam',
  shortName: 'Saimul Islam',
  initials: 'SI',
  title: 'SM Saimul Islam - Product Lead & Full-stack Engineer',
  role: 'Product Lead & Full-stack Engineer',
  tagline: 'I design, build, and ship software products end to end.',
  description:
    'Product lead and full-stack engineer in Dhaka, Bangladesh. 5+ years shipping Flutter apps and Next.js platforms - from architecture and release to production support. Currently Project Associate at Invest Bangladesh (BanglaBiz), IELTS instructor at Mentors (Band 8), and a BBA candidate at IBA. Available for product, web, and mobile work.',
  location: {
    city: 'Dhaka',
    country: 'Bangladesh',
    timeZone: 'Asia/Dhaka',
  },
  /** Shown in the header pill. Set to null to hide it entirely. */
  availability: 'Open to new projects',
  locale: 'en',
} as const;

export const contact = {
  email: 'saim@rolka.dev',
  phone: '+8801798355165',
  /** Rendered on /contact only, to keep it out of every page's markup. */
  phoneDisplay: '+880 1798 355165',
  linkedin: 'https://www.linkedin.com/in/icicle29',
  linkedinHandle: 'in/icicle29',
} as const;

export type Social = { label: string; href: string; icon: string };

export const socials: Social[] = [
  { label: 'LinkedIn', href: contact.linkedin, icon: 'linkedin' },
  { label: 'Email', href: `mailto:${contact.email}`, icon: 'mail' },
];

/**
 * What clients actually buy. Kept short on purpose - this is a pitch, not a résumé.
 */
export const services = [
  {
    title: 'Product from zero to launch',
    icon: 'rocket',
    body: 'Scoping, architecture, build, and release. I take an idea to something real users log into, then keep it running.',
  },
  {
    title: 'Web platforms',
    icon: 'globe',
    body: 'Next.js and Astro applications with real-time data, dashboards, payments, and admin tooling behind them.',
  },
  {
    title: 'Mobile apps',
    icon: 'phone',
    body: 'Flutter apps for iOS and Android, including store submission, review cycles, and post-launch iteration.',
  },
  {
    title: 'Technical leadership',
    icon: 'compass',
    body: 'Translating business goals into a roadmap engineers can build, and explaining the tradeoffs to everyone else.',
  },
] as const;

export const skillGroups = [
  {
    label: 'Product & Web',
    icon: 'layers',
    items: ['Next.js', 'React', 'Astro', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: 'Mobile',
    icon: 'phone',
    items: ['Flutter', 'Dart', 'iOS & Play Store release'],
  },
  {
    label: 'Data & Infra',
    icon: 'database',
    items: ['PostgreSQL', 'SQL & data analysis', 'Linux system administration', 'Vercel'],
  },
  {
    label: 'Product & Research',
    icon: 'search',
    items: ['UI/UX analysis', 'User research', 'Policy analysis', 'Hiring & team building'],
  },
] as const;

/** Which lane of the timeline an entry belongs to; several run in parallel. */
export type ExperienceTrack = 'work' | 'teaching' | 'study';

export const experienceTracks: Record<ExperienceTrack, { label: string; color: string }> = {
  work: { label: 'Work', color: 'var(--color-accent)' },
  teaching: { label: 'Teaching', color: 'var(--color-warm)' },
  study: { label: 'Study', color: 'var(--color-fg-soft)' },
};

export type ExperienceEntry = {
  org: string;
  role: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  track: ExperienceTrack;
  /** Slug of a related project, used to cross-link the timeline to the work. */
  project?: string;
};

export const experience: ExperienceEntry[] = [
  {
    org: 'Invest Bangladesh',
    role: 'Project Associate (part-time)',
    start: 'Oct 2026',
    end: 'Present',
    location: 'Dhaka, Bangladesh',
    track: 'work',
    summary:
      "Part of the team managing the development of BanglaBiz, the government's business starter and management platform - deployed, now being readied for adoption. UI/UX analysis and improvement, integrations facilitation, user research, hiring, and finding policy gaps and proposing fixes.",
  },
  {
    org: 'Upturn',
    role: 'Head of Product',
    start: 'Nov 2023',
    end: 'Mar 2026',
    location: 'Dhaka, Bangladesh',
    track: 'work',
    summary:
      'Led product for Flow, a business operations platform where attendance, leave, payroll, and approvals share one employee record, on the web and on iOS and Android.',
    project: 'flow-upturn',
  },
  {
    org: 'StuDays',
    role: 'Tech Lead',
    start: 'Mar 2024',
    end: 'Jul 2025',
    location: 'Dhaka, Bangladesh',
    track: 'work',
    summary:
      'Built and shipped the StuDays mobile app, which lets students in Bangladesh verify their status and claim offers from vendors nationwide.',
    project: 'studays',
  },
  {
    org: 'Ki Chole?',
    role: 'Mobile Application Developer',
    start: 'Jun 2024',
    end: 'Oct 2024',
    location: 'Dhaka, Bangladesh',
    track: 'work',
    summary: 'Built and deployed a ticketing service and maintained its backend.',
    project: 'ki-chole',
  },
  {
    org: "Mentors'",
    role: 'IELTS Instructor',
    start: 'Aug 2023',
    end: 'Present',
    location: 'Kalabagan, Dhaka, Bangladesh',
    track: 'teaching',
    summary:
      'Three years of teaching test strategy and language skills on the back of my own Band 8 - the reason I can explain a technical decision to a room that does not write code.',
  },
  {
    org: 'IBA, University of Dhaka',
    role: 'BBA candidate',
    start: 'Jul 2023',
    end: 'Jul 2027',
    location: 'Dhaka, Bangladesh',
    track: 'study',
    summary:
      'Business degree in parallel with everything above. Strategy, finance, and marketing coursework applied directly to products I was already shipping.',
  },
];

export const education = [
  {
    org: 'Institute of Business Administration, University of Dhaka',
    credential: 'BBA, Business',
    start: 'Jul 2023',
    end: 'Jul 2027',
  },
] as const;

export type Certification = {
  name: string;
  detail?: string;
  /** Highlighted credentials surface in the home proof strip. */
  highlight?: boolean;
};

export const certifications: Certification[] = [
  { name: 'IELTS Band 8', detail: 'Overall band score, academic module', highlight: true },
  { name: 'Associate Data Analyst in SQL' },
  { name: 'International Blockchain Olympiad' },
];

/** What is happening right now, for the home "Now" card. */
export const now = [
  { label: 'Building', icon: 'hammer', text: 'BanglaBiz with Invest Bangladesh', href: '/about' },
  { label: 'Teaching', icon: 'school', text: "IELTS at Mentors'", href: '/about' },
  { label: 'Studying', icon: 'book', text: 'BBA at IBA, University of Dhaka', href: '/about' },
  { label: 'Taking on', icon: 'briefcase', text: 'product, web, and mobile work', href: '/contact' },
] as const;

/**
 * Career milestones, newest first. Rendered as a fake `git log` in the easter egg.
 * Dates for the launch, IELTS, and "first Flutter" entries are approximate - adjust to taste.
 */
export const milestones = [
  { hash: 'f3a9d12', date: '2026-10', text: 'join: Project Associate at Invest Bangladesh (BanglaBiz)' },
  { hash: 'a91f2c7', date: '2026-03', text: 'wrap up: 2.5 years leading product at Upturn' },
  { hash: '5d3e0b4', date: '2025-07', text: 'ship: StuDays live on App Store and Play Store' },
  { hash: 'c07a8e1', date: '2024-11', text: 'launch: tathirmichil.com admissions platform' },
  { hash: '3b6d5f9', date: '2024-06', text: 'build: Ki Chole? ticketing service + backend' },
  { hash: 'e42c1a8', date: '2023-11', text: 'start: Head of Product at Upturn' },
  { hash: '9f81d30', date: '2023-08', text: 'teach: first IELTS batch at Mentors' },
  { hash: '0c5b7ae', date: '2023-07', text: 'enroll: BBA at IBA, University of Dhaka' },
  // TODO: confirm the IELTS test date.
  { hash: '7d2e9c3', date: '2023-05', text: 'score: IELTS overall Band 8' },
  { hash: '1a2f4d6', date: '2020-01', text: 'init: first line of production Flutter' },
] as const;
