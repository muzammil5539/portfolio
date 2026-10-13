"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      {/*
        ⚡ Bolt Optimization: Replace scroll event listener and React state updates
        with framer-motion's useScroll. This bypasses the React render cycle on every scroll
        and delegates animation directly to the compositor via scaleX, eliminating layout thrashing.
      */}
      <m.div
        className="h-full bg-accent-text origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
