## 2024-10-27 - [Avoid isClient for standard HTML elements]
**Learning:** Standard HTML elements like `<video>` do not suffer from Next.js hydration mismatches.
**Action:** Avoid unnecessarily delaying their render using `isClient` state and `useEffect`, as it forces double-renders and degrades TTI.
