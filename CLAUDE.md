# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`mk-design` is the landing page for **M Design House**, an architecture, interiors and landscape studio in Nysa run by Petro Mikula. Single page in Polish, with English and Ukrainian translations (`src/lib/i18n.tsx`, machine-translated, not yet proofread). The content plan and client decisions live in `design/structure.md`; source materials (gitignored, large) in `design/reference/`.

## Stack (decided 2026-09-22)

- **Vite + React** (TypeScript). Not Next.js; there is no server or App Router.
- **Tailwind CSS v4** via `@tailwindcss/vite`. No `tailwind.config.js`; theme customization goes in `src/index.css` using `@theme`.
- **Linting** with oxlint (config in `.oxlintrc.json`). No test runner yet.
- **Browser checks** with `@playwright/cli` (devDependency). Not a test framework; the agent drives a real browser to inspect pages. See "Checking the page in a browser" below.

## Commands

```
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build && prerender  -> dist/
npm run lint      # oxlint
npm run preview   # serve the production build
```

## Checking the page in a browser

Use playwright-cli (skill `playwright-cli` in `.claude/skills/`) rather than guessing how the page renders.

```
npm run dev -- --port 5173 &          # start Vite in the background
npx playwright-cli open http://localhost:5173
npx playwright-cli snapshot            # accessibility tree with element refs
npx playwright-cli screenshot          # PNG, read it with the Read tool
npx playwright-cli resize 390 844      # mobile viewport, then screenshot again
npx playwright-cli close
```

Headless is the default; pass `--headed` to watch it. Session files land in `.playwright-cli/` (gitignored). Chromium lives in the user cache, not the repo.

## Hosting

- Vercel, project `mk-design`, production URL https://mk-design-snowy.vercel.app. GitHub repo `chemicalabused/mk-design` is connected: every push to `main` deploys to production automatically.
- Manual deploy: `npx vercel --prod` (needs `npx vercel login` once per machine). `.vercelignore` keeps `design/reference` (1.2 GB) out of uploads; `.vercel/` is gitignored.
- `vercel.json` sets caching: `/assets/*` (hashed build output) is immutable for a year; `/fonts`, `/images`, `/videos` keep their file names, so they cache for 1 day (then up to a week served stale while revalidating in the background); a regenerated file reaches returning visitors within about a day.

## Layout

