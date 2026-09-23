## 2025-02-28 - Declarative SVG Path Animations
**Learning:** Using useEffect to query SVG elements via querySelectorAll and parse layout lengths with .getAttribute triggers layout thrashing, bypasses SSR benefits, and creates performance bottlenecks.
**Action:** Always precalculate geometric distances mathematically during the render phase within useMemo and pass them declaratively to SVG elements using CSS variables casted as CSSProperties.
