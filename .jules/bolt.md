## 2025-03-05 - Remove DOM parsing in NeuralNetworkDiagram

**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively to SVG elements, eliminating imperative DOM queries.
