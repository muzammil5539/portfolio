## 2025-05-15 - React ID generation
**Learning:** Avoid using `Math.random()` to generate DOM element IDs during React renders (as seen in `src/components/Mermaid.tsx`), because it causes unnecessary regeneration and triggers dependent `useEffect` hooks on every re-render.
**Action:** Prefer React 18's `useId()` hook to generate stable, unique identifiers.
## 2025-05-15 - SVG Animations via CSS variables
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and prevents static rendering/SSR on Next.js, frequently causing build or runtime failures.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables to animations, eliminating imperative DOM queries.
