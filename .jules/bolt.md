
## 2025-02-12 - Imperative DOM Mutation in React Animation
**Learning:** Found a Next.js performance anti-pattern in `NeuralNetworkDiagram.tsx` where an imperative `useEffect` queried DOM geometry (`querySelectorAll` + `getAttribute`) to set animation properties for SVG lines (`strokeDasharray`, `strokeDashoffset`). This approach forced a double-render and layout thrashing, hurting TTI and making the component non-SSR friendly.
**Action:** Always prefer mathematical pre-calculation of coordinates within a `useMemo` over querying actual DOM element lengths in an effect, and use CSS Custom Properties (`--path-length`) to declaratively pass these values directly into stylesheets and `@keyframes`.
