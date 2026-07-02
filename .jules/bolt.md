## 2025-03-05 - Avoid DOM query layout thrashing in SVG animation
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and prevents static rendering/SSR in Next.js.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS properties to animations, eliminating imperative DOM queries.
