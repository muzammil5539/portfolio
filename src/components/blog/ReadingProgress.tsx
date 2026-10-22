"use client";
import { m, useScroll } from "framer-motion";

// ⚡ Bolt: Using framer-motion's useScroll to bypass React re-renders on scroll
// Impact: Eliminates constant re-renders during scroll, delegating animation to the compositor
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      <m.div
        className="h-full origin-left bg-accent-text"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
