## 2026-07-28 - Prevent Layout Thrashing in SSR SVGs
**Learning:** Parsing visual lengths using DOM calls (.getAttribute) inside useEffect triggers layout thrashing and prevents static rendering/SSR in Next.js.
**Action:** Precalculate coordinate distances mathematically during render and pass them declaratively via inline styles, eliminating imperative DOM queries.
