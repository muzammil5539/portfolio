## 2026-08-06 - Refactor imperative DOM parsing to declarative calculation in Next.js
**Learning:** Parsing visual lengths using DOM calls (.querySelectorAll, .getAttribute) within a useEffect triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures.
**Action:** Precalculate coordinate distances mathematically during the render phase and pass them declaratively via style props to animations, eliminating imperative DOM queries.
