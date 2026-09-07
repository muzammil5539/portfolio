## 2026-09-07 - Precalculate DOM Measurements during Render Phase
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and prevents static rendering/SSR. Also, inline default array props destroy `useMemo` reference equality checks on every render.
**Action:** Always precalculate mathematical coordinate distances during the render phase via `useMemo` and pass them declaratively as CSS variables. Extract static default objects/arrays outside components.
