## 2025-03-01 - Optimizing SVG Animation Coordinate Measurements
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures and decreasing frontend performance.
**Action:** Precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables to animations, eliminating imperative DOM queries.
