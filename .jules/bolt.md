## 2026-10-02 - Precalculating SVG lengths mathematically
**Learning:** Parsing visual lengths using DOM calls like `querySelectorAll` and `getAttribute` inside `useEffect` triggers layout thrashing, blocking the main thread and preventing static rendering.
**Action:** Precalculate coordinate distances mathematically during the render phase in `useMemo` and pass declaratively via CSS.
