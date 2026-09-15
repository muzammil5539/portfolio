## 2026-09-15 - Layout thrashing in SVG animation
**Learning:** Parsing visual lengths using DOM calls like `querySelectorAll` and `getAttribute` inside a `useEffect` triggers layout thrashing and prevents static rendering/SSR on Next.js.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables or inline styles.
