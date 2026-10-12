"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      {/*
        Performance Optimization:
        Using framer-motion's useScroll with scaleX and origin-left delegates
        the animation directly to the compositor instead of triggering continuous
        React re-renders via a scroll event listener and setState.
        Expected Impact: Reduces main-thread blocking and eliminates layout thrashing during scroll.
      */}
      <m.div
        className="h-full bg-accent-text origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
