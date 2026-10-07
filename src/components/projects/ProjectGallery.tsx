"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_ADVANCE_MS = 4000;

export default function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (reduce || paused || images.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % images.length), AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, images.length]);

  const go = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);

  return (
    <div
      className="relative h-64 w-full select-none overflow-hidden rounded-2xl border border-border bg-surface-hover sm:h-[28rem]"
      role="group"
      aria-roledescription="carousel"
      aria-label={`${alt} screenshots`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = (e.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
        if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
        touchStartX.current = null;
      }}
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} screenshot ${i + 1} of ${images.length}`}
          fill
          sizes="(max-width: 1024px) 100vw, 960px"
          className={`object-contain transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"}`}
          priority={i === 0}
        />
      ))}
      {images.length > 1 && (
        <>
          <button onClick={() => go(-1)} aria-label="Previous screenshot" className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-panel/80 text-panel-fg hover:bg-panel">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => go(1)} aria-label="Next screenshot" className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-panel/80 text-panel-fg hover:bg-panel">
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setIndex(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-accent-primary" : "w-2 bg-text-muted"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
