## 2024-05-18 - [Eliminate Layout Thrashing in NeuralNetworkDiagram]
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via React props/inline styles to animations, eliminating imperative DOM queries.
