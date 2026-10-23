"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      {/*
        ⚡ BOLT OPTIMIZATION:
        Replaced React state updates in scroll event listener with framer-motion's useScroll.
        This eliminates React render cycle overhead on every scroll event and delegates
        the progress bar scaling directly to the GPU/compositor via CSS transform.
      */}
      <m.div
        className="h-full bg-accent-text origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
