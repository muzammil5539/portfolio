## 2025-03-08 - [Optimizing NeuralNetworkDiagram Layout & Rendering]
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing, prevents static rendering on Next.js, and degrades runtime performance.
**Action:** When animating SVGs in React based on coordinates, explicitly map, precalculate and memoize values directly within rendering via `useMemo` to eliminate imperative DOM queries.
