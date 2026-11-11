"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      {/* ⚡ Bolt Optimization: Using Framer Motion's useScroll with scaleX transform
          bypasses React's render cycle completely. This delegates the progress bar
          animation to the browser's compositor, preventing constant layout thrashing
          and main thread blocking during scroll events. */}
      <m.div
        className="h-full bg-accent-text origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
