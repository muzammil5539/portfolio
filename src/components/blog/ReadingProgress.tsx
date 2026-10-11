"use client";
import { motion, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // ⚡ Bolt Optimization: Replace scroll event listener and React state updates with Framer Motion's useScroll.
  // This delegates the scroll animation directly to the compositor via CSS transform (scaleX),
  // bypassing the React render cycle and preventing constant re-renders and layout thrashing.
  // Impact: Removes all main-thread React work during scrolling.
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      <motion.div
        className="origin-left h-full bg-accent-text"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
