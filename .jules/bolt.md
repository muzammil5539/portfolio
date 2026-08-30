## 2024-05-30 - Layout Thrashing in React SVG Connections
**Learning:** Using `querySelectorAll` inside a `useEffect` to calculate connection lengths via `getAttribute` causes significant layout thrashing on render, forces synchronous recalculations, and breaks React SSR/static rendering behavior for components like `NeuralNetworkDiagram.tsx`.
**Action:** Always prefer calculating layout data mathematically inside a `useMemo` block during render instead of performing imperative DOM manipulations post-render.
