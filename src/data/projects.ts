/**
 * Featured work. Order here is the order shown on the site.
 *
 * Stack chips are the honest short version - worth a read-through before launch so
 * every chip is something you would defend in a client call.
 */

export type ProjectLink = {
  label: string;
  href: string;
  /** Primary links get the filled button treatment. */
  primary?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  /** One line, benefit-first, shown on cards and in search results. */
  tagline: string;
  category: 'Web platform' | 'Mobile app' | 'SaaS';
  role: string;
  period: string;
  /** Set false for work that is no longer publicly reachable. */
  live: boolean;
  featured: boolean;
  /** Used for the poster gradient when no screenshot has been added yet. */
  accent: string;
  stack: string[];
  links: ProjectLink[];
  /** Case study body. */
  problem: string;
  approach: string[];
  highlights: { label: string; value: string }[];
  /** Rendered verbatim into /llms.txt and the meta description. */
  summary: string;
  /**
   * One honest behind-the-scenes note, shown only on the /unlocked reward page.
   * TODO: the current entries are drafted placeholders - replace each with the real story.
   */
  commentary: string;
};

const studaysAppStore =
  import.meta.env.PUBLIC_STUDAYS_APPSTORE_URL ||
  'https://apps.apple.com/us/app/studays-student-discount-app/id6475007294';
const studaysPlayStore =
  import.meta.env.PUBLIC_STUDAYS_PLAY_URL ||
  'https://play.google.com/store/apps/details?id=com.nexity.studays';

