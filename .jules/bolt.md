
## 2025-03-09 - Remove imperative DOM queries in React
**Learning:** In the `NeuralNetworkDiagram.tsx` component, parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggered layout thrashing and prevented static rendering/SSR. It was calculating math that can be strictly derived from state parameters without referencing the DOM.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS inline styles (e.g., `strokeDasharray`) to animations, eliminating imperative DOM queries and dramatically improving component render efficiency.

## 2025-03-09 - Avoid Unchecked Index Access in Loops
**Learning:** Next.js build failed with `Type error: Object is possibly 'undefined'` at `nextLayer[nj].x` within the `nextLayer.forEach((nextNode, nj) => ...)` loop. This codebase's TypeScript configuration enforces strict checks on array index lookups (e.g., `noUncheckedIndexedAccess: true`), meaning any direct index access requires a null check.
**Action:** When iterating over arrays (like via `forEach` or `map`), use the loop's provided element variable (e.g., `nextNode.x`) directly instead of fetching it again via index (`nextLayer[nj].x`) to completely bypass `Object is possibly undefined` errors.
