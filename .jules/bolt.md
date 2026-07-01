## 2025-03-10 - [SVG Layout Thrashing & SSR Mismatches]
**Learning:** [Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures.]
**Action:** [Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via React CSS properties (e.g. `style={{ strokeDasharray: ... }}`) to eliminate imperative DOM queries entirely.]
