## 2025-03-01 - Optimizing SVG Diagrams
**Learning:** In SVG-based network diagram components like NeuralNetworkDiagram, reading DOM elements using `useEffect` and `querySelectorAll` to calculate visual properties (like line lengths) causes layout thrashing and unnecessary re-renders.
**Action:** Always pre-calculate visual properties like SVG line lengths mathematically during the render phase and pass them directly as inline styles or CSS variables, using `useMemo` to cache the computation instead of imperatively reading from the DOM.
