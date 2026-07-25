## 2025-03-01 - Eliminate layout thrashing in SVG animations
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures. This is especially true for SVG animations relying on `strokeDasharray`.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables or inline styles to animations, eliminating imperative DOM queries.
