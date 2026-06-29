## 2025-03-09 - [Performance: React Effect optimization]
**Learning:** In Next.js with React, reading DOM values like element path lengths using `querySelectorAll` inside a `useEffect` prevents the values from being used during server-side rendering, forces client-side re-renders (layout thrashing), and creates unnecessary client components. For SVG visualizations like `NeuralNetworkDiagram`, lengths should be calculated geometrically within `useMemo` so they are immediately available for inline styling without DOM reads.
**Action:** When implementing mathematical visualizations, pre-calculate positional data and path lengths strictly in React render cycle (via `useMemo`) using component coordinates rather than measuring rendered elements post-mount.

## 2025-03-09 - [Performance: Unnecessary delay client rendering]
**Learning:** Using `useState` and `useEffect` just to delay rendering of SSR-safe elements (like `<video>` tags without hydration-conflicting props) is an anti-pattern. It introduces unnecessary client-side re-renders, increasing Time to Interactive (TTI) and adding useless state overhead.
**Action:** Remove "isClient" checks around standard HTML elements like videos or images unless there is a verified hydration mismatch (like relying on `window` APIs for attributes).
