"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface CourseNavProps {
  courses: { title: string }[];
  selectedCourseIdx: number;
  setSelectedCourseIdx: (idx: number) => void;
  setActiveModuleIdx: (idx: number | null) => void;
  setShowLeftNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const CourseNav: React.FC<CourseNavProps> = ({
  courses,
  selectedCourseIdx,
  setSelectedCourseIdx,
  setActiveModuleIdx,
  setShowLeftNav,
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <nav className="flex-1 flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-ai-cyan" : "bg-cyan-500"}`}></div>
          <h3 className={`text-lg font-bold uppercase tracking-wider ${
            isDarkMode ? "text-ai-text" : "text-gray-900"
          }`}>
            Courses
          </h3>
        </div>
        <ul className="space-y-2">
          {courses.map((course, idx) => (
            <li key={course.title}>
              <button
                className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-200 border-2 flex items-center gap-3 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  idx === selectedCourseIdx
                    ? isDarkMode
                      ? "bg-ai-charcoal text-ai-cyan border-ai-cyan/50 shadow-glow-cyan"
                      : "bg-cyan-50 text-cyan-700 border-cyan-400 shadow-md"
                    : isDarkMode
                      ? "bg-transparent text-ai-text-muted border-transparent hover:text-ai-text hover:bg-ai-charcoal/50 hover:border-ai-slate/50"
                      : "bg-transparent text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50 hover:border-gray-200"
                } ${isDarkMode ? "focus:ring-ai-cyan" : "focus:ring-cyan-400"}`}
                onClick={() => {
                  setSelectedCourseIdx(idx);
                  setActiveModuleIdx(null);
                  setShowLeftNav(false);
                }}
              >
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold ${
                    idx === selectedCourseIdx
                      ? isDarkMode
                        ? "bg-ai-cyan text-ai-navy"
                        : "bg-cyan-500 text-white"
                      : isDarkMode
                        ? "bg-ai-slate text-ai-text-muted"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {idx + 1}
                </span>
                <span className="flex-1 truncate">{course.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default CourseNav;
