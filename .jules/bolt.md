## 2026-08-16 - Eliminate Layout Thrashing
**Learning:** Parsing visual lengths using DOM calls (.querySelectorAll, .getAttribute) within useEffect triggers layout thrashing and prevents static rendering/SSR. Using useMemo to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables to animations eliminates imperative DOM queries.
**Action:** Use useMemo for geometry math and CSS custom properties instead of DOM queries for animations in React.
