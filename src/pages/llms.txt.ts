import type { APIRoute } from 'astro';

import {
  site,
  contact,
  services,
  skillGroups,
  experience,
  education,
  certifications,
} from '../data/site';
import { projects } from '../data/projects';

/**
 * https://llmstxt.org - a plain-text digest of the whole site so a model can
 * answer questions about Saimul without crawling and parsing every page.
 * Generated from the same data as the UI, so it can never drift.
 */
export const GET: APIRoute = () => {
  const url = (path: string) => new URL(path, site.url).href;

  const lines: string[] = [
    `# ${site.name}`,
    '',
    `> ${site.role} based in ${site.location.city}, ${site.location.country}. ${site.tagline}`,
    '',
    site.description,
    '',
    '## Contact',
    '',
    `- Email: ${contact.email}`,
    `- Phone: ${contact.phone}`,
    `- LinkedIn: ${contact.linkedin}`,
    `- Website: ${site.url}`,
    `- Location: ${site.location.city}, ${site.location.country} (${site.location.timeZone})`,
    ...(site.availability ? [`- Availability: ${site.availability}`] : []),
    '',
    '## What he does',
    '',
    ...services.map((service) => `- ${service.title}: ${service.body}`),
    '',
    '## Projects',
    '',
  ];

  for (const project of projects) {
    lines.push(
      `### ${project.name} (${project.category}) - ${url(`/work/${project.slug}`)}`,
      '',
      `- Role: ${project.role}`,
      `- Period: ${project.period}`,
      `- Status: ${project.live ? 'live' : 'no longer publicly available'}`,
      `- Stack: ${project.stack.join(', ')}`,
      ...project.links.map((link) => `- ${link.label}: ${link.href}`),
      `- Summary: ${project.summary}`,
      '',
      `Problem: ${project.problem}`,
      '',
      'What he built:',
      ...project.approach.map((item) => `- ${item}`),
      '',
    );
  }

  lines.push(
    '## Experience',
    '',
    ...experience.map(
      (entry) => `- ${entry.role}, ${entry.org} (${entry.start} – ${entry.end}): ${entry.summary}`,
    ),
    '',
    '## Education',
    '',
    ...education.map((entry) => `- ${entry.credential}, ${entry.org} (${entry.start} – ${entry.end})`),
    '',
    '## Certifications',
    '',
    ...certifications.map((cert) => `- ${cert.name}`),
    '',
    '## Skills',
    '',
    ...skillGroups.map((group) => `- ${group.label}: ${group.items.join(', ')}`),
    '',
    '## Pages',
    '',
    `- Home: ${url('/')}`,
    `- Work: ${url('/work')}`,
    ...projects.map((project) => `- ${project.name} case study: ${url(`/work/${project.slug}`)}`),
    `- About: ${url('/about')}`,
    `- Contact: ${url('/contact')}`,
    '',
  );

  return new Response(`${lines.join('\n').trimEnd()}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
