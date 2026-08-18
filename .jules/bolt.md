## 2025-02-18 - Replacing Imperative DOM Mutations with useMemo
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables to animations, eliminating imperative DOM queries.
