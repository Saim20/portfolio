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
  /** Short mono glyph shown in the HUD list. */
  icon: string;
};

export const quests: Quest[] = [
  { id: 'first-steps', title: 'First steps', hint: 'Scroll past the hero.', icon: '>' },
  { id: 'persona', title: 'Know thyself', hint: 'Tell the home page who you are.', icon: '@' },
  { id: 'terminal', title: 'Hello, shell', hint: 'The terminal on the home page takes input.', icon: '$' },
  { id: 'hacker', title: 'Power user', hint: 'Run five different commands.', icon: '#' },
  { id: 'case-study', title: 'Reader', hint: 'Open any case study.', icon: '*' },
  { id: 'completionist', title: 'Completionist', hint: 'Read every case study, including the old one.', icon: '%' },
  { id: 'night-shift', title: 'Night shift', hint: 'Change the lights.', icon: '~' },
  { id: 'timeline', title: 'Historian', hint: 'Find where the work history lives.', icon: '|' },
  { id: 'git-log', title: 'Archaeologist', hint: 'Up, up, down, down... or triple-click the logo.', icon: '^' },
  { id: 'ready-to-talk', title: 'Ready to talk', hint: 'Reach for a contact link.', icon: '&' },
];

export const QUEST_TOTAL = quests.length;

export function getQuest(id: string): Quest | undefined {
  return quests.find((quest) => quest.id === id);
}
