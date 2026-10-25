"use client";
import { m, useScroll } from "framer-motion";

// ⚡ Bolt Optimization: Replacing state-based scroll listener with framer-motion's useScroll
// and scaleX transform to completely bypass React's render cycle during scrolling.
// Eliminates re-renders and delegates animation directly to the GPU compositor.
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
