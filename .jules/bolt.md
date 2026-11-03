## 2025-02-23 - Avoid scroll-bound React state updates
**Learning:** Updating component state within a `scroll` event listener in `src/components/blog/ReadingProgress.tsx` causes continuous main-thread React re-renders and degrades performance.
**Action:** Use `framer-motion`'s `useScroll` hook combined with a CSS transform (e.g., `scaleX`) on an `<m.div>` to bypass the React render cycle and delegate scroll-bound animations directly to the compositor.
