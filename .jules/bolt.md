## 2025-02-27 - [Scroll-bound State Updates]
**Learning:** Updating React state within a scroll event listener (like progress bars) triggers constant re-renders and potential layout thrashing, causing main thread blocking.
**Action:** Use framer-motion's `useScroll` with a CSS transform (`scaleX`) via `<m.div>` to bypass the React render cycle and delegate animations directly to the compositor.
