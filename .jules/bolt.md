## 2024-05-18 - [Avoid [...Array(n)].map() inside React render functions]
**Learning:** Instantiating `[...Array(n)]` inside the render function for a static range creates new arrays unnecessarily on every render.
**Action:** Use `Array.from({ length: n })` or move static range calculation outside of the component. For example, `[...Array(16)].map()` in `src/components/CodeSnippet.tsx` and `[...Array(10)].map()` in `src/components/3d/AnimatedBackground.tsx` should be optimized.
