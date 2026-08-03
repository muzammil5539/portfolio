## 2026-08-03 - Declarative SVG Animation and Layout Thrashing
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) within a `useEffect` triggers layout thrashing and prevents static rendering. Also, declaring default array props in component signatures is an anti-pattern causing referential equality issues.
**Action:** Use `useMemo` to precalculate coordinate distances mathematically and pass them declaratively via inline styles. Extract default arrays to constants.
