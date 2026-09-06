## 2026-09-06 - Refactored NeuralNetworkDiagram
**Learning:** Imperative DOM querying (e.g., using 'querySelectorAll' and 'getAttribute' inside a 'useEffect') to compute visual lengths triggers layout thrashing and hinders SSR, often causing build or runtime failures.
**Action:** Precalculate coordinate distances mathematically within a 'useMemo' during the render phase and pass them declaratively via CSS variables or the 'style' prop.
