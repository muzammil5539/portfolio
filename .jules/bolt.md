## 2024-05-24 - Precalculate Lengths Mathematically
**Learning:** Parsing visual lengths using DOM calls (.querySelectorAll, .getAttribute) within a useEffect triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures.
**Action:** Use mathematical calculation to precalculate coordinate distances during the render phase and pass them declaratively via CSS variables to animations, eliminating imperative DOM queries.
