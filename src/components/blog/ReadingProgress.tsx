"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // ⚡ Bolt Optimization: Use framer-motion's useScroll instead of state tied to scroll events.
  // This bypasses the React render cycle entirely on every scroll event and delegates
  // the animation directly to the compositor via CSS transform, eliminating layout thrashing.
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
