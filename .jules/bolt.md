
## 2026-06-09 - Declarative SVG Path Animations
**Learning:** Using `useEffect` with `querySelectorAll` to mutate SVG properties (`strokeDasharray`, `strokeDashoffset`) on mount in React components creates an expensive sequence of forced synchronous layouts (DOM read via `getTotalLength` followed by DOM write). This is particularly impactful for network diagram/particle components with many connections.
**Action:** Always pre-calculate visual properties like path lengths mathematically during the render phase (memoized via `useMemo`) and apply them declaratively using inline styles with CSS Custom Properties (e.g., `style={{ '--path-length': length }}`). This skips the layout thrashing phase entirely and aligns perfectly with React's paradigm.
