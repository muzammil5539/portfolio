"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // Optimization: Replacing state-based scroll tracking with framer-motion's useScroll.
  // This bypasses the React render cycle on every scroll event, delegating the
  // transform animation directly to the compositor. Expected Impact: Removes continuous
  // React re-renders during scrolling, preventing layout thrashing and freeing up the main thread.
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
