## 2024-05-30 - Removing Layout Thrashing from SVG Animations
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and forces a double-render in Next.js applications, frequently causing static rendering issues or preventing clean SSR hydration.
**Action:** Use `useMemo` to mathematically precalculate coordinate distances during the render phase and pass them declaratively via inline styles (e.g., `--path-length` cast `as React.CSSProperties`), eliminating imperative DOM queries entirely.
