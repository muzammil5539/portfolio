## 2023-10-26 - Prevent Layout Thrashing in React SVG Components
**Learning:** Querying DOM elements (e.g. `.querySelectorAll`) to measure lengths inside a `useEffect` prevents static rendering in Next.js and causes severe layout thrashing.
**Action:** Always compute dimensions mathematically (like node distances) during the render phase and pass them declaratively via CSS/style properties.
