## 2024-05-15 - [React Scroll Animations]
**Learning:** Implementing scroll-bound animations by updating React state on scroll events causes constant re-renders and potential layout thrashing.
**Action:** Use framer-motion's useScroll combined with a CSS transform (scaleX) to bypass the React render cycle and delegate animations directly to the compositor.
