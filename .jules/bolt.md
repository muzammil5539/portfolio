## 2024-07-16 - SVG DOM Query Layout Thrashing in Next.js
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` on SVGs triggers layout thrashing and prevents static rendering/SSR in Next.js, frequently causing build or runtime failures.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via inline styles (like CSS variables or dash arrays) to animations, eliminating imperative DOM queries entirely.
