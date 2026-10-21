"use client";
import { m, useScroll } from "framer-motion";

// ⚡ Bolt: Removed state-driven scroll listener to eliminate continuous React re-renders and layout thrashing during scroll.
// Delegated animation directly to the compositor via framer-motion's useScroll and CSS transform scaleX.
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
