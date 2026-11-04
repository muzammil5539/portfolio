"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // ⚡ Bolt Optimization: Use framer-motion's useScroll instead of React state
  // Updating state in a scroll event listener triggers constant React re-renders.
  // Using useScroll combined with a CSS transform and origin class offloads the
  // animation directly to the compositor, bypassing the React render cycle completely.
  // Impact: Eliminates main thread blocking and re-renders during scrolling.
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
