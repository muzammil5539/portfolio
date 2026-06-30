## 2025-03-08 - Declarative SVG Line Animations
**Learning:** In Next.js SSR apps, querying DOM attributes (e.g., using `.querySelectorAll` and `.getAttribute('x2')`) inside `useEffect` to set SVG animations causes layout thrashing, bypasses static rendering, and delays TTI.
**Action:** Mathematically precalculate line lengths in `useMemo` and declaratively pass them as inline CSS variables or styles. Always avoid `useEffect` DOM queries when values can be derived from props/state.
