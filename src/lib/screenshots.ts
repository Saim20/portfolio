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

/** Caption-bearing frames for case studies. Filenames match Project.gallery. */
const galleryFiles = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/projects/gallery/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

const bySlug = new Map<string, ImageMetadata>();
const screensBySlug = new Map<string, { index: number; image: ImageMetadata }[]>();
const galleryByFile = new Map<string, ImageMetadata>();

for (const [path, mod] of Object.entries(galleryFiles)) {
  galleryByFile.set(path.split('/').pop()!, mod.default);
}

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

/** A case-study gallery frame. Throws if the file was listed but not exported. */
export function getGalleryImage(file: string): ImageMetadata {
  const image = galleryByFile.get(file);
  if (!image) throw new Error(`Missing gallery image: ${file}`);
  return image;
}

/** Numbered screens for a slug, sorted ascending. Empty when none exist. */
export function getScreens(slug: string): ImageMetadata[] {
  return (screensBySlug.get(slug) ?? [])
    .sort((a, b) => a.index - b.index)
    .map((entry) => entry.image);
}
