
## 2025-03-09 - Remove imperative DOM queries in React
**Learning:** In the `NeuralNetworkDiagram.tsx` component, parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggered layout thrashing and prevented static rendering/SSR. It was calculating math that can be strictly derived from state parameters without referencing the DOM.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS inline styles (e.g., `strokeDasharray`) to animations, eliminating imperative DOM queries and dramatically improving component render efficiency.
