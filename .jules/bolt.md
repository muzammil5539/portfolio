## 2026-09-16 - Prevent Layout Thrashing in NeuralNetworkDiagram
**Learning:** Parsing visual lengths using DOM calls (.querySelectorAll, .getAttribute) within a useEffect triggers layout thrashing and prevents static rendering/SSR on Next.js. Computing these via math in useMemo instead resolves hydration errors and vastly improves TTI.
**Action:** Use useMemo to mathematically calculate distances and coordinate distances during the render phase and pass them declaratively via CSS variables to animations, eliminating imperative DOM queries.
