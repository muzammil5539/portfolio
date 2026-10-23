## 2026-10-23 - Replaced React Scroll Progress Listener with framer-motion useScroll
**Learning:** Implementing scroll-bound progress bars using native 'scroll' event listeners and React state updates causes continuous re-renders and potential layout thrashing on every pixel scrolled.
**Action:** Use framer-motion's `useScroll` combined with CSS transforms (`scaleX` and an origin class) to bypass the React render cycle and delegate scroll animations directly to the compositor.
