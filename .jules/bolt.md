
## 2025-03-09 - Declarative SVG Animation over Imperative Layout Thrashing
**Learning:** Performing imperative DOM queries (like `querySelectorAll`) and calculating distances using `getAttribute("x1")` inside a `useEffect` hook causes severe layout thrashing and synchronous reflows, especially on complex SVG networks like neural diagrams. This is a common React anti-pattern when animating multiple elements.
**Action:** Always pre-calculate visual properties (like line lengths/distances) inside `useMemo` during the render phase and apply them directly and declaratively using inline styles instead of waiting for the DOM to mount and imperatively mutating style attributes.
