/**
 * The home-page terminal, once the replay has finished (or been skipped), takes
 * real input. Commands navigate the site, open the easter egg, flip the theme,
 * and feed the achievement system.
 *
 * All site data arrives as JSON embedded by TerminalHero.astro, so this module
 * stays free of server imports and ships as one small script.
 */
import { navigate } from 'astro:transitions/client';
import { unlock, progress, unlocked } from './quests';

type TerminalData = {
  name: string;
  email: string;
  mail: string;
  linkedin: string;
  role: string;
  location: string;
  stack: string[];
  ielts: string;
  projects: { slug: string; name: string; tagline: string; href: string | null }[];
  quests: { id: string; title: string; hint: string }[];
};

type Ctx = {
  data: TerminalData;
  print: (text: string, tone?: 'out' | 'accent' | 'error') => void;
  clear: () => void;
  go: (href: string) => void;
};

type Command = {
  name: string;
  usage?: string;
  help: string;
  hidden?: boolean;
  run: (args: string[], ctx: Ctx) => void;
};

const HISTORY_KEY = 'saim.terminal.history.v1';
const USED_KEY = 'saim.terminal.used.v1';

function readList(key: string): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? '[]') as unknown;
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

function writeList(key: string, value: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(value.slice(-50)));
  } catch {
    /* private mode */
  }
}

const commands: Command[] = [
  {
    name: 'help',
    help: 'list commands',
    run: (_args, ctx) => {
      const visible = commands.filter((c) => !c.hidden);
      const width = Math.max(...visible.map((c) => (c.usage ?? c.name).length));
      for (const c of visible) ctx.print(`${(c.usage ?? c.name).padEnd(width)}  ${c.help}`);
      ctx.print('tab completes, up/down recalls, ctrl+l clears');
    },
  },
  {
    name: 'whoami',
    help: 'who is this',
    run: (_args, ctx) => {
      ctx.print(`${ctx.data.name} - ${ctx.data.role}`);
      ctx.print(ctx.data.location);
    },
  },
  {
    name: 'work',
    usage: 'work',
    help: 'list shipped projects',
    run: (_args, ctx) => {
      const width = Math.max(...ctx.data.projects.map((p) => p.slug.length));
      for (const p of ctx.data.projects) ctx.print(`${p.slug.padEnd(width)}  ${p.tagline}`);
      ctx.print('open <slug> for the case study');
    },
  },
  {
    name: 'open',
    usage: 'open <slug>',
    help: 'open a case study',
    run: (args, ctx) => {
      const slug = args[0];
      const project = ctx.data.projects.find((p) => p.slug === slug);
      if (!project) {
        ctx.print(slug ? `no project "${slug}"` : 'usage: open <slug>', 'error');
        ctx.print(`try: ${ctx.data.projects.map((p) => p.slug).join(', ')}`);
        return;
      }
      ctx.print(`opening ${project.name}...`, 'accent');
      ctx.go(`/work/${project.slug}`);
    },
  },
  {
    name: 'about',
    help: 'the longer story',
    run: (_args, ctx) => ctx.go('/about'),
  },
  {
    name: 'contact',
    help: 'how to reach me',
    run: (_args, ctx) => {
      ctx.print(ctx.data.email, 'accent');
      ctx.print(ctx.data.linkedin);
      ctx.print('or: contact --now  to open mail');
      if (_args.includes('--now')) ctx.go(ctx.data.mail);
    },
  },
  {
    name: 'stack',
    help: 'what I reach for',
    run: (_args, ctx) => ctx.print(ctx.data.stack.join('  ')),
  },
  {
    name: 'ielts',
    help: 'the band score',
    run: (_args, ctx) => ctx.print(ctx.data.ielts, 'accent'),
  },
  {
    name: 'theme',
    usage: 'theme [light|dark]',
    help: 'switch the lights',
    run: (args, ctx) => {
      const current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
      const next = args[0] === 'light' || args[0] === 'dark' ? args[0] : current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* ignore */
      }
      unlock('night-shift');
      ctx.print(`theme: ${next}`);
    },
  },
  {
    name: 'achievements',
    help: 'explorer progress',
    run: (_args, ctx) => {
      const { done, total } = progress();
      const have = new Set(unlocked());
      ctx.print(`${done}/${total} explored`, 'accent');
      for (const q of ctx.data.quests) {
        ctx.print(`${have.has(q.id) ? '[x]' : '[ ]'} ${q.title}${have.has(q.id) ? '' : `  - ${q.hint}`}`);
      }
    },
  },
  {
    name: 'clear',
    help: 'clear the screen',
    run: (_args, ctx) => ctx.clear(),
  },
  {
    name: 'git',
    usage: 'git log',
    help: 'career history, one line each',
    run: (args, ctx) => {
      if (args[0] !== 'log') return ctx.print('usage: git log', 'error');
      const open = (window as Window & { __openCareerLog?: () => void }).__openCareerLog;
      if (open) open();
      else ctx.print('career log unavailable here', 'error');
    },
  },
  {
    name: 'ls',
    hidden: true,
    help: '',
    run: (args, ctx) => commands.find((c) => c.name === 'work')!.run(args, ctx),
  },
  {
    name: 'sudo',
    hidden: true,
    help: '',
    run: (args, ctx) => {
      if (args.join(' ').toLowerCase().startsWith('hire')) {
        ctx.print('permission granted. opening mail...', 'accent');
        ctx.go(ctx.data.mail);
      } else {
        ctx.print('saim is not in the sudoers file. this incident will be reported.', 'error');
      }
    },
  },
  {
    name: 'pwd',
    hidden: true,
    help: '',
    run: (_args, ctx) => ctx.print('/home/saim/dhaka'),
  },
  {
    name: 'exit',
    hidden: true,
    help: '',
    run: (_args, ctx) => ctx.print('there is no exit, only scroll.'),
  },
];

