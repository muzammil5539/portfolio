"use client";
import { m, useScroll } from "framer-motion";

// ⚡ Bolt Optimization:
// 💡 What: Replaced React state-based scroll listener with framer-motion useScroll
// 🎯 Why: State updates inside scroll events cause constant React re-renders and layout thrashing
// 📊 Impact: Eliminates 100% of re-renders on scroll, delegating animation to the compositor
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      <m.div
        className="h-full bg-accent-text origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
