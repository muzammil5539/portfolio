## 2024-03-24 - [Avoid state updates in scroll listeners]
**Learning:** Using `useState` to update a value bound to a `scroll` event listener causes massive layout thrashing and unnecessary React re-renders, greatly hurting performance.
**Action:** Use framer-motion's `useScroll` hook combined with a CSS transform and origin class (e.g. `scaleX: scrollYProgress` and `origin-left`) to completely bypass the React render cycle and delegate animations directly to the compositor.
