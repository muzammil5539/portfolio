## 2024-05-24 - [Avoid React Layout Thrashing on Scroll]
**Learning:** Using a manual scroll event listener paired with React state updates inside a component triggered continuous re-renders, causing severe layout thrashing on the main thread during scrolling.
**Action:** When implementing scroll-bound animations, always use framer-motion's useScroll hook combined with a CSS transform (like scaleX) and origin class to bypass the React render cycle entirely and delegate the work to the compositor.
