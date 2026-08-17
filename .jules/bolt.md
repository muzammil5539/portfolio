## 2026-08-17 - Prevent Layout Thrashing in Next.js
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures.
**Action:** Precalculate coordinate distances mathematically during the render phase and pass them declaratively via inline CSS/custom variables, eliminating imperative DOM queries.
