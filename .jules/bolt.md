## 2024-03-24 - Scroll Event Re-renders
**Learning:** Updating React state inside a `scroll` event listener causes continuous re-renders and potential layout thrashing, which is especially noticeable in Next.js applications during scroll-bound animations.
**Action:** Use framer-motion's `useScroll` hook combined with a CSS transform and `origin-left` class (e.g., `<m.div className="origin-left" style={{ scaleX: scrollYProgress }} />`) to bypass the React render cycle and delegate animations directly to the compositor.
