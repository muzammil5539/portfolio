# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Next.js dev server
npm run build         # Production build — also validates the static export (must pass before shipping any route/MDX/asset change)
npm run start          # Serve the production build
npm run lint            # next lint
npm run lint:strict       # ESLint, zero warnings allowed (`eslint . --ext .ts,.tsx --max-warnings 0`)
npm run test              # Vitest run (all tests)
npx vitest run src/data/certificates.test.ts   # single test file
npx vitest                                       # watch mode
```

There is no vitest config file; it runs on Vitest defaults directly against `.test.ts` files (see `src/data/certificates.test.ts` for the pattern — plain data-integrity assertions, no DOM/component testing setup exists yet).

## Architecture

This is a single-page Next.js 15 (App Router) portfolio, statically exported (`next.config.ts`: `output: "export"`, `images.unoptimized: true`). It deploys to both Vercel and Azure Static Web Apps (`.github/workflows/azure-static-web-apps-*.yml`), so **any change must remain compatible with `next export`** — no server-only APIs, no Image Optimization, no dynamic route handlers.

**Home page** (`src/app/page.tsx`) is a straight-line composition of section components rendered in order: `Header → Hero → Projects → Experience → Skills → Certifications → Contact → Footer`. There's no routing between sections — it's one scrolling page with anchor-style navigation. New sections get added here and to `Header.tsx`'s nav links together.

**Content model**: structured portfolio content (projects, certificates) lives as typed arrays in `src/data/*.ts` (e.g. `src/data/projects.ts`, `src/data/certificates.ts`), imported directly by the section components (`Projects.tsx`, `Certifications.tsx`). This is the pattern to follow for any new listing-style content — don't hardcode arrays inside components.

**Blog is separate from the data model**: posts are MDX/MD files in `content/blog/*.mdx`, parsed by `src/lib/mdx.ts` using `gray-matter` for frontmatter (`title`, `excerpt`, `date`, `readTime`, `tags`) and raw body content. `src/app/blog/page.tsx` lists posts via `getBlogPosts()`; `src/app/blog/[slug]/page.tsx` renders one via `getBlogPost()` + `generateStaticParams` (required for static export — every slug must be enumerable at build time). MDX rendering goes through `next-mdx-remote` and `src/components/MDXComponents.tsx`/`src/components/mdx/`, with `remark-math`/`rehype-katex` for math and `Mermaid.tsx` for diagrams.

**Theming**: `src/context/ThemeContext.tsx` is a client-only context (`ThemeProvider` wraps everything in `layout.tsx`) that toggles a `dark` class on `<html>` and persists the choice to `localStorage`. Colors are CSS variables defined in `globals.css` and mapped to Tailwind tokens in `tailwind.config.js` (`background`, `foreground`, `surface`, `accent-*`, etc., plus a set of legacy `ai-*`/`neon-*` aliases kept for backward compatibility) — style with those tokens rather than raw hex values, and extend `globals.css`/`tailwind.config.js` together if a new token is needed. Any component reading `useTheme()`, using browser APIs, or handling form state must stay a client component (`"use client"`); components that only read static data/content should stay server components.

**Utilities**: `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use it for conditional/merged className logic instead of manual string concatenation.

**Contact form** uses `@formspree/react` (`Contact.tsx`) — no custom backend.

**Assets**: served from `/public` and referenced by literal path (`/projects/...`, `/certificates/...`). Filenames include spaces and mixed case (e.g. `public/Resume - Muzammil Nawaz Khan CV.pdf`) — preserve them exactly, since a rename breaks any hardcoded reference in `src/data/*` or metadata.

**Path alias**: `@/*` → `src/*` (`tsconfig.json`).

## Notes

- The `.agents/AGENTS.md` file contains repo-specific ponytail guidance — read it too.
- `README.md` describes Next.js 13; the actual version is Next.js 15 per `package.json` — trust the source config, not the README, on stack/version claims.
