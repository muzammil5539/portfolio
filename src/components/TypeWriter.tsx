"use client";
import { useState, useEffect } from "react";

const roles = [
  "AI Engineer",
  "Deep Learning Engineer", 
  "Machine Learning Engineer",
  "Computer Vision Engineer",
  "Data Science Engineer",
  "Data Analyst",
];

export default function TypeWriter() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentRole.substring(0, text.length + 1));
          if (text === currentRole) {
            setIsDeleting(true);
            setTimeout(() => {}, 1500); // Pause at complete word
          }
        } else {
          setText(currentRole.substring(0, text.length - 1));
          if (text === "") {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 150
    );

    return () => clearTimeout(timeout);
  }, [text, roleIndex, isDeleting]);

  return (
    <div className="relative inline-block">
      <span className="gradient-text text-glow font-bold">
        {text}
        <span className="animate-pulse text-cyan-400 ml-1">|</span>
      </span>
      
      {/* Holographic Effect */}
      <div className="absolute inset-0 gradient-text opacity-30 blur-sm pointer-events-none">
        {text}
      </div>
    </div>
  );
}