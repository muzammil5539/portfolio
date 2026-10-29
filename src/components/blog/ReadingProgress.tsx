"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // Bolt: Using framer-motion's useScroll avoids triggering React re-renders on every scroll event.
  // It delegates the animation to the compositor via CSS transforms, eliminating main thread blocking.
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
