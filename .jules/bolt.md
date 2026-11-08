
## 2024-05-15 - React Component Scroll Listeners
**Learning:** Updating React state inside scroll event listeners triggers constant re-renders and potential layout thrashing.
**Action:** When implementing scroll-bound animations, use `framer-motion`'s `useScroll` hook combined with a CSS transform (like `scaleX`) and an origin class (like `origin-left`) to bypass the React render cycle and delegate animations directly to the compositor.
