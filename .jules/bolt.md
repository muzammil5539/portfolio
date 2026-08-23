## 2026-08-23 - Precalculating SVG paths
**Learning:** Parsing visual lengths using DOM calls within useEffect prevents static rendering and causes layout thrashing.
**Action:** Use useMemo to mathematically calculate distances and declarative CSS variables.
