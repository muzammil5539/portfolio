## 2025-02-12 - Prevent Layout Thrashing in Next.js
**Learning:** Parsing visual lengths using DOM calls (.querySelectorAll, .getAttribute) within a useEffect triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures.
**Action:** Precalculate coordinate distances mathematically during the render phase (via useMemo) and pass them declaratively via CSS variables to animations, eliminating imperative DOM queries.
