## 2024-05-18 - [Optimizing Scroll-Bound Animations]
**Learning:** Using React state (e.g. `useState` inside a scroll event listener) for scroll-bound animations causes constant React re-renders and layout thrashing, significantly impacting performance.
**Action:** Use `framer-motion`'s `useScroll` hook coupled with CSS transforms (like `scaleX`) on `m.div` to bypass the React render cycle and delegate animations directly to the compositor.