- `index.html` is the entry (`lang="pl"`; preloads the two above-the-fold fonts); `src/main.tsx` hydrates `src/App.tsx`, or renders it from scratch on the dev server.
- **Fonts are self-hosted** in `public/fonts/`, declared in `src/fonts.css`: Manrope (body), Newsreader (headings), Source Serif 4 (hero heading, and the Cyrillic stand-in for Newsreader, which has none). They are **generated** by `python3 scripts/fonts.py` (needs `fonttools` and `brotli`) from the variable TTFs in `design/reference/fonts/`: limited to the weights in use and split into a `latin` (PL/EN) and a `cyrillic` (UK) file, matched by `unicode-range`. Adding a character outside those sets means updating the script and the ranges in fonts.css. The body's `ss01`/`cv11` are Manrope-only; serif text resets them (in Source Serif 4, ss01 gives Bulgarian letterforms).
- **Prerendering:** `npm run build` ends with `scripts/prerender.mjs`, which builds `src/entry-server.tsx` for Node, writes the rendered Polish page into `dist/index.html` (including `<title>` and the meta description, from the `meta.*` i18n keys) and inlines the stylesheet there (no render-blocking CSS request). Render code must therefore run without `window`/`document` (use effects), and the first client render must match the HTML: the language starts as `pl` and the saved choice is applied after hydration. The hero entrance pose is set in CSS under `.js` (class added by an inline script in `index.html`, 6 s failsafe) and `Hero.tsx` animates with `fromTo`, never `from`.
- **Copy lives in `src/lib/i18n.tsx`**: headings, intros, labels and form messages, as `messages.pl/en/uk` (keep the three key sets identical), plus EN/UK project text in `projectCopy`. EN/UK alt text for gallery images is in `src/lib/image-alts.ts`, keyed by the Polish alt from site.ts, so changing a Polish alt needs the matching entry updated there too. Components read it with `useLanguage().t(key)` / `localizeProject`; `translate(lang, key)` gives a fixed language (the studio email is Polish). In dev, `t` warns about keys missing from Polish. `translate`/`t` and `localizeProject` run text through `typeset()`, which ties one-letter words (PL: a i o u w z; UK: а в з і й о у) to the next word with a no-break space; write copy with normal spaces.
- **Data lives in `src/content/site.ts`**: brand and contact details, links, media, the Polish project entries, and the ids/keys that sections render from (`nav[].key`, `categories[].key`, `services`, `process`, `studio`, `scopes`). Adding an entry there means adding its strings in all three languages. Empty `brand.*` fields (address, NIP, company, instagram, formKey) are placeholders awaiting the client; components hide them or fall back when empty.
- `src/components/` one file per section: Nav (with `LanguageMenu`), Hero (looping video over a poster), Projects (grid with video covers + filter + `<dialog>` gallery that locks page scroll; tiles open `ImageViewer`, a swipe/arrow/keyboard carousel over the project's images), CaseStudy, Services, Process, Studio, Contact, Footer, plus `Picture`.
- Photos, videos and gallery tiles share one corner radius, the `--radius-media` token (`rounded-media`). Buttons are pills.
- `src/index.css` has the Tailwind `@theme` tokens (colors stone/plaster/graphite/ink/slate/brass, fonts) and the `heading-xl/lg/md`, `container-page`, `reveal` utilities.
- `public/images/` is mostly **finished files committed as-is**: the project galleries (`public/images/projects/`), the hero poster, the Skrzypiec stage photos and `mdh-logo-*.png` (resized to 720 px, 2x the footer size) came from the designer's v52 and their sources are not in `design/reference/` (see `design/zmiany-v52.md`). `node scripts/images.mjs` **generates** only what it lists from `design/reference/`: `projects/dom-stalis-180-plan.webp`, the `logo-mark.png` favicon and `og-image.jpg`; do not hand-edit those. To add an image with a source in `design/reference/`, add it to that manifest.
- `public/images/sizes/` and `src/content/image-widths.json` are **generated**: run `node scripts/responsive.mjs` after adding or swapping gallery images (it covers `public/images/projects/` plus the hero poster and case-study photos listed in the script). It writes 480/800/1200 px WebP variants (quality 70) and the widths manifest; `Picture` turns that into `srcset`, so pass it a `sizes` hint for where the image renders. `imageAt(src, minWidth)` in `src/lib/images.ts` picks a variant for places without srcset, such as video posters.
- `public/llms.txt` describes the studio and site sections for AI agents (Lighthouse "Agentic Browsing"); keep it in step with the services and contact details.
- `public/videos/` is **generated**: run `node scripts/videos.mjs` (needs ffmpeg) to re-encode every `.mp4` in `design/reference/videos/` to web size (H.264 CRF 27, 30 fps, max 1280 px, faststart).
- Motion: GSAP + ScrollTrigger via `@gsap/react`. `src/lib/motion.ts` registers the plugin and defaults; `src/components/Motion.tsx` wraps the app and drives two opt-in attributes: `data-reveal` (fade/rise once on enter, batched) and `data-parallax` (slight drift, needs an `overflow-hidden` parent and `scale-[1.14]` on the image). Hero has its own load timeline; Nav hides on scroll down. All motion is inside `gsap.matchMedia` and skipped under `prefers-reduced-motion`. Use the `gsap-core` / `gsap-scrolltrigger` skills when touching this.
- Contact form posts to Web3Forms (`api.web3forms.com/submit`) with the access key in `brand.formKey` (`src/content/site.ts`; public by design). While the key is empty it falls back to opening a prefilled `mailto:` link. Validation is custom (`noValidate`), messages are i18n keys; the email field names are Polish because they land in the studio's inbox. A hidden `botcheck` checkbox is the honeypot.

## Guidance

- Before adding a test runner or any further framework, ask the user, then update this file with the resulting commands and architecture notes.
- Landing-page work should lean on the installed skills below: React best practices for component code, web design guidelines and accessibility for review, better-typography and the animation skills for polish.

## Skills

- Project skills live in `.claude/skills/<name>/SKILL.md`. Do not use a `.agents/` directory; Claude Code does not scan it.
- Skills from skills.sh are installed with the Claude Code target so they land in the right place:
  `npx skills add <repo> --skill <name> -a claude-code`
- `skills-lock.json` at the repo root is maintained by skills.sh and tracks installed skill sources.
- The `frontend-design` plugin (Anthropic marketplace) is enabled in `.claude/settings.json` and applies automatically to UI work.
- Installed project skills (see `skills-lock.json`): `vercel-react-best-practices`, `vercel-react-view-transitions`, `web-design-guidelines`, `accessibility`, `better-typography`, `animation-vocabulary`, `improve-animations`, `tailwind-css-patterns`, `gsap-core`, `gsap-scrolltrigger`, `redesign-existing-projects`, `audit-ai-design-slop`, `no-ai-design-slop`, `playwright-cli`, `find-skills`.
