"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // Optimization: useScroll bypasses React render cycle.
  // Instead of updating state on every scroll event (which causes main-thread re-renders),
  // we bind the scroll progress directly to a CSS transform on an <m.div>, delegating the animation to the compositor.
  // Impact: Eliminates continuous React re-renders while scrolling.
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
