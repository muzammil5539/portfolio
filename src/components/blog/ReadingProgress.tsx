"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // ⚡ Bolt Optimization: Replace useState/useEffect scroll listener with framer-motion useScroll.
  // This delegates scroll animations to the compositor via scaleX transform and origin-left class,
  // bypassing constant React re-renders and preventing main thread layout thrashing on scroll.
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
