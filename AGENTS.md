## Look

The site should feel like a person and a place, not a product landing page. The lakeside portrait in `src/assets/portrait.jpg` is the atmosphere: warm fog, sand, weathered wood, and a dull water teal. Dark mode is night water, not a black dashboard with neon mint.

- Headings and the `.kicker` label use Newsreader. Body and UI stay Inter. JetBrains Mono stays inside the terminal.
- Color tokens live in `src/styles/global.css`. Change the palette there.
- Prefer type, rules, and the photograph over bordered cards, icon tiles, stat chips, and mono uppercase kickers.
- On a phone, the portrait is a full-width banner with a fade only along the bottom edge. From the desktop breakpoint up it is a soft circle: the face is centered and zoomed in slightly, and the middle stays translucent with a short fade at the rim. The page background is a color gradient, not a blurred copy of the photo. Serve the portrait through `astro:assets`, not as a raw file in `public/`.
- On a phone, hero actions must stay clear of the terminal button and the explorer pill.

## Terminal

The terminal is not part of the homepage. `src/components/TerminalPanel.astro` is mounted from the layout: a button on the right edge opens a full-screen dialog. The explorer control is an icon in that same bar, the same height as the terminal button. The typing replay starts the first time it opens. `git log` prints inside the terminal. Suggestions sit under the prompt.

Do not put `data-terminal-open` on `<html>`. That attribute is the button. The open state is `data-terminal-active`. Copy that mentions the terminal (the browsing persona and the terminal quest hint) should point at the side button.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
