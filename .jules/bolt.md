## 2026-09-02 - Precalculating DOM Layout Details
**Learning:** Parsing visual lengths using DOM calls (.querySelectorAll, .getAttribute) within a useEffect triggers layout thrashing and prevents static rendering/SSR on Next.js, which can cause build or runtime failures.
**Action:** Use useMemo to precalculate coordinate distances mathematically during the render phase and pass them declaratively to avoid imperative DOM queries.
