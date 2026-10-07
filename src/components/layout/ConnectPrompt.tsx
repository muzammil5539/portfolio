"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, X } from "lucide-react";

const DELAY_MS = 45_000;
const STORAGE_KEY = "connect-prompt-shown";

export default function ConnectPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Connect with me"
      className={`fixed bottom-6 right-6 z-40 w-[calc(100%-3rem)] max-w-sm rounded-2xl border p-5 shadow-depth-lg transition-all border-border bg-surface shadow-lg`}
    >
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className={`absolute top-3 right-3 rounded-md p-1 transition-colors text-text-muted hover:text-text-secondary`}
      >
        <X size={18} />
      </button>
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface-hover text-accent-blue`}
      >
        <MessageCircle size={20} />
      </div>
      <p className={`mb-1 font-semibold text-foreground`}>Still here?</p>
      <p className={`mb-4 text-sm leading-relaxed text-text-secondary`}>
        I&apos;d love to hear what you&apos;re working on &mdash; let&apos;s connect.
      </p>
      <Link
        href="#contact"
        onClick={() => setVisible(false)}
        className="btn-3d inline-flex w-full items-center justify-center px-4 py-2.5 text-sm"
      >
        Get in touch
      </Link>
    </div>
  );
}
