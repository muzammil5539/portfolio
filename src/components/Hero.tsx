"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const roles = ["AI engineer", "computer vision builder", "research-minded developer"];

export default function Hero() {
  const { isDarkMode } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState(roles[0] ?? "");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex] ?? roles[0] ?? "";
    const isComplete = typedRole === currentRole;
    const delay = isComplete && !isDeleting ? 1800 : isDeleting ? 45 : 85;
    const timeout = window.setTimeout(() => {
      if (!isDeleting && isComplete) setIsDeleting(true);
      else if (isDeleting && typedRole.length === 0) {
        setIsDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
      } else {
        const nextLength = typedRole.length + (isDeleting ? -1 : 1);
        setTypedRole(currentRole.slice(0, nextLength));
      }
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [isDeleting, roleIndex, typedRole]);

  const textClass = isDarkMode ? "text-ai-text" : "text-[#18211f]";
  const mutedClass = isDarkMode ? "text-ai-text-muted" : "text-[#66716c]";

  return (
    <section id="about" className={`relative overflow-hidden border-b pt-32 pb-16 md:pt-40 md:pb-24 ${isDarkMode ? "border-white/10 bg-ai-navy" : "border-[#18211f]/10 bg-[#f5f4ef]"}`}>
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.07]" aria-hidden="true" />
      <div className="absolute -right-24 top-24 h-64 w-64 rounded-full bg-ai-cyan/10 blur-3xl" aria-hidden="true" />
      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <div className={`mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] ${mutedClass}`}><span className="h-2 w-2 rounded-full bg-ai-cyan" />Available for thoughtful work</div>
            <p className={`mb-5 font-mono text-sm ${mutedClass}`}>Lahore, Pakistan / 2026</p>
            <h1 className={`max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl lg:text-[6.8rem] ${textClass}`}>Building useful intelligence<span className="text-ai-cyan">.</span></h1>
            <div className={`mt-8 flex min-h-10 items-center gap-2 text-xl sm:text-2xl ${mutedClass}`}><span>I&apos;m a</span><span className={`border-b border-ai-cyan pb-1 font-medium ${textClass}`} aria-live="polite">{typedRole}<span className="animate-pulse text-ai-cyan">|</span></span></div>
            <p className={`mt-8 max-w-xl text-base leading-7 sm:text-lg ${mutedClass}`}>I work across machine learning, computer vision, and voice AI to turn complex research into systems people can actually use.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="#projects" className="btn-3d inline-flex min-h-12 items-center justify-center gap-3 px-6 text-sm">See selected work <ArrowDownRight size={17} /></Link>
              <Link href="#contact" className={`inline-flex min-h-12 items-center justify-center gap-3 border px-6 text-sm font-semibold transition-colors hover:border-ai-cyan hover:text-ai-cyan ${isDarkMode ? "border-white/20 text-ai-text" : "border-[#18211f]/20 text-[#18211f]"}`}>Start a conversation <ArrowUpRight size={17} /></Link>
            </div>
            <div className={`mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t pt-5 text-sm ${isDarkMode ? "border-white/10" : "border-[#18211f]/10"}`}><span className={`inline-flex items-center gap-2 ${mutedClass}`}><MapPin size={15} />Remote / Pakistan</span><span className={mutedClass}>NUST · Computer Engineering</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
            <div className={`absolute -left-5 -top-5 z-10 border px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] ${isDarkMode ? "border-white/20 bg-ai-charcoal text-ai-text" : "border-[#18211f]/15 bg-[#fffefa] text-[#18211f]"}`}>01 / profile</div>
            <div className="relative aspect-[4/5] overflow-hidden bg-ai-charcoal"><Image src="/portfolio.jpg" alt="Muzammil Nawaz Khan" fill priority sizes="(max-width: 1024px) 90vw, 34vw" className="object-cover grayscale-[15%] transition duration-700 hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#18211f]/70 via-transparent to-transparent" /><div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white"><div><p className="text-2xl font-semibold tracking-tight">Muzammil Nawaz Khan</p><p className="mt-1 text-sm text-white/70">AI engineer · NUST graduate</p></div><span className="h-3 w-3 rounded-full bg-ai-cyan shadow-[0_0_18px_rgba(198,243,107,0.9)]" /></div></div>
            <div className={`mt-4 flex justify-between border-t pt-4 font-mono text-xs ${mutedClass} ${isDarkMode ? "border-white/10" : "border-[#18211f]/10"}`}><span>ML / CV / VOICE AI</span><span>EST. 2024</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}