## 2024-11-20 - Bypass React render cycle for scroll-bound animations
**Learning:** Using useState inside a scroll event listener triggers constant React re-renders and potential layout thrashing on the main thread.
**Action:** Use framer-motion's useScroll hook combined with a CSS transform (scaleX) to bypass the React render cycle and delegate animations directly to the compositor thread.
