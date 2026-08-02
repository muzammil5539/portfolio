## 2025-03-04 - Layout thrashing during animation setup

**Learning:** Parsing DOM and elements logic during the initial setup inside `useEffect` logic trigger layout thrashing and hinders SSR and static rendering due to querying elements dynamically during hydration phase.
**Action:** Extract initial parameters processing like geometry into `useMemo` blocks so values get strictly precalculated, avoiding imperative DOM calls and relying on CSS properties declaratively logic instead.
