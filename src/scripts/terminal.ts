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
      ctx.print('tab completes, arrows move the list, ctrl+l clears');
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
      const slug = args[0]?.toLowerCase();
      const project = ctx.data.projects.find((p) => p.slug.toLowerCase() === slug);
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
      const requested = args[0]?.toLowerCase();
      const next = requested === 'light' || requested === 'dark' ? requested : current === 'dark' ? 'light' : 'dark';
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
      if (args[0]?.toLowerCase() !== 'log') return ctx.print('usage: git log', 'error');
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

type LogEntry =
  | { kind: 'cmd'; text: string; ok: boolean }
  | { kind: 'out'; text: string; tone: 'out' | 'accent' | 'error' }
  | { kind: 'clear' };

const LOG_KEY = 'saim.terminal.log.v1';
/** Survives client-side navigations in this tab. Null until the first read. */
let memoryLog: LogEntry[] | null = null;

function isEntry(value: unknown): value is LogEntry {
  if (!value || typeof value !== 'object') return false;
  const entry = value as LogEntry;
  if (entry.kind === 'clear') return true;
  if (entry.kind === 'cmd') return typeof entry.text === 'string' && typeof entry.ok === 'boolean';
  if (entry.kind === 'out') {
    return typeof entry.text === 'string' && (entry.tone === 'out' || entry.tone === 'accent' || entry.tone === 'error');
  }
  return false;
}

function log(): LogEntry[] {
  if (memoryLog) return memoryLog;
  try {
    const parsed = JSON.parse(sessionStorage.getItem(LOG_KEY) ?? '[]') as unknown;
    memoryLog = Array.isArray(parsed) ? parsed.filter(isEntry) : [];
  } catch {
    memoryLog = [];
  }
  return memoryLog;
}

function pushLog(entry: LogEntry) {
  const list = log();
  list.push(entry);
  if (list.length > 80) memoryLog = list.slice(-80);
  try {
    sessionStorage.setItem(LOG_KEY, JSON.stringify(memoryLog));
  } catch {
    /* private mode: the in-memory log still covers navigations in this tab */
  }
}

