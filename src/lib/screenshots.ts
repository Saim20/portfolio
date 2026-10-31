import type { ImageMetadata } from 'astro';

/**
 * Optional project screenshots.
 *
 * Drop a file named after the project slug into `src/assets/projects/`
 * (e.g. `tathirmichil.webp`) and the cards and case studies upgrade from the
 * generated poster to a real, build-optimised image. No code change needed.
 *
 * Mobile projects can instead ship several portrait screens named
 * `<slug>-1.webp`, `<slug>-2.webp`, ... and the poster renders them as a
 * phone composite.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/projects/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

const bySlug = new Map<string, ImageMetadata>();
const screensBySlug = new Map<string, { index: number; image: ImageMetadata }[]>();

for (const [path, mod] of Object.entries(files)) {
  const name = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  const numbered = name.match(/^(.+)-(\d+)$/);
  if (numbered) {
    const [, slug, index] = numbered;
    const list = screensBySlug.get(slug) ?? [];
    list.push({ index: Number(index), image: mod.default });
    screensBySlug.set(slug, list);
  } else {
    bySlug.set(name, mod.default);
  }
}

export function getScreenshot(slug: string): ImageMetadata | undefined {
  return bySlug.get(slug);
}

/** Numbered screens for a slug, sorted ascending. Empty when none exist. */
export function getScreens(slug: string): ImageMetadata[] {
  return (screensBySlug.get(slug) ?? [])
    .sort((a, b) => a.index - b.index)
    .map((entry) => entry.image);
}
