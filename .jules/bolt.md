## 2026-08-08 - Unnecessary isClient for Video
**Learning:** Standard HTML elements (e.g., <video>) generally do not suffer from Next.js hydration mismatches. Delaying their render using isClient state and useEffect forces double-renders and degrades Time to Interactive (TTI).
**Action:** Avoid using isClient and useEffect for standard HTML elements; rely on Next.js hydration handling for safe elements.
