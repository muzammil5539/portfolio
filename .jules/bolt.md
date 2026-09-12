## 2026-09-12 - NeuralNetworkDiagram Animation Layout Thrashing
**Learning:** `NeuralNetworkDiagram.tsx` uses `querySelectorAll` and `getAttribute` within a `useEffect` to calculate SVG line lengths for animation. This causes layout thrashing and forces a client-side only render.
**Action:** Remove the `useEffect` and calculate connection lengths mathematically during render via `useMemo`. Pass lengths declaratively using CSS custom properties or inline styles on the SVG `<line>` elements.
