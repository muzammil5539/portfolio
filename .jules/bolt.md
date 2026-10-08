## 2024-10-08 - Optimized Reading Progress
**Learning:** Using React state linked to a `scroll` event listener triggers continuous, costly re-renders of the component (and potentially its tree) matching the monitor refresh rate, blocking the main thread during user interaction.
**Action:** Always delegate scroll-bound animations to the CSS compositor. In Framer Motion, replace manual event listeners with `useScroll()` and pass the raw MotionValue directly to a style property (e.g., `scaleX` or `width`) on an `<m.div>` or `<motion.div>` to bypass React's render loop entirely.
