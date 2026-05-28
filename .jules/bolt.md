
## 2026-05-28 - Optimize performance-critical SVG rendering by replacing DOM queries with pre-calculated hooks
**Learning:** For interactive/animated SVG components, imperative DOM manipulation via `useEffect` (like querying lengths and directly setting styles) causes unnecessary reflows and synchronization issues with React's render cycle.
**Action:** When calculating properties like `stroke-dashoffset` for paths/lines, calculate lengths mathematically during the render phase. Pre-calculate values within `useMemo` hooks, apply them directly via declarative inline styles, and use custom CSS properties (e.g., `--line-length`) to synchronize dynamic lengths with shared CSS keyframes. This bypasses the DOM entirely, ensuring 60fps animations.
