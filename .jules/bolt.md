## 2025-03-05 - [Component Optimization: NeuralNetworkDiagram]
**Learning:** In SVG-based network diagram components, encapsulating layout calculations and connectivity mapping within `useMemo` hooks is crucial. Moving constants and default props outside the component avoids unnecessary recalculations and referential equality issues on every render.
**Action:** Always pre-calculate complex layouts (`Math.pow`, `Math.sqrt`) inside a `useMemo` and use stable identifiers.
