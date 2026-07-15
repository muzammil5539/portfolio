## 2026-07-15 - Prevent Layout Thrashing in SVG Animations
**Learning:** Parsing visual lengths using DOM calls like .getAttribute inside useEffect triggers layout thrashing and prevents static rendering/SSR on Next.js.
**Action:** Use useMemo to precalculate distances mathematically during render phase and pass them declaratively.
