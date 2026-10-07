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

Next.js 15 (App Router) portfolio, statically exported (`next.config.ts`: `output: "export"`, `images.unoptimized: true`). It deploys to both Vercel and Azure Static Web Apps (`.github/workflows/azure-static-web-apps-*.yml`), so **any change must remain compatible with `next export`**: no server-only APIs, no Image Optimization, every dynamic route needs `generateStaticParams`.

**Layout of `src/`**
- `app/` routes: `/` (home), `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, plus generated `robots`, `sitemap`, `feed.xml`, `llms.txt`, `llms-full.txt`, and `opengraph-image` / `twitter-image` routes (site, project, post).
- `components/sections/` one isolated component per home-page section (Hero, Projects, Experience, Skills, LatestPosts, Credentials, Faq, Contact). `components/layout/` Header/Footer. `components/ui/` shared primitives (Reveal, Magnetic, CustomCursor, ThemeToggle, ThemePicker, SectionHeader, JsonLd). `components/projects/`, `components/blog/` feature components.
- `data/` all content, separate from layout: `projects.ts`, `experience.ts`, `skills.ts`, `education.ts`, `certificates.ts`, `site.ts` (identity, contact, FAQ copy used by SEO and llms.txt), `themes.ts` (palettes).
- `lib/` `mdx.ts` (blog loading, frontmatter schema), `mdx-plugins.ts` (Shiki, KaTeX, Mermaid), `seo.ts` (metadata + JSON-LD), `llms.ts`, `og.tsx`, `color.ts`.

**Editing content (no layout code touched)**
- New project: add one entry to `src/data/projects.ts` (slug = `id`, `size` sets the bento tile, `category` sets the colour), add its steps to `scripts/generate-workflows.mjs`, run `node scripts/generate-workflows.mjs`.
- New experience / skill / certificate: edit the matching file in `src/data/`.
- New blog post: add `content/blog/<slug>.mdx` with frontmatter `title`, `date` (ISO), `excerpt`, `tags`, optional `cover`, `draft`. Reading time is computed; drafts are hidden in production builds. The index, RSS, sitemap, OG image and JSON-LD all pick it up.

**Theming has two independent axes.** Mode (light/dark/system) is `next-themes` (class on `<html>`, no flash). Palette is `data-palette` on `<html>` (persisted in localStorage, shareable as `?theme=ember`, applied before paint by an inline script in `layout.tsx`). Palettes are defined once in `src/data/themes.ts` as a few seed colours; every other token (text-secondary/muted, accent-text, on-accent, panel, category colours, ring, shadow) is derived and contrast-checked. `layout.tsx` injects the generated CSS variables, and `themes.test.ts` fails if any palette x mode drops below WCAG AA. Style with the Tailwind tokens (`bg-background`, `text-foreground`, `text-text-secondary`, `text-accent-text`, `bg-accent-primary text-on-accent`, `bg-panel text-panel-fg`, `text-cat-ml`...). Never hard-code colours. `useTheme()` (client) returns `isDarkMode`, `toggleTheme`, `palette`, `setPalette`.

**Motion** uses Framer Motion springs, respects `prefers-reduced-motion`, and the custom cursor is disabled for touch and reduced motion. Components using hooks, browser APIs or Framer Motion must be client components (`"use client"`); keep content-only components server-rendered.

**Blog** posts are MDX in `content/blog/`, parsed by `src/lib/mdx.ts` (gray-matter) and rendered with `next-mdx-remote`, `remark-gfm`/`remark-math`, `rehype-pretty-code` (Shiki) and `rehype-katex`; ```mermaid fences become live diagrams.

**SEO / LLM SEO**: per-page metadata via `pageMetadata()`, JSON-LD via `<JsonLd>` (Person, WebSite, BreadcrumbList, BlogPosting, FAQPage), AI crawlers allowed in `robots.ts`, `llms.txt` and `llms-full.txt` generated from the data files.

**Utilities**: `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge). **Contact form** uses `@formspree/react`. **Assets** are served from `/public` by literal path; preserve names with spaces and mixed case exactly (e.g. `public/Resume - Muzammil Nawaz Khan CV.pdf`). **Path alias** `@/*` -> `src/*` (vitest has no alias config, so modules under test import relatively).

## Notes

- The `.agents/AGENTS.md` file contains repo-specific ponytail guidance — read it too.
- `README.md` describes Next.js 13; the actual version is Next.js 15 per `package.json` — trust the source config, not the README, on stack/version claims.
