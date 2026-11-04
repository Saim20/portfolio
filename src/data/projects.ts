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
  /**
   * Extra product screens on the case study, after the poster.
   * `file` is a filename in src/assets/projects/gallery/.
   */
  gallery?: { file: string; alt: string; caption: string }[];
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
      'Admissions prep for IBA and the exams around it, where a student sits a real paper and sees exactly where they stand.',
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
      'Candidates for IBA, and for BUP, JU IBA, and Dhaka University B and C unit, were stitching together SAT, GRE, and GMAT books, scattered PDFs, and group chats. The instructor behind Michil - Tathir Mohtadi Chowdhury, Rank 1 of the 31st batch - needed one place to run a whole preparation season: teach, test, rank, and keep a full batch of students motivated at the same time.',
    approach: [
      'Built one exam engine for several ways of sitting a paper: free assessments, topic practice, scheduled live tests, real-time challenge rooms, and an offline mock circuit run at centres.',
      'Turned each attempt into something a student can act on - score, accuracy, time per question, a breakdown by section and topic, negative marking, and a drill built from the questions they missed.',
      'Added a coin and leaderboard economy on top of bKash subscriptions, so practice, class materials, and the paid batch live in the same account.',
      'Shipped a staff console that can author and publish at that volume: the question bank, test scheduling, batches, and announcements, without a developer in the loop.',
      'Moved result publishing and challenge-room phases into a background worker. The browser is not the source of truth for when a round starts or ends, and a full batch submitting at once does not take the app down.',
    ],
    highlights: [
      { label: 'Accounts', value: 'About 11,900 as of 1 Nov 2026' },
      { label: 'Tests submitted', value: 'About 82,500 on that snapshot' },
      { label: 'Question bank', value: 'About 48,000 items' },
    ],
    gallery: [
      {
        file: 'tathirmichil-admin.webp',
        alt: 'Admin dashboard with account, subscription, and test totals',
        caption: 'Staff home on 1 Nov 2026: accounts, subscriptions, and tests submitted.',
      },
      {
        file: 'tathirmichil-tests.webp',
        alt: 'Practice catalog with assessment, practice, live, and challenge modes',
        caption: 'One test area: assessments, topic practice, live papers, and challenge rooms.',
      },
      {
        file: 'tathirmichil-results.webp',
        alt: 'Practice test result with attempt, accuracy, and time per question',
        caption: 'A result breaks the paper into attempted, correct, accuracy, and time.',
      },
      {
        file: 'tathirmichil-leaderboard.webp',
        alt: 'Coin leaderboard filtered by batch, with ranks shown as Student N',
        caption: 'Michilcoins, ranked by batch, with daily and weekly movement.',
      },
    ],
    summary:
      'Tathirmichil is a multi-program admissions platform for University of Dhaka IBA and sibling exams (BUP, JU IBA, DU B and C unit). Students sit assessments, topic practice, live tests, and real-time challenge rooms, then see per-topic analytics, and a coin leaderboard sits on top of bKash subscriptions. Staff author questions, tests, and batches from the same site. On 1 November 2026 it had about 11,900 accounts, 82,500 tests submitted, and 48,000 questions in the bank. Built with Next.js, TypeScript, Supabase, and Firebase on Vercel.',
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
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Capacitor'],
    links: [
      { label: 'Visit flow.upturn.com.bd', href: 'https://flow.upturn.com.bd', primary: true },
    ],
    problem:
      'Small and mid-sized companies in Bangladesh run operations across WhatsApp, paper forms, and a pile of spreadsheets. Attendance lives in one place, payroll in another, client work in a third, and nobody trusts the numbers at month end. Flow set out to replace that whole stack for teams of 10 to 50.',
    approach: [
      'Led the product as Head of Product, and shipped modules that share one employee record: tasks, projects, attendance, leave, and payroll.',
      'Put every approval in one inbox - leave, attendance corrections, requisitions, expense settlements, and complaints - instead of a separate trail per form.',
      'Geofenced attendance to company sites, and required admin approval before a new device could sign in.',
      'Extended the same system to clients and vendors: configurable sales processes, invoicing, and a public ticket portal.',
      'Shipped it as a web app, an installable PWA, and Capacitor shells for iOS and Android.',
    ],
    highlights: [
      { label: 'Shared record', value: 'Tasks, attendance, leave, and payroll on one employee' },
      { label: 'Approvals', value: 'One inbox for every request waiting on you' },
      { label: 'Clients', value: 'Web app, installable PWA, and iOS and Android shells' },
    ],
    gallery: [
      {
        file: 'flow-search.webp',
        alt: 'Command palette listing operations modules such as tasks, attendance, and leave',
        caption: 'Ctrl+K jumps across operations, settings, and in-app tutorials.',
      },
      {
        file: 'flow-timeline.webp',
        alt: 'Project milestone timeline with completed bars and duration totals',
        caption: 'Projects track milestones on a timeline, with weight and status.',
      },
      {
        file: 'flow-process.webp',
        alt: 'Ordered steps of a configurable stakeholder sales process',
        caption: 'Stakeholder work is a process the company defines, step by step.',
      },
    ],
    summary:
      'Flow is a multi-tenant operations platform by Upturn. Tasks, projects, geofenced attendance, leave, and payroll share one employee record, and managers clear leave, corrections, requisitions, settlements, and complaints from a single inbox. Stakeholder processes, invoicing, and a public ticket portal sit on the same system, which runs as a web app, an installable PWA, and iOS and Android shells. Saimul Islam led it as Head of Product from November 2023 to March 2026.',
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

/** Small stroke mark for a work category. Names match Icon.astro. */
export const categoryIcons = {
  'Web platform': 'globe',
  'Mobile app': 'phone',
  SaaS: 'briefcase',
} as const satisfies Record<Project['category'], string>;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
