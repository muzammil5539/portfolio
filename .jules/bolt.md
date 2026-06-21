## 2025-06-21 - [DOM query in useEffect]
**Learning:** Using `querySelectorAll` and `getAttribute` to read DOM properties inside a `useEffect` triggers synchronous layout calculations (layout thrashing), which severely degrades mount performance and blocks static rendering/SSR.
**Action:** Always pre-calculate visual coordinates and lengths mathematically using `useMemo` during the render phase, and pass them down declaratively via inline CSS variables (`--path-length`) to drive `@keyframes` animations.
