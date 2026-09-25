## 2024-05-24 - Layout Thrashing in Next.js SVG Animations
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures for client-rendered SVGs.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via React attributes and styles to animations, eliminating imperative DOM queries entirely.
