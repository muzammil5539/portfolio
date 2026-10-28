## 2023-10-28 - Optimize reading progress bar by bypassing React re-renders
**Learning:** Replaced a state-driven scroll listener with framer-motion's useScroll to delegate animation to the compositor and prevent continuous React re-renders during scroll events, significantly reducing main thread blocking.
**Action:** Use framer-motion's useScroll with scale transforms instead of useState and style width bindings for scroll-bound animations.
