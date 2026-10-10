"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // Optimization: useScroll from framer-motion avoids triggering React re-renders on every scroll event
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      <m.div
        className="h-full origin-left bg-accent-text"
        // Optimization: updating a CSS transform via m.div bypasses the React render cycle
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