const suggestions = ['help', 'work', 'open tathirmichil', 'achievements', 'git log'];

let bound: HTMLElement | null = null;

export function mountTerminal(terminal: HTMLElement) {
  if (bound === terminal) return;
  bound = terminal;

  const raw = terminal.querySelector('[data-terminal-data]')?.textContent;
  if (!raw) return;
  const data = JSON.parse(raw) as TerminalData;

  const code = terminal.querySelector<HTMLElement>('.terminal-code');
  const promptLine = terminal.querySelector<HTMLElement>('[data-terminal-prompt]');
  const input = terminal.querySelector<HTMLInputElement>('[data-terminal-input]');
  const body = terminal.querySelector<HTMLElement>('.terminal-body');
  const chips = terminal.querySelector<HTMLElement>('[data-terminal-chips]');
  if (!code || !promptLine || !input || !body) return;

  const history = readList(HISTORY_KEY);
  let cursor = history.length;
  let used = new Set(readList(USED_KEY));

  const scroll = () => {
    body.scrollTop = body.scrollHeight;
  };

  const line = (text: string, tone: 'out' | 'accent' | 'error' = 'out') => {
    const el = document.createElement('span');
    el.className = 'terminal-line';
    const inner = document.createElement('span');
    inner.className = tone === 'accent' ? 'text-warm' : tone === 'error' ? 'text-error' : 'text-fg-soft';
    inner.textContent = text;
    el.append(inner);
    code.insertBefore(el, promptLine);
    scroll();
  };

  const echo = (cmd: string) => {
    const el = document.createElement('span');
    el.className = 'terminal-line';
    const dollar = document.createElement('span');
    dollar.className = 'select-none text-accent';
    dollar.setAttribute('aria-hidden', 'true');
    dollar.textContent = '$ ';
    const text = document.createElement('span');
    text.className = 'text-fg';
    text.textContent = cmd;
    el.append(dollar, text);
    code.insertBefore(el, promptLine);
  };

  const ctx: Ctx = {
    data,
    print: line,
    clear: () => {
      for (const el of [...code.children]) if (el !== promptLine) el.remove();
    },
    go: (href) => {
      if (href.startsWith('mailto:')) {
        window.location.assign(href);
        return;
      }
      window.setTimeout(() => navigate(href), 320);
    },
  };

  const run = (rawInput: string) => {
    const text = rawInput.trim();
    echo(text);
    if (!text) return;

    history.push(text);
    writeList(HISTORY_KEY, history);
    cursor = history.length;

    const [name, ...args] = text.split(/\s+/);
    const command = commands.find((c) => c.name === name.toLowerCase());
    if (!command) {
      line(`command not found: ${name}. try help`, 'error');
      return;
    }

    command.run(args, ctx);

    unlock('terminal');
    used.add(command.name);
    writeList(USED_KEY, [...used]);
    if (used.size >= 5) unlock('hacker');
  };

  const complete = () => {
    const value = input.value;
    const [first, ...rest] = value.split(/\s+/);
    if (rest.length === 0) {
      const matches = commands.filter((c) => !c.hidden && c.name.startsWith(first.toLowerCase()));
      if (matches.length === 1) input.value = `${matches[0].name} `;
      else if (matches.length > 1) line(matches.map((c) => c.name).join('  '));
      return;
    }
    if (first === 'open') {
      const partial = rest[rest.length - 1] ?? '';
      const matches = data.projects.filter((p) => p.slug.startsWith(partial));
      if (matches.length === 1) input.value = `open ${matches[0].slug}`;
      else if (matches.length > 1) line(matches.map((p) => p.slug).join('  '));
    }
  };

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      run(input.value);
      input.value = '';
    } else if (event.key === 'Tab') {
      event.preventDefault();
      complete();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (cursor > 0) input.value = history[--cursor] ?? '';
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      cursor = Math.min(history.length, cursor + 1);
      input.value = history[cursor] ?? '';
    } else if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      ctx.clear();
    }
  });

  // Clicking anywhere in the body focuses the prompt, like a real terminal.
  body.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a, button')) return;
    input.focus({ preventScroll: true });
  });

  chips?.addEventListener('click', (event) => {
    const chip = (event.target as Element).closest<HTMLElement>('[data-terminal-chip]');
    if (!chip) return;
    run(chip.dataset.terminalChip ?? '');
    input.focus({ preventScroll: true });
  });

  if (chips) {
    chips.replaceChildren(
      ...suggestions.map((cmd) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.terminalChip = cmd;
        button.className =
          'rounded border border-line px-2 py-0.5 font-mono text-[0.65rem] text-muted transition-colors hover:border-accent hover:text-accent';
        button.textContent = cmd;
        return button;
      }),
    );
  }

  // Announce command output only once the replay is over, so the typing
  // animation does not narrate itself character by character.
  code.setAttribute('aria-live', 'polite');
  promptLine.hidden = false;
  if (chips) chips.hidden = false;
  scroll();
}

function init() {
  const terminal = document.querySelector<HTMLElement>('[data-terminal]');
  if (!terminal) {
    bound = null;
    return;
  }
  // Wait for the replay (TerminalHero sets data-ready when done or skipped).
  if (terminal.dataset.ready) {
    mountTerminal(terminal);
    return;
  }
  const observer = new MutationObserver(() => {
    if (terminal.dataset.ready) {
      observer.disconnect();
      mountTerminal(terminal);
    }
  });
  observer.observe(terminal, { attributes: true, attributeFilter: ['data-ready'] });
}

document.addEventListener('astro:page-load', init);
if (document.readyState !== 'loading') init();