export const projects: Project[] = [
  {
    slug: 'tathirmichil',
    name: 'Tathirmichil',
    tagline:
      'An admissions prep platform where students sit timed mock tests and see exactly where they stand.',
    category: 'Web platform',
    role: 'Architect & Full-stack Engineer',
    period: '2024 - present',
    live: true,
    featured: true,
    accent: '#5eead4',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Firebase', 'Tailwind CSS', 'Vercel'],
    links: [
      { label: 'Visit tathirmichil.com', href: 'https://www.tathirmichil.com', primary: true },
    ],
    problem:
      'IBA admission candidates were stitching together SAT, GRE, and GMAT books, scattered PDFs, and group chats. The instructor behind Michil - Tathir Mohtadi Chowdhury, Rank 1 of the 31st batch - needed one place to run a whole preparation season: teach, test, rank, and keep a full batch of students motivated at the same time.',
    approach: [
      'Built a full assessment engine: timed 90-minute mock tests modelled on real question papers, with per-section and per-topic scoring.',
      'Turned raw attempts into analytics students act on - accuracy, time management, strengths and weaknesses, and a median comparison against everyone else who sat the same test.',
      'Added a coin and leaderboard economy so daily practice feels like a game instead of homework, which is what students quote most in their testimonials.',
      'Shipped an admin surface for the instructor: authoring questions, publishing tests and results, running batches, and posting announcements without a developer in the loop.',
      'Moved heavy result publishing and challenge scoring into a background worker so the app stays responsive when an entire batch submits at once.',
    ],
    highlights: [
      { label: 'Free assessment test', value: '90-minute diagnostic modelled on real papers' },
      { label: 'Analytics', value: 'Per-topic breakdown and median comparison' },
      { label: 'Retention', value: 'Coins, leaderboards, and live batch community' },
    ],
    summary:
      'Tathirmichil is an IBA admission preparation platform: timed mock tests, per-topic analytics, median comparison, a coin and leaderboard system, an instructor admin panel, and a live batch community. Built with Next.js, TypeScript, Supabase, and Firebase on Vercel.',
    commentary:
      'The first result-publishing run was synchronous. A full batch submitted a mock within the same minute and the request timed out halfway through scoring. That night is why there is a background worker now - and why I never ship a "publish to everyone" button without a queue behind it.',
  },
  {
    slug: 'flow-upturn',
    name: 'Flow',
    tagline:
      'Operations, HR, and accounting for growing companies - in one system instead of five spreadsheets.',
    category: 'SaaS',
    role: 'Head of Product',
    period: 'Nov 2023 - Mar 2026',
    live: true,
    featured: true,
    accent: '#60a5fa',
    stack: ['Next.js', 'TypeScript', 'Multi-tenant SaaS', 'Role-based access'],
    links: [
      { label: 'Visit flow.upturn.com.bd', href: 'https://flow.upturn.com.bd', primary: true },
    ],
    problem:
      'Small and mid-sized companies in Bangladesh run operations across WhatsApp, paper forms, and a pile of spreadsheets. Attendance lives in one place, payroll in another, client work in a third, and nobody trusts the numbers at month end. Flow set out to replace that whole stack for teams of 10 to 50.',
    approach: [
      'Owned the product end to end as Head of Product: what shipped, in what order, and why it was worth building.',
      'Scoped and shipped integrated modules rather than isolated tools - task and project tracking, process automation, HRIS, attendance, leave, and payroll all reading the same employee record.',
      'Built employee-facing services that remove admin back-and-forth: notices, requisitions, expense settlements, and complaints, each with its own approval trail.',
      'Modelled onboarding and offboarding as repeatable workflows, so a new hire or an exit is a checklist the system runs rather than something a manager remembers.',
      'Extended the platform outward with stakeholder management: custom processes per client or vendor, a public ticket submission portal, and per-stakeholder billing and transactions.',
      'Shaped commercial packaging alongside the product - tiered plans by team size plus a per-stakeholder add-on.',
    ],
    highlights: [
      { label: 'Scope', value: '17 modules across ops, HR, and finance' },
      { label: 'Access control', value: 'Team-based granular permissions' },
      { label: 'Pricing', value: 'Three tiers plus stakeholder add-on' },
    ],
    summary:
      'Flow is a business operations platform by Upturn combining workflow automation, HR (HRIS, attendance, leave, payroll), employee services, onboarding and offboarding, stakeholder management, and financial transactions in one system. Saimul Islam led it as Head of Product from November 2023 to March 2026.',
    commentary:
      'Seventeen modules is too many to launch with. Looking back, I would have shipped attendance, leave, and payroll first, charged for them, and let paying customers pull the rest out of us. We built breadth before we had earned it, and the sales conversations got easier only once we started leading with the three modules every company actually asked about.',
  },
  {
    slug: 'studays',
    name: 'StuDays',
    tagline:
      'A student ID in your pocket that unlocks real discounts at 150+ brands across Dhaka.',
    category: 'Mobile app',
    role: 'Tech Lead',
    period: 'Mar 2024 - Jul 2025',
    live: true,
    featured: true,
    accent: '#fbbf24',
    stack: ['Flutter', 'Dart', 'iOS & Android release', 'REST APIs'],
    links: [
      { label: 'App Store', href: studaysAppStore, primary: true },
      { label: 'Google Play', href: studaysPlayStore, primary: true },
      { label: 'mystudays.com', href: 'https://mystudays.com' },
    ],
    problem:
      'Student discounts in Bangladesh existed but were invisible: a vendor would agree to a deal, and students either never heard about it or turned up without a way to prove they were students. Nexity Bangladesh wanted a single app that handles both sides - proof of student status, and a catalogue of offers worth opening the app for.',
    approach: [
      'Led the build of a cross-platform Flutter app shipped to both the App Store and Google Play from one codebase.',
      'Implemented in-app student verification that issues a digital student ID, replacing the physical card at the counter.',
      'Built a browsable offers catalogue across food, fashion, tech, fitness, beauty, travel, groceries, telecom, books, and subscriptions.',
      'Owned the release pipeline end to end - store review cycles, versioned rollouts, and post-launch fixes across iOS and Android.',
    ],
    highlights: [
      // Figures from the public App Store listing (iTunes lookup, Nov 2026). Hard-coded on purpose.
      { label: 'App Store', value: '4.3 / 5 rating, live since Jan 2024, now on v4.1' },
      { label: 'Reach', value: '150+ partner brands in Dhaka' },
      { label: 'Platforms', value: 'iOS, iPadOS, and Android from one codebase' },
    ],
    summary:
      'StuDays is a Flutter app for iOS and Android that gives students in Bangladesh a verified digital student ID and access to discounts from 150+ brands. Rated 4.3 on the App Store. Saimul Islam was Tech Lead from March 2024 to July 2025.',
    commentary:
      'Our first App Store rejection was for the student ID screen: a reviewer could not get past verification because they were, reasonably, not a Bangladeshi student. We added a reviewer demo path the same week. Every store submission since has shipped with a documented test account before the build is even uploaded.',
  },
  {
    slug: 'ki-chole',
    name: 'Ki Chole?',
    tagline: 'A mobile ticketing service, built and deployed end to end in five months.',
    category: 'Mobile app',
    role: 'Mobile Application Developer',
    period: 'Jun 2024 - Oct 2024',
    live: false,
    featured: false,
    accent: '#f472b6',
    stack: ['Flutter', 'Dart', 'Backend maintenance'],
    links: [],
    problem:
      'A short, focused engagement: build a ticketing service, get it deployed, and keep the backend behind it healthy.',
    approach: [
      'Built and deployed the ticketing application.',
      'Maintained the backend behind it, keeping ticket issuance and event data consistent.',
    ],
    highlights: [{ label: 'Duration', value: '5-month build and deploy' }],
    summary:
      'Ki Chole? is a mobile ticketing service Saimul Islam built and deployed, including backend maintenance, between June and October 2024.',
    commentary:
      'Five months, one developer, and a launch date set by an event that would not move. The lesson was scoping: we cut seat selection to "general admission" in week two and the app shipped on time. The fancy version would have shipped late to an empty venue.',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const projectCategories = [...new Set(projects.map((p) => p.category))];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
