## 2025-03-09 - Memoize UI DOM logic in SVG NeuralNetworkDiagram
**Learning:** Imperatively updating SVG stroke arrays using useEffect and querySelectorAll causes layout thrashing and blocks static rendering/SSR in Next.js
**Action:** Always substitute DOM imperative queries like querySelectorAll inside useEffect with declarative inline CSS variables using mathematically calculated bounds inside useMemo
