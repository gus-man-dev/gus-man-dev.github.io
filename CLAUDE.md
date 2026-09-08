# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal CV/resume single-page site (Roman Gusevski) built with React. The visual language — colors, fonts, section layout — is an established design decision; see the "Design fidelity" note below before changing any of it.

## Commands

```bash
npm run dev      # start Vite dev server
npm run build    # tsc -b && vite build — typecheck, then production build
npm run lint     # oxlint
npm run preview  # preview a production build locally
```

There is no test suite / test runner configured in this repo.

## Architecture

**Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4 (`@tailwindcss/vite` plugin, not the PostCSS setup) + `react-i18next`.

**Section composition & feature flags** (`src/config/sections.ts`): every page section is a component under `src/components/sections/`, but whether it actually renders is gated by a boolean in `sectionFlags`. `App.tsx` conditionally renders sections from this object, and `Header.tsx` filters its nav links the same way — a section can exist in code (kept for later) without appearing on the live page. Check/update this file when adding or hiding a section, rather than commenting components out.

**Controls vs. sections**: `src/components/controls/` holds base, reusable UI primitives (`Button`, `ButtonLink` — share visual variants via `buttonStyles.ts` so the two stay in sync —, `LanguageSwitcher`, `ThemeToggle`, `Logo`, `icons.tsx`). `src/components/sections/` holds page-level sections composed from those controls plus content. New page-level UI should be built as a control if it's reused across sections, or a section if it's a one-off block of the page.

**Content lives in i18n, not a data file**: `src/data/` exists but is currently empty. All page copy — including structured content like the work-experience timeline — lives in `src/i18n/locales/en.json` / `ru.json` under matching keys, and is pulled into components with `useTranslation()`. Array/object content (e.g. `experience.items`, `skills.categories`) is read with `t('key', { returnObjects: true })` and cast to a local TS interface in the component — see `Experience.tsx` / `Skills.tsx` for the pattern. When adding new copy, add the key to **both** locale files.

**i18n setup** (`src/i18n/index.ts`): resources are the two JSON files imported directly (no lazy-loading/backend). Initial language is read from `localStorage`, falling back to browser language, falling back to `en`; changes are persisted back to `localStorage` on `languageChanged`.

**Theme** (`src/theme/ThemeContext.tsx`): a plain context/provider toggles a `.dark` class on `<html>` and persists the choice to `localStorage` (initial value falls back to `prefers-color-scheme`). Tailwind v4's dark variant is repointed from `prefers-color-scheme` to that class via `@custom-variant dark (&:where(.dark, .dark *));` in `src/index.css` — this is what makes the manual toggle override the OS setting.

**Design fidelity**: `src/index.css` defines custom Tailwind theme tokens via `@theme` — `--color-accent` (`#0bceaf`), `--color-dark-bg` (`#100e17`), `--font-sans` (Roboto, loaded via Google Fonts `<link>` in `index.html`). These are the site's fixed brand values — don't swap them casually. `Hero.tsx`, `Experience.tsx` and `CtaBanner.tsx` render on photo backgrounds with theme-following overlays; other sections follow the light/dark theme via `dark:` classes.

**Header behavior**: sticky, transparent over the Hero photo, switching to a solid `bg-dark-bg` bar once scrolled (via the `useScrolled` hook in `src/hooks/useScrolled.ts`) — not two different components, one `Header.tsx` with conditional classes.

**Skills**: agent skills are installed under `.agents/skills/` (source of truth) with `.claude/skills/` symlinked into it, tracked in `skills-lock.json`. Installed: `clean-code` (sickn33/agentic-awesome-skills), `vercel-react-best-practices` (vercel-labs/agent-skills), `frontend-design` (anthropics/skills).
