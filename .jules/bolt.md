## 2025-02-18 - Optimized NeuralNetworkDiagram

**Learning:** `useEffect` + `querySelectorAll` reading SVG DOM dimensions to calculate lengths and then reapplying them via `.style` triggers layout thrashing and prevents server-side rendering/hydration of SVGs correctly, which degrades TTI and causes hydration issues in Next.js.
**Action:** Use `useMemo` to precalculate SVG path coordinates and lengths mathematically during render, and pass them down declaratively via inline styles using CSS variables or standard style objects to eliminate imperative DOM dependencies.
