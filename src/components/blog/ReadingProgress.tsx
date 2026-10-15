"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // Performance: Use framer-motion's useScroll to bypass React state updates on scroll,
  // eliminating re-renders and preventing layout thrashing
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
