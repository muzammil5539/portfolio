## 2026-08-10 - Unnecessary isClient state for HTML elements
**Learning:** Standard HTML elements (like <video>) don't suffer from Next.js hydration mismatches. Wrapping them in isClient state is an anti-pattern that causes double-renders and degrades Time to Interactive (TTI).
**Action:** Remove isClient state wrappers for standard HTML elements to eliminate unnecessary re-renders.
