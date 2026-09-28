## 2024-05-20 - [Avoid DOM Queries in Next.js useEffect]
**Learning:** Parsing visual lengths using DOM calls (.querySelectorAll, .getAttribute) within a useEffect triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures.
**Action:** Use useMemo to precalculate coordinate distances mathematically during the render phase and pass them declaratively to styles, eliminating imperative DOM queries.
