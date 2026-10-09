## 2025-03-08 - Avoid Scroll-Bound State Updates
**Learning:** Updating component state inside a scroll event listener triggers constant React re-renders and potential layout thrashing.
**Action:** Use framer-motion's useScroll hook combined with a CSS transform (e.g., <m.div style={{ scaleX: scrollYProgress }} />) to bypass the React render cycle and delegate animations directly to the compositor.
