## 2024-05-24 - Efficient Scroll Progress Implementation with framer-motion
**Learning:** `framer-motion`'s `useScroll` hook avoids React state updates on every scroll event by using `MotionValue`s directly in the animation context. Updating state inside a `scroll` event listener with `useEffect` as done originally triggers constant React re-renders which causes unnecessary CPU utilization and potential layout thrashing.
**Action:** Use `framer-motion`'s `useScroll` hook with a CSS transform (like `scaleX`) when dealing with scroll-bound animations instead of `useEffect` and `useState`.
