## 2024-05-18 - Avoid isClient for HTML elements
**Learning:** Standard HTML elements like <video> generally do not suffer from Next.js hydration mismatches. Avoiding isClient state and useEffect prevents unneeded double-renders.
**Action:** Use conditional rendering directly on the element instead.
