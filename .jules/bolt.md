## 2025-03-09 - Avoid isClient for standard HTML elements
**Learning:** Standard HTML elements (e.g., `<video>`) generally do not suffer from Next.js hydration mismatches. Unnecessarily delaying their render using `isClient` state and `useEffect` forces double-renders, creates unneeded client components, and degrades Time to Interactive (TTI).
**Action:** Remove `isClient` and its associated `useEffect` for static rendering of native HTML elements like `<video>` to improve performance.
