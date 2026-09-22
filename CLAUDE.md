# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`mk-design` is a landing page / portfolio site for a designer. Scaffolded 2026-09-22 with Vite (react-ts template); nothing is committed yet.

## Stack (decided 2026-09-22)

- **Vite + React** (TypeScript). Not Next.js; there is no server or App Router.
- **Tailwind CSS v4** via `@tailwindcss/vite`. No `tailwind.config.js`; theme customization goes in `src/index.css` using `@theme`.
- **Linting** with oxlint (config in `.oxlintrc.json`). No test runner yet.

## Commands

```
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build  -> dist/
npm run lint      # oxlint
npm run preview   # serve the production build
```

## Layout

- `index.html` is the entry (`lang="pl"`); `src/main.tsx` mounts `src/App.tsx`.
- `src/index.css` imports Tailwind and holds design tokens.
- Static files go in `public/`.

## Guidance

- Before adding a test runner or any further framework, ask the user, then update this file with the resulting commands and architecture notes.
- Landing-page work should lean on the installed skills below: React best practices for component code, web design guidelines and accessibility for review, better-typography and the animation skills for polish.

## Skills

- Project skills live in `.claude/skills/<name>/SKILL.md`. Do not use a `.agents/` directory; Claude Code does not scan it.
- Skills from skills.sh are installed with the Claude Code target so they land in the right place:
  `npx skills add <repo> --skill <name> -a claude-code`
- `skills-lock.json` at the repo root is maintained by skills.sh and tracks installed skill sources.
- The `frontend-design` plugin (Anthropic marketplace) is enabled in `.claude/settings.json` and applies automatically to UI work.
- Installed project skills (see `skills-lock.json`): `vercel-react-best-practices`, `vercel-react-view-transitions`, `web-design-guidelines`, `accessibility`, `better-typography`, `animation-vocabulary`, `improve-animations`, `tailwind-css-patterns`, `find-skills`.
