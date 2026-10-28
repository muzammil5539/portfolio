"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // ⚡ Bolt Optimization: Replaced state-driven scroll listener with framer-motion's useScroll.
  // This delegates the animation to the compositor and prevents continuous React re-renders,
  // significantly reducing main thread blocking during scroll events.
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
