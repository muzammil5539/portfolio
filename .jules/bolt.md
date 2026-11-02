
## 2025-03-08 - Delegating Scroll Animations to the Compositor
**Learning:** Attaching standard React `useState` hooks directly to `window` scroll event listeners to drive continuous animations (like progress bars) is a significant anti-pattern that triggers full component re-renders and potential layout thrashing on every pixel scrolled.
**Action:** Use CSS transforms (e.g., `scaleX`, `translateX`) bound to specialized scroll tracking primitives like `framer-motion`'s `useScroll` hook. This approach bypasses the React reconciliation cycle entirely and offloads the animation to the browser's compositor thread, resulting in a buttery-smooth 60fps experience without burning CPU cycles on re-renders.
