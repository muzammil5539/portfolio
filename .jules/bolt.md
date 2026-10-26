## 2024-05-24 - Optimize scroll-bound animations
**Learning:** Updating React state inside scroll event listeners causes constant re-renders and degrades Time to Interactive (TTI), particularly on long pages like blog posts.
**Action:** Use framer-motion's useScroll hook combined with a CSS transform and origin class (e.g., <m.div className="origin-left" style={{ scaleX: scrollYProgress }} />) to bypass the React render cycle and delegate animations directly to the compositor.
