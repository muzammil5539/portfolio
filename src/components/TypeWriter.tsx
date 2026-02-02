"use client";
import { useState, useEffect } from "react";

const roles = [
  "AI Engineer",
  "Deep Learning Engineer", 
  "Machine Learning Engineer",
  "Computer Vision Engineer",
  "Data Science Engineer",
  "Biomedical AI Researcher",
];

export default function TypeWriter() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    if (!currentRole) return;
    
    const timeout = setTimeout(
      () => {
        if (isPaused) {
          setIsPaused(false);
          setIsDeleting(true);
          return;
        }

        if (!isDeleting) {
          setText(currentRole.substring(0, text.length + 1));
          if (text === currentRole) {
            setIsPaused(true);
          }
        } else {
          setText(currentRole.substring(0, text.length - 1));
          if (text === "") {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isPaused ? 2000 : isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [text, roleIndex, isDeleting, isPaused, roles]);

  return (
    <span className="relative">
      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
        {text}
      </span>
      <span className="ml-1 animate-pulse text-blue-500 font-normal">
        |
      </span>
    </span>
  );
}
