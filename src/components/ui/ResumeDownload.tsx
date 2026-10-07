"use client";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Download, X } from "lucide-react";
import { resumeRoles } from "@/data/resumes";

const FOCUSABLE = "a[href], button:not([disabled])";

/**
 * "Résumé" button that asks which role the visitor is hiring for, then downloads that role's PDF.
 * Each option is a real <a download>, so it also works with middle-click and in browsers that block scripted downloads.
 */
export default function ResumeDownload({ className, children }: { className?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const reduce = useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      (previouslyFocused ?? trigger)?.focus();
    };
  }, [open]);

  const dialog = (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 text-foreground shadow-[0_30px_80px_-20px_var(--shadow-strong)]"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0, transition: { duration: 0.1 } } : { opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            <div className="mb-1 flex items-start justify-between gap-4">
              <h2 id={titleId} className="font-display text-2xl font-semibold leading-tight">
                Which role are you hiring for?
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="-mr-2 -mt-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-text-secondary hover:bg-surface-hover hover:text-foreground"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <p className="mb-4 text-sm text-text-secondary">Pick one and the résumé tailored to that role downloads as a PDF.</p>
            <ul className="flex flex-col gap-2">
              {resumeRoles.map((role) => (
                <li key={role.id}>
                  <a
                    href={role.file}
                    download
                    onClick={() => setOpen(false)}
                    className="group flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-border px-4 py-2.5 transition-colors hover:border-accent-text hover:bg-surface-hover"
                  >
                    <span>
                      <span className="block font-semibold">{role.label}</span>
                      <span className="block text-sm text-text-muted">{role.blurb}</span>
                    </span>
                    <Download size={18} aria-hidden="true" className="shrink-0 text-text-muted group-hover:text-accent-text" />
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open} className={className}>
        {children}
      </button>
      {mounted && createPortal(dialog, document.body)}
    </>
  );
}
