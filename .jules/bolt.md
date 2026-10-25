## 2025-10-25 - Scroll-Bound Animations

**Learning:** When implementing scroll-bound animations (like progress bars) in React components, avoid updating component state within a `scroll` event listener, as it triggers constant React re-renders and potential layout thrashing.
**Action:** Instead, use `framer-motion`'s `useScroll` hook combined with a CSS transform and origin class (e.g., `<m.div className="origin-left" style={{ scaleX: scrollYProgress }} />`) to bypass the React render cycle and delegate animations directly to the compositor.
