## 2025-03-08 - Unnecessary isClient for Standard HTML Elements
**Learning:** Standard HTML elements like `<video>` do not suffer from Next.js hydration mismatches and do not need to be wrapped in `isClient` checks to delay their rendering.
**Action:** Remove `isClient` state and `useEffect` wrappers for standard HTML elements to avoid forcing double-renders and degrading Time to Interactive (TTI).
