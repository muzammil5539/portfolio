## 2025-03-01 - [Avoid Layout Thrashing with SVG DOM Querying]
**Learning:** Querying properties of React DOM elements in a `useEffect` on every render (such as `getAttribute("x2")`) to manually calculate layouts blocks the main thread, ruins initial static rendering/SSR, and introduces substantial performance bottlenecks.
**Action:** Math and pure layouts (such as Euclidean paths for SVGs) should be calculated mathematically beforehand directly inside a `useMemo` and bound via CSS properties instead of imperatively queried via `.querySelectorAll` inside a component.
