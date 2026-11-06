## 2024-11-06 - React scroll state
**Learning:** Updating component state within a `scroll` event listener triggers constant React re-renders and potential layout thrashing.
**Action:** Use `framer-motion`'s `useScroll` hook combined with a CSS transform (`scaleX`) and an origin class (`origin-left`) on a `<m.div>` to bypass the React render cycle and delegate animations directly to the compositor.
