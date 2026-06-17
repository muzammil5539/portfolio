## 2026-06-17 - Imperative DOM queries in React
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and prevents static rendering/SSR on Next.js, which is a codebase-specific performance anti-pattern found in `NeuralNetworkDiagram`.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via inline styles, eliminating imperative DOM queries.
