## 2023-10-21 - [Optimize ReadingProgress scroll handler]
**Learning:** In React applications, attaching a scroll listener that triggers state updates (like `setProgress`) on every scroll event causes severe layout thrashing and forces continuous re-renders of the component tree, degrading performance.
**Action:** Use `framer-motion`'s `useScroll` combined with `<m.div>` and `style={{ scaleX: scrollYProgress }}` to bypass React state entirely and offload the animation to the compositor.
