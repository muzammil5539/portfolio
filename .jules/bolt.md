## 2024-09-04 - Remove unnecessary isClient state for HTML elements
**Learning:** Standard HTML elements like `<video>` generally do not suffer from Next.js hydration mismatches. Delaying their render using `isClient` state and `useEffect` forces double-renders and degrades Time to Interactive (TTI).
**Action:** Remove `isClient` state and `useEffect` when rendering standard HTML elements to avoid unnecessary double-renders.
