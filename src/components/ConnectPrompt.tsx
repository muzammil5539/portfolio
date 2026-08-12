"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const DELAY_MS = 45_000;
const STORAGE_KEY = "connect-prompt-shown";

export default function ConnectPrompt() {
  const { isDarkMode } = useTheme();
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
      className={`fixed bottom-6 right-6 z-40 w-[calc(100%-3rem)] max-w-sm rounded-2xl border p-5 shadow-depth-lg transition-all ${
        isDarkMode ? "glass-card" : "border-gray-200 bg-white shadow-lg"
      }`}
    >
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className={`absolute top-3 right-3 rounded-md p-1 transition-colors ${
          isDarkMode ? "text-ai-text-dim hover:text-ai-text" : "text-gray-400 hover:text-gray-700"
        }`}
      >
        <X size={18} />
      </button>
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${
          isDarkMode ? "bg-ai-cyan/10 text-ai-cyan" : "bg-cyan-50 text-cyan-600"
        }`}
      >
        <MessageCircle size={20} />
      </div>
      <p className={`mb-1 font-semibold ${isDarkMode ? "text-ai-text" : "text-gray-900"}`}>Still here?</p>
      <p className={`mb-4 text-sm leading-relaxed ${isDarkMode ? "text-ai-text-muted" : "text-gray-600"}`}>
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
