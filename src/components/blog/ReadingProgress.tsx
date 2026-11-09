"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // ⚡ Bolt Optimization:
  // Using framer-motion's useScroll hook instead of a state-driven approach on the scroll event.
  // This avoids constant React re-renders and potential layout thrashing on every scroll.
  // The animation is offloaded to the compositor using a CSS transform (`scaleX: scrollYProgress`).
  // Expected impact: Reduces React re-renders to 0 during scrolling.
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
