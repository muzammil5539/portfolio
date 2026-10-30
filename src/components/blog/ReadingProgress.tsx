"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // OPTIMIZATION: Replacing React state + scroll listener with framer-motion's useScroll.
  // This bypasses the React render cycle on scroll, updating the scaleX via the compositor directly,
  // preventing layout thrashing and unnecessary re-renders. Expected to eliminate main thread blocking during scroll.
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      <m.div
        className="origin-left h-full bg-accent-text"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
