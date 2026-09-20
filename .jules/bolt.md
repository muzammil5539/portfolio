## 2026-09-20 - Avoiding Imperative DOM Queries for SVG Lengths
**Learning:** Parsing visual lengths using DOM calls like `querySelectorAll` and `getAttribute` inside `useEffect` triggers layout thrashing and breaks static rendering/SSR in Next.js. It forces double-renders and degrades TTI.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables to animations, eliminating imperative DOM queries.
