## 2026-08-20 - DOM Query Thrashing in Next.js
**Learning:** Parsing visual lengths using DOM calls (.querySelectorAll, .getAttribute) within useEffect triggers layout thrashing and prevents static rendering/SSR on Next.js.
**Action:** Use useMemo to precalculate coordinate distances mathematically during render and pass them declaratively via CSS inline styles.
