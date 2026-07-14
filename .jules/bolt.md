
## 2025-03-01 - DOM Measurement in useEffect Anti-Pattern
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` in React/Next.js triggers layout thrashing and prevents static rendering/SSR, frequently causing build or runtime failures.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables (`--path-length`) to animations, eliminating imperative DOM queries.

## 2025-03-01 - Default Array Props in Component Signature
**Learning:** Declaring default array or object props directly in the component signature (e.g., `nodeCount = [4, 6, 6, 4, 2]`) creates a new referential equality issue on every re-render, forcing unmemoized initializations and breaking `useMemo` dependencies.
**Action:** Extract such defaults and static configurations into constants outside the component body.
