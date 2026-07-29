## 2026-07-29 - Prevent Layout Thrashing in Next.js
**Learning:** Parsing visual lengths using DOM calls (.querySelectorAll) triggers layout thrashing and prevents static rendering/SSR on Next.js.
**Action:** Use useMemo to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables to animations, eliminating imperative DOM queries.
