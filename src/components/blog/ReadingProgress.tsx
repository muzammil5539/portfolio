"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // ⚡ Bolt Optimization: Replace scroll event listener with framer-motion's useScroll hook.
  // Using useScroll and passing scrollYProgress to scaleX bypasses the React render cycle
  // by updating the CSS transform directly, preventing constant re-renders and potential
  // layout thrashing on the main thread during scrolling.
  // Expected Impact: Reduces main thread blocking time during scroll events to near 0ms,
  // significantly improving scroll performance.
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
