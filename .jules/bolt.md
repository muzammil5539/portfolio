## 2025-03-05 - SVG DOM Manipulation in React
**Learning:** Performance-critical SVG components with many animated elements shouldn't rely on `useEffect` and `document.querySelectorAll()` for applying variable keyframes or syncing styling attributes. This defeats React's declarative nature and forces a relayout cycle after paint.
**Action:** Pre-calculate variables (like line length for `strokeDasharray`) in the render phase, memoize them, and apply them declaratively through inline styles/CSS variables directly to the SVG elements.
