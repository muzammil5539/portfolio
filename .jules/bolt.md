
## 2026-09-08 - Prevent Layout Thrashing in SVG Calculations
**Learning:** Parsing visual lengths using DOM calls like .querySelectorAll within a useEffect triggers layout thrashing and prevents static rendering/SSR on Next.js.
**Action:** Use useMemo to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables to animations, eliminating imperative DOM queries.
