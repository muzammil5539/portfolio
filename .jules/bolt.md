## 2025-02-19 - Unnecessary isClient for HTML elements
**Learning:** Standard HTML elements (e.g., <video>) generally do not suffer from Next.js hydration mismatches. Avoiding unnecessarily delaying their render using isClient state and useEffect prevents double-renders and improves Time to Interactive (TTI).
**Action:** Do not use isClient state to delay rendering of standard HTML elements.
