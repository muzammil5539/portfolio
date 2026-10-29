## 2025-02-28 - [Delegating scroll animations to the compositor]
**Learning:** Using React state (e.g. `useState`) inside a `scroll` event listener forces continuous React re-renders on every scroll tick. This is a massive main-thread bottleneck, especially for layout properties like `width`.
**Action:** Always delegate scroll-bound animations directly to the compositor. By using Framer Motion's `useScroll` combined with a CSS transform (like `scaleX`) on an `m.div` with an `origin` utility class, we bypass the React render cycle completely and eliminate layout thrashing.
