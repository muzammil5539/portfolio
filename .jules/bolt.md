## 2025-03-09 - Imperative SVG manipulations in React
**Learning:** Found an anti-pattern where SVG elements were imperatively queried using `querySelectorAll` inside a `useEffect` to calculate and apply line lengths for animation, bypassing React's declarative nature and causing forced synchronous layouts.
**Action:** Always pre-calculate visual properties like distances/lengths during the render phase using `useMemo` and apply them declaratively via inline styles and CSS variables for animations.
