## 2024-05-24 - React Scroll Animations Bottleneck
**Learning:** Using React state (e.g. `useState`) bound to window `scroll` events causes constant re-renders and potential layout thrashing, which is a significant performance bottleneck.
**Action:** Always use `framer-motion`'s `useScroll` with a mapped CSS transform (like `scaleX`) to bypass the React render cycle and delegate animations directly to the compositor.
