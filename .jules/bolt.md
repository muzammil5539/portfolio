## 2024-02-13 - [SSR Layout Thrashing Fix in NeuralNetworkDiagram]
**Learning:** Performing DOM queries and floating point length calculations inside `useEffect` during rendering creates a double-render performance hit, degrades TTI, and prevents SSR. This codebase explicitly avoids this by replacing DOM parsing with mathematically derived constants memoized using `useMemo`.
**Action:** Always precalculate lengths mathematically in `useMemo` based on layout boundaries to enable static SSR without layout thrashing.
