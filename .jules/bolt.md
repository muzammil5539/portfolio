## 2025-03-01 - Avoid DOM queries for SVG length calculation
**Learning:** Using `querySelectorAll` and `getAttribute` inside `useEffect` to calculate SVG line lengths causes layout thrashing and prevents static rendering/SSR on Next.js.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables to animations.
