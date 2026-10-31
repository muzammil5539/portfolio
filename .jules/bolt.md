## 2024-10-31 - Scroll-bound animations via Compositor
**Learning:** Using React state for scroll-bound animations causes continuous React re-renders and potential layout thrashing on the main thread.
**Action:** Always use framer-motion's useScroll combined with a CSS transform (e.g., scaleX) on an m.div to bypass the React render cycle and delegate animations directly to the compositor.
