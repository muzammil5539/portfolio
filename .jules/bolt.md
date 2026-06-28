## 2025-03-01 - [DOM Queries inside useEffect trigger layout thrashing and prevent SSR/Static Rendering]
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables or inline styles to animations, eliminating imperative DOM queries.
