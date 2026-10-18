## 2025-02-18 - Scroll Event Listener Re-renders
**Learning:** Using React state and `window.addEventListener('scroll')` for scroll-bound animations causes constant React re-renders and potential layout thrashing during scroll, severely hurting performance.
**Action:** Replace `window.addEventListener('scroll')` with Framer Motion's `useScroll()` hook and `<m.div>` for direct compositor animation, bypassing the React render cycle.
