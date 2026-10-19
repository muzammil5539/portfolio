## 2024-06-11 - Optimize scroll-bound animations
**Learning:** Scroll event listeners updating React state cause constant re-renders and potential layout thrashing.
**Action:** Use framer-motion's useScroll hook combined with a CSS transform and origin class (e.g., <m.div className="origin-left" style={{ scaleX: scrollYProgress }} />) to bypass the React render cycle and delegate animations directly to the compositor.
