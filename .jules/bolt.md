## 2025-03-05 - Optimize NeuralNetworkDiagram SVG Rendering
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing, prevents static rendering/SSR on Next.js, and creates an unnecessary rendering pass.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS inline styles/variables, completely eliminating imperative DOM queries.
