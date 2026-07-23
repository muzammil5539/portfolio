## 2025-03-01 - Avoid Imperative DOM Length Calculations
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` in React triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively, eliminating imperative DOM queries and improving performance by avoiding hydration issues and double renders.
