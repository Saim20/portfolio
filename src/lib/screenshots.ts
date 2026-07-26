import type { ImageMetadata } from 'astro';

/**
 * Optional project screenshots.
 *
 * Drop a file named after the project slug into `src/assets/projects/`
 * (e.g. `tathirmichil.webp`) and the cards and case studies upgrade from the
 * generated poster to a real, build-optimised image. No code change needed.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/projects/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

const bySlug = new Map<string, ImageMetadata>(
  Object.entries(files).map(([path, mod]) => [
    path.split('/').pop()!.replace(/\.[^.]+$/, ''),
    mod.default,
  ]),
);

export function getScreenshot(slug: string): ImageMetadata | undefined {
  return bySlug.get(slug);
}
