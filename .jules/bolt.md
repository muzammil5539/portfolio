## 2026-08-14 - Declarative SVG Lengths
**Learning:** Parsing visual lengths using DOM calls (.querySelectorAll) within a useEffect triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures.
**Action:** Use useMemo to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables/inline styles to animations, eliminating imperative DOM queries.
