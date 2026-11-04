## 2024-05-15 - React state in scroll events
**Learning:** Updating state in scroll events causes constant re-renders and degrades performance significantly, especially for elements like reading progress bars.
**Action:** Use CSS transforms with Framer Motion's `useScroll` hook to offload animations directly to the compositor.
