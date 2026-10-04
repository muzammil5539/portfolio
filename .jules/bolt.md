## 2025-02-23 - [Avoid DOM queries in Next.js useEffect for SVG calculations]
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via inline styles or CSS variables to animations, eliminating imperative DOM queries.
