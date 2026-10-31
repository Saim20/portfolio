/**
 * Explorer mode achievement store. Runs in the browser only.
 *
 * Loaded once per full page load (Astro bundles it as a module script) and
 * re-binds its DOM hooks on every `astro:page-load`, so it survives client-side
 * navigation. State is a Set of unlocked ids in localStorage.
 *
 * Declarative hooks, so pages need no bespoke code:
 *   data-quest="id"              unlock on click
 *   data-quest-view="id"         unlock once the element is in view
 *   data-quest-page="case-study:<slug>"  record a visited case study; all of them
 *                                 (data-quest-page-total) unlocks `completionist`
 *
 * Inline scripts that cannot import this module can dispatch
 *   document.dispatchEvent(new CustomEvent('quest:request', { detail: { id } }))
 */
import { QUEST_TOTAL, getQuest, quests } from '../data/quests';

const KEY = 'saim.quests.v1';
const SEEN_KEY = 'saim.quests.seen.v1';
const VALID = new Set(quests.map((quest) => quest.id));

export type QuestUnlockDetail = { id: string; title: string; done: number; total: number };

declare global {
  interface Window {
    __quests?: QuestsApi;
  }
  interface DocumentEventMap {
    'quest:unlock': CustomEvent<QuestUnlockDetail>;
    'quest:request': CustomEvent<{ id: string }>;
    'quest:reset': CustomEvent<void>;
  }
}

function readSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : []);
  } catch {
    return new Set();
  }
}

function writeSet(key: string, value: Set<string>) {
  try {
    localStorage.setItem(key, JSON.stringify([...value]));
  } catch {
    /* private mode: state lives for this page only */
  }
}

let unlockedSet = readSet(KEY);

export function unlocked(): string[] {
  return [...unlockedSet];
}

export function has(id: string): boolean {
  return unlockedSet.has(id);
}

export function progress(): { done: number; total: number } {
  return { done: unlockedSet.size, total: QUEST_TOTAL };
}

/** Returns true when the quest was newly unlocked. */
export function unlock(id: string): boolean {
  if (!VALID.has(id) || unlockedSet.has(id)) return false;
  unlockedSet.add(id);
  writeSet(KEY, unlockedSet);
  const { done, total } = progress();
  document.dispatchEvent(
    new CustomEvent<QuestUnlockDetail>('quest:unlock', {
      detail: { id, title: getQuest(id)?.title ?? id, done, total },
    }),
  );
  return true;
}

export function reset() {
  unlockedSet = new Set();
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(SEEN_KEY);
  } catch {
    /* ignore */
  }
  document.dispatchEvent(new CustomEvent('quest:reset'));
}

function recordPage(token: string, total: number) {
  const [kind, slug] = token.split(':');
  if (kind !== 'case-study' || !slug) return;
  unlock('case-study');
  const seen = readSet(SEEN_KEY);
  seen.add(slug);
  writeSet(SEEN_KEY, seen);
  if (total > 0 && seen.size >= total) unlock('completionist');
}

export type QuestsApi = {
  unlock: typeof unlock;
  has: typeof has;
  progress: typeof progress;
  unlocked: typeof unlocked;
  reset: typeof reset;
};

let viewObserver: IntersectionObserver | null = null;

function bind() {
  // Click hooks are delegated once (see below); view hooks need a fresh observer per page.
  viewObserver?.disconnect();
  const targets = document.querySelectorAll<HTMLElement>('[data-quest-view]');
  if (targets.length > 0 && 'IntersectionObserver' in window) {
    viewObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = (entry.target as HTMLElement).dataset.questView;
          if (id) unlock(id);
          viewObserver?.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );
    for (const target of targets) viewObserver.observe(target);
  }

  const page = document.querySelector<HTMLElement>('[data-quest-page]');
  if (page?.dataset.questPage) {
    recordPage(page.dataset.questPage, Number(page.dataset.questPageTotal ?? 0));
  }
}

if (typeof window !== 'undefined' && !window.__quests) {
  window.__quests = { unlock, has, progress, unlocked, reset };

  document.addEventListener('click', (event) => {
    const target = (event.target as Element | null)?.closest<HTMLElement>('[data-quest]');
    if (target?.dataset.quest) unlock(target.dataset.quest);
  });

  document.addEventListener('quest:request', (event) => {
    if (event.detail?.id) unlock(event.detail.id);
  });

  document.addEventListener('astro:page-load', bind);
  // Module scripts are deferred, so the first page may already be loaded.
  if (document.readyState !== 'loading') bind();
}
