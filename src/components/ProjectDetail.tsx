"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import type { Project } from "@/data/projects";

const AUTO_ADVANCE_MS = 4000;

function Gallery({ images, alt, isDarkMode }: { images: string[]; alt: string; isDarkMode: boolean }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused, images.length]);

  const go = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);

  return (
    <div
      className={`relative h-64 w-full sm:h-80 select-none ${isDarkMode ? "bg-ai-navy" : "bg-gray-100"}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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
          alt={`${alt} screenshot ${i + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className={`object-contain transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"}`}
          priority={i === 0}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous screenshot"
            className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next screenshot"
            className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setIndex(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Lock background scroll while the modal is open — otherwise the page behind
  // the fixed overlay keeps scrolling underneath it.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`project-card-${project.id}`}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl ${
          isDarkMode ? "bg-ai-charcoal border border-ai-slate/50" : "bg-white"
        }`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className={`absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
            isDarkMode ? "bg-ai-navy/80 text-ai-text hover:bg-ai-slate" : "bg-white/90 text-gray-700 hover:bg-gray-100"
          }`}
        >
          <X size={18} />
        </button>

        <div className="relative">
          {project.images && project.images.length > 1 ? (
            <Gallery images={project.images} alt={project.title} isDarkMode={isDarkMode} />
          ) : (
            <div className={`relative h-64 w-full sm:h-80 ${isDarkMode ? "bg-ai-navy" : "bg-gray-100"}`}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-contain"
              />
            </div>
          )}
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
            isDarkMode ? "from-ai-charcoal" : "from-white"
          }`} />
        </div>

        <div className="p-6">
          <h3 className={`text-2xl font-bold ${isDarkMode ? "text-ai-text" : "text-gray-900"}`}>
            {project.title}
          </h3>
          <p className={`mt-3 text-sm leading-relaxed ${isDarkMode ? "text-ai-text-muted" : "text-gray-600"}`}>
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-1 text-xs font-medium rounded-md border ${
                  isDarkMode
                    ? "bg-ai-navy/80 text-ai-cyan border-ai-cyan/20"
                    : "bg-cyan-50 text-cyan-700 border-cyan-200"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {(project.github || project.live) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d inline-flex items-center gap-2 px-4 py-2 text-sm"
                >
                  <Github size={16} /> Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                    isDarkMode
                      ? "border-white/20 text-ai-text hover:border-ai-cyan hover:text-ai-cyan"
                      : "border-gray-300 text-gray-900 hover:border-cyan-500 hover:text-cyan-600"
                  }`}
                >
                  <ExternalLink size={16} /> Live
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
