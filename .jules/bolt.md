## 2025-03-01 - Imperative DOM queries and style updates in Next.js/React SVG Diagram
**Learning:** In `NeuralNetworkDiagram.tsx`, lines were being styled using `useEffect` with `document.querySelectorAll` which triggered layout thrashing and prevents static rendering/SSR in Next.js, particularly bad for SVG layout calculations.
**Action:** When styling elements in React, specially generated ones like `<line>` and nodes, use declarative `style` props with values pre-calculated in `useMemo` instead of waiting for DOM paint and imperatively changing them in `useEffect`.
