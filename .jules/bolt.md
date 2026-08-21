## 2024-08-21 - Layout Thrashing in SVG Animations
**Learning:** Parsing visual lengths using DOM calls like .querySelectorAll and .getAttribute within a useEffect triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures.
**Action:** Use useMemo to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables or style props to animations, eliminating imperative DOM queries.
