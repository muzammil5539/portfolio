## 2026-08-13 - Prevent layout thrashing from DOM length queries in useEffect
**Learning:** Parsing visual lengths using DOM calls like .querySelectorAll and .getAttribute within useEffect triggers layout thrashing and prevents static rendering/SSR in Next.js, causing performance bottlenecks and potential build failures.
**Action:** Use useMemo to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables to animations, eliminating imperative DOM queries.
