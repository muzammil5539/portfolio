## 2025-09-01 - Layout Thrashing in Next.js SSR
**Learning:** Parsing visual lengths using DOM calls (`.querySelectorAll`, `.getAttribute`) inside a `useEffect` forces synchronous layout thrashing and prevents declarative SSR styling on Next.js.
**Action:** Replace imperative DOM queries for visual properties with mathematical precalculation in a `useMemo` block and pass the values via inline CSS variables/styles.
