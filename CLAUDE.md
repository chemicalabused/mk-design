# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`mk-design` is the landing page for **M Design House**, an architecture, interiors and landscape studio in Nysa run by Petro Mikula. Single page, Polish only (EN may come later). The content plan and client decisions live in `design/structure.md`; source materials (gitignored, large) in `design/reference/`.

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
- `src/content/site.ts` holds **all copy and data** (brand, nav, hero, projects, services, process, studio, contact). Edit text there, not in components. Empty `brand.*` fields (address, NIP, company, instagram) are placeholders awaiting the client; components hide them when empty.
- `src/components/` one file per section: Nav, Hero, Projects (grid + filter + `<dialog>` lightbox), CaseStudy, Services, Process, Studio, Contact, Footer, plus `Picture`.
- `src/index.css` has the Tailwind `@theme` tokens (colors stone/plaster/graphite/ink/slate/brass, fonts) and the `heading-xl/lg/md`, `container-page`, `reveal` utilities.
- `public/images/` is **generated**: run `node scripts/images.mjs` to rebuild WebP images (and the knocked-out logo PNGs) from `design/reference/`. Edit the manifest in that script to add or swap images; do not hand-edit the output.
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
