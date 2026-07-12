## 2025-03-01 - Prevent Layout Thrashing in SVG Components
**Learning:** Imperative DOM calls (`querySelectorAll`, `getAttribute`) within `useEffect` for SVG animations (like line lengths) trigger layout thrashing and hinder static rendering/SSR in Next.js.
**Action:** Always precalculate layout math (like coordinate distances) via `useMemo` during the render phase and pass them declaratively via React style props instead of imperative DOM mutation.
