/**
 * Explorer mode achievements. Unlock state lives in the visitor's localStorage
 * only (see src/scripts/quests.ts); nothing is sent anywhere.
 *
 * `hint` is what a locked quest shows in the HUD - a nudge, not the answer.
 */
export type Quest = {
  id: string;
  title: string;
  hint: string;
  /** Name of an icon in Icon.astro. */
  icon: string;
};

export const quests: Quest[] = [
  { id: 'first-steps', title: 'First steps', hint: 'Scroll past the hero.', icon: 'arrow-down' },
  { id: 'persona', title: 'Know thyself', hint: 'Tell the home page who you are.', icon: 'users' },
  { id: 'terminal', title: 'Hello, shell', hint: 'Open the terminal from the side and type.', icon: 'terminal' },
  { id: 'hacker', title: 'Power user', hint: 'Run five different commands.', icon: 'zap' },
  { id: 'case-study', title: 'Reader', hint: 'Open any case study.', icon: 'book' },
  { id: 'completionist', title: 'Completionist', hint: 'Read every case study, including the old one.', icon: 'layers' },
  { id: 'night-shift', title: 'Night shift', hint: 'Change the lights.', icon: 'moon' },
  { id: 'timeline', title: 'Historian', hint: 'Find where the work history lives.', icon: 'clock' },
  { id: 'git-log', title: 'Archaeologist', hint: 'Up, up, down, down... or triple-click the name.', icon: 'search' },
  { id: 'ready-to-talk', title: 'Ready to talk', hint: 'Reach for a contact link.', icon: 'mail' },
];

export const QUEST_TOTAL = quests.length;

export function getQuest(id: string): Quest | undefined {
  return quests.find((quest) => quest.id === id);
}
