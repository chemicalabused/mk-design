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
npm run build     # tsc -b && vite build  -> dist/
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

## Layout

- `index.html` is the entry (`lang="pl"`, Google Fonts: Newsreader display + Manrope body); `src/main.tsx` mounts `src/App.tsx`.
- `src/content/site.ts` holds **all copy and data** (brand, nav, hero, projects, services, process, studio, contact) in Polish. Edit text there, not in components. Components read UI strings through `useLanguage().t(key)` and projects through `localizeProject`; the EN/UK strings and project translations live in `src/lib/i18n.tsx`, so a copy change there needs all three languages. Empty `brand.*` fields (address, NIP, company, instagram) are placeholders awaiting the client; components hide them when empty.
- `src/components/` one file per section: Nav (with `LanguageMenu`), Hero (looping video over a poster), Projects (grid with video covers + filter + `<dialog>` gallery that locks page scroll), CaseStudy, Services, Process, Studio, Contact, Footer, plus `Picture`.
- Photos, videos and gallery tiles share one corner radius, the `--radius-media` token (`rounded-media`). Buttons are pills.
- `src/index.css` has the Tailwind `@theme` tokens (colors stone/plaster/graphite/ink/slate/brass, fonts) and the `heading-xl/lg/md`, `container-page`, `reveal` utilities.
- `public/images/` is **generated**: run `node scripts/images.mjs` to rebuild WebP images (and the knocked-out logo PNGs) from `design/reference/`. Edit the manifest in that script to add or swap images; do not hand-edit the output. Exception: the project galleries (`public/images/projects/`), the hero poster, the Skrzypiec stage photos and `mdh-logo-*.png` came finished from the designer's v52 and are committed as-is (their sources are not in `design/reference/`; see `design/zmiany-v52.md`).
- `public/images/sizes/` and `src/content/image-widths.json` are **generated**: run `node scripts/responsive.mjs` after adding or swapping gallery images (it covers `public/images/projects/` plus the hero poster and case-study photos listed in the script). It writes 480/800/1200 px WebP variants and the widths manifest; `Picture` turns that into `srcset`, so pass it a `sizes` hint for where the image renders. `imageAt(src, minWidth)` in `src/lib/images.ts` picks a variant for places without srcset, such as video posters.
- `public/videos/` is **generated**: run `node scripts/videos.mjs` (needs ffmpeg) to re-encode every `.mp4` in `design/reference/videos/` to web size (H.264 CRF 27, 30 fps, max 1280 px, faststart).
- Motion: GSAP + ScrollTrigger via `@gsap/react`. `src/lib/motion.ts` registers the plugin and defaults; `src/components/Motion.tsx` wraps the app and drives two opt-in attributes: `data-reveal` (fade/rise once on enter, batched) and `data-parallax` (slight drift, needs an `overflow-hidden` parent and `scale-[1.14]` on the image). Hero has its own load timeline; Nav hides on scroll down. All motion is inside `gsap.matchMedia` and skipped under `prefers-reduced-motion`. Use the `gsap-core` / `gsap-scrolltrigger` skills when touching this.
- Contact form has no backend yet: it opens a prefilled `mailto:` link. Replace with a form service before launch.

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
