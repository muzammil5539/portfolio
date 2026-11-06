## 2024-11-06 - Replacing React State Scroll Listeners with Composited Animations
**Learning:** Using `useState` and `useEffect` with `window.addEventListener("scroll")` triggers continuous React re-renders and potential layout thrashing, negatively impacting scroll performance.
**Action:** Use `framer-motion`'s `useScroll` hook combined with a CSS transform (`scaleX`) and an origin class (`origin-left`) on an `<m.div>`. This bypasses the React render cycle entirely and delegates the animation to the compositor, ensuring 60fps smooth scrolling.
