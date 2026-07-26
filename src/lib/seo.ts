import { site, contact, skillGroups, certifications, experience, education } from '../data/site';
import { projects, type Project } from '../data/projects';

const PERSON_ID = `${site.url}/#person`;
const WEBSITE_ID = `${site.url}/#website`;

export const OG_IMAGE = '/og.png';

export function absolute(path: string): string {
  return new URL(path, site.url).href;
}

export function canonical(pathname: string): string {
  // Trailing slashes are normalised away so one page never has two canonical forms.
  // The site origin itself also has no trailing slash, matching the sitemap.
  const clean = pathname.replace(/\/+$/, '') || '';
  return `${site.url}${clean}`;
}

function personNode() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    jobTitle: site.role,
    description: site.description,
    email: `mailto:${contact.email}`,
    telephone: contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressCountry: 'BD',
    },
    sameAs: [contact.linkedin],
    knowsAbout: skillGroups.flatMap((group) => [...group.items]),
    hasCredential: certifications.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cert.name,
    })),
    alumniOf: education.map((entry) => ({
      '@type': 'EducationalOrganization',
      name: entry.org,
    })),
    worksFor: experience.map((entry) => ({
      '@type': 'Organization',
      name: entry.org,
    })),
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.title,
    description: site.description,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
  };
}

export function projectNode(project: Project) {
  const isApp = project.category === 'Mobile app';
  const url = project.links[0]?.href ?? absolute(`/work/${project.slug}`);

  return {
    '@type': isApp ? 'MobileApplication' : 'WebApplication',
    '@id': absolute(`/work/${project.slug}#software`),
    name: project.name,
    url,
    applicationCategory: isApp ? 'ShoppingApplication' : 'BusinessApplication',
    ...(isApp ? { operatingSystem: 'iOS, Android' } : { browserRequirements: 'Requires JavaScript' }),
    description: project.summary,
    author: { '@id': PERSON_ID },
    creator: { '@id': PERSON_ID },
    keywords: project.stack.join(', '),
  };
}

type BreadcrumbEntry = { name: string; path: string };

export function breadcrumbNode(entries: BreadcrumbEntry[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: canonical(entry.path),
    })),
  };
}

export function itemListNode() {
  return {
    '@type': 'ItemList',
    name: 'Selected work',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: canonical(`/work/${project.slug}`),
      name: project.name,
    })),
  };
}

export function profilePageNode(pathname: string) {
  return {
    '@type': 'ProfilePage',
    '@id': `${canonical(pathname)}#profilepage`,
    url: canonical(pathname),
    mainEntity: { '@id': PERSON_ID },
    about: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}

/**
 * One `@graph` per page keeps the nodes cross-referenced by `@id` instead of
 * repeating the same Person object in three separate scripts.
 */
export function buildGraph(extra: object[] = []) {
  return {
    '@context': 'https://schema.org',
    '@graph': [personNode(), websiteNode(), ...extra],
  };
}