type Suggestion = { label: string; value: string };

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

  const suggest = terminal.querySelector<HTMLElement>('[data-terminal-suggest]');
  const history = readList(HISTORY_KEY);
  let cursor = history.length;
  let used = new Set(readList(USED_KEY));
  let restoring = false;
  let listOpen = false;
  let highlighted = 0;
  let currentSuggestions: Suggestion[] = [];

  const scroll = () => {
    body.scrollTop = body.scrollHeight;
  };

  /** What the strip and the empty-input list offer. Hidden commands stay out. */
  const offered = (command: Command) => (command.name === 'git' ? 'git log' : command.name);

  /** Accent while the text is a real command or a completable prefix, error otherwise. */
  const tokenState = (value: string): 'ok' | 'bad' | '' => {
    const text = value.trim();
    if (!text) return '';
    const [raw, ...rest] = text.split(/\s+/);
    const name = raw.toLowerCase();

    if (name === 'open') {
      if (!rest.length) return 'ok';
      const slug = rest[0].toLowerCase();
      return data.projects.some((project) => project.slug.toLowerCase().startsWith(slug)) ? 'ok' : 'bad';
    }
    if (name === 'git') {
      if (!rest.length) return 'ok';
      return 'log'.startsWith(rest[0].toLowerCase()) ? 'ok' : 'bad';
    }
    if (name === 'theme') {
      if (!rest.length) return 'ok';
      return ['light', 'dark'].some((option) => option.startsWith(rest[0].toLowerCase())) ? 'ok' : 'bad';
    }

    const matches = commands.filter((command) => command.name.startsWith(name));
    if (!matches.length) return 'bad';
    if (rest.length && !matches.some((command) => command.name === name)) return 'bad';
    return 'ok';
  };

  const suggestionsFor = (value: string): Suggestion[] => {
    const text = value.trim().toLowerCase();
    const visible = commands.filter((command) => !command.hidden);
    if (!text) return visible.map((command) => ({ label: offered(command), value: offered(command) }));
    if (text === 'open' || text.startsWith('open ')) {
      const partial = text.slice(4).trim();
      return data.projects
        .filter((project) => project.slug.toLowerCase().startsWith(partial))
        .map((project) => ({ label: project.slug, value: `open ${project.slug}` }));
    }
    if (text === 'git' || text.startsWith('git ')) {
      const partial = text.replace(/^git\s*/, '');
      return 'log'.startsWith(partial) ? [{ label: 'git log', value: 'git log' }] : [];
    }
    if (text === 'theme' || text.startsWith('theme ')) {
      const partial = text.replace(/^theme\s*/, '');
      return ['light', 'dark']
        .filter((option) => option.startsWith(partial))
        .map((option) => ({ label: `theme ${option}`, value: `theme ${option}` }));
    }
    return visible
      .filter((command) => offered(command).startsWith(text) || command.name.startsWith(text))
      .map((command) => ({ label: offered(command), value: offered(command) }));
  };

  const paintToken = () => {
    const state = tokenState(input.value);
    if (state) promptLine.dataset.token = state;
    else delete promptLine.dataset.token;
  };

  const closeList = () => {
    listOpen = false;
    if (suggest) suggest.hidden = true;
    input.removeAttribute('aria-activedescendant');
  };

  const paintSuggest = () => {
    if (!suggest) return;
    currentSuggestions = suggestionsFor(input.value);
    if (!listOpen || currentSuggestions.length === 0) {
      suggest.hidden = true;
      suggest.replaceChildren();
      input.removeAttribute('aria-activedescendant');
      return;
    }
    highlighted = Math.max(0, Math.min(highlighted, currentSuggestions.length - 1));
    suggest.hidden = false;
    suggest.replaceChildren(
      ...currentSuggestions.map((item, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.role = 'option';
        button.id = `terminal-opt-${index}`;
        button.textContent = item.label;
        button.setAttribute('aria-selected', String(index === highlighted));
        button.addEventListener('mousedown', (event) => {
          event.preventDefault();
          run(item.value);
          input.value = '';
          paintToken();
          closeList();
          input.focus({ preventScroll: true });
        });
        return button;
      }),
    );
    const selected = suggest.querySelector('[aria-selected="true"]');
    selected?.scrollIntoView({ block: 'nearest' });
    input.setAttribute('aria-activedescendant', `terminal-opt-${highlighted}`);
  };

  const line = (text: string, tone: 'out' | 'accent' | 'error' = 'out') => {
    const el = document.createElement('span');
    el.className = 'terminal-line';
    const inner = document.createElement('span');
    inner.className = tone === 'accent' ? 'text-warm' : tone === 'error' ? 'text-error' : 'text-fg-soft';
    inner.textContent = text;
    el.append(inner);
    code.insertBefore(el, promptLine);
    if (!restoring) pushLog({ kind: 'out', text, tone });
    scroll();
  };

  const echo = (cmd: string, ok = true) => {
    const el = document.createElement('span');
    el.className = 'terminal-line';
    const dollar = document.createElement('span');
    dollar.className = 'select-none text-accent';
    dollar.setAttribute('aria-hidden', 'true');
    dollar.textContent = '$ ';
    const text = document.createElement('span');
    text.className = ok ? 'text-accent' : 'text-error';
    text.textContent = cmd;
    el.append(dollar, text);
    code.insertBefore(el, promptLine);
    if (!restoring) pushLog({ kind: 'cmd', text: cmd, ok });
  };

  const ctx: Ctx = {
    data,
    print: line,
    clear: () => {
      for (const el of [...code.children]) if (el !== promptLine) el.remove();
      if (!restoring) pushLog({ kind: 'clear' });
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
    echo(text, tokenState(text) !== 'bad');
    if (!text) return;

    history.push(text);
    writeList(HISTORY_KEY, history);
    cursor = history.length;

    const [name, ...args] = text.split(/\s+/);
    const command = commands.find((entry) => entry.name === name.toLowerCase());
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

  // Replay commands typed earlier in this visit, after the intro lines.
  const saved = log();
  if (saved.length) {
    let start = 0;
    for (let index = 0; index < saved.length; index++) if (saved[index].kind === 'clear') start = index + 1;
    if (start > 0) {
      for (const el of [...code.querySelectorAll('[data-line]')]) el.remove();
    }
    restoring = true;
    for (const entry of saved.slice(start)) {
      if (entry.kind === 'cmd') echo(entry.text, entry.ok);
      else if (entry.kind === 'out') line(entry.text, entry.tone);
    }
    restoring = false;
  }

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const chosen = listOpen && currentSuggestions[highlighted] ? currentSuggestions[highlighted].value : input.value;
      run(chosen);
      input.value = '';
      paintToken();
      closeList();
    } else if (event.key === 'Tab') {
      event.preventDefault();
      if (listOpen && currentSuggestions[highlighted]) input.value = currentSuggestions[highlighted].value;
      paintToken();
      highlighted = 0;
      paintSuggest();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (listOpen && currentSuggestions.length) {
        highlighted =
          event.key === 'ArrowDown'
            ? Math.min(currentSuggestions.length - 1, highlighted + 1)
            : Math.max(0, highlighted - 1);
        paintSuggest();
        return;
      }
      if (event.key === 'ArrowUp') {
        if (cursor > 0) input.value = history[--cursor] ?? '';
      } else {
        cursor = Math.min(history.length, cursor + 1);
        input.value = history[cursor] ?? '';
      }
      paintToken();
    } else if (event.key === 'Escape') {
      closeList();
    } else if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      ctx.clear();
    }
  });

  input.addEventListener('input', () => {
    listOpen = true;
    highlighted = 0;
    paintToken();
    paintSuggest();
  });

  input.addEventListener('focus', () => {
    listOpen = true;
    highlighted = 0;
    paintSuggest();
  });

  input.addEventListener('blur', () => {
    window.setTimeout(() => {
      if (document.activeElement !== input) closeList();
    }, 80);
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
    input.value = '';
    paintToken();
    closeList();
    input.focus({ preventScroll: true });
  });

  if (chips) {
    chips.replaceChildren(
      ...commands
        .filter((command) => !command.hidden)
        .map((command) => {
          const label = offered(command);
          const button = document.createElement('button');
          button.type = 'button';
          button.dataset.terminalChip = label;
          button.className =
            'shrink-0 rounded border border-line bg-surface px-2 py-0.5 font-mono text-[0.65rem] text-muted transition-colors hover:border-accent hover:text-accent';
          button.textContent = label;
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
