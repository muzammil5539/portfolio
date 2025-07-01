"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import coursesData from "../../../public/courses_with_github_links.json";
import { useTheme } from "@/context/ThemeContext";

interface Lab {
  title: string;
  file: string;
  link: string;
}

interface Module {
  name: string;
  labs: Lab[];
  summary?: string;
}

interface Course {
  title: string;
  description?: string;
  modules: Module[];
}

interface SpecializationData {
  specialization: string;
  courses: Course[];
}

const data: SpecializationData = coursesData as SpecializationData;

const CertificationJourneyPage = () => {
  const { isDarkMode } = useTheme();
  const [selectedCourseIdx, setSelectedCourseIdx] = useState(0);
  const [activeModuleIdx, setActiveModuleIdx] = useState<number | null>(null);
  const selectedCourse = data.courses[selectedCourseIdx];
  // Refs for module sections
  const moduleRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to module when clicked in right nav
  const handleModuleClick = (idx: number) => {
    setActiveModuleIdx(idx);
    moduleRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      className={
        `min-h-screen flex flex-col transition-colors duration-300 ` +
        (isDarkMode
          ? "bg-gradient-to-br from-[#0F1E3D] via-[#1C3B6E] to-black"
          : "bg-gradient-to-br from-[#1C3B6E] via-[#0F1E3D] to-[#101010]")
      }
    >
      {/* Header */}
      <header
        className={
          `sticky top-0 z-30 w-full shadow-md border-b flex items-center justify-between px-8 py-4 ` +
          (isDarkMode
            ? "bg-[#0F1E3D]/95 border-[#1C3B6E]"
            : "bg-[#1C3B6E]/95 border-[#0F1E3D]")
        }
      >
        <div className="flex items-center gap-4">
          <svg
            className="w-8 h-8 text-blue-400 dark:text-blue-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14l6.16-3.422A12.083 12.083 0 0121 13.5c0 4.418-4.03 8-9 8s-9-3.582-9-8c0-1.61.586-3.105 1.84-4.422L12 14z"
            />
          </svg>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-black dark:text-white leading-tight">
              IBM AI Engineering Certification
            </h1>
            <span className="text-sm text-blue-300 dark:text-blue-200 font-medium tracking-wide">
              Professional Certificate Journey
            </span>
          </div>
        </div>
        <Link
          href="/"
          className="px-4 py-2 rounded-lg font-semibold bg-black text-blue-200 hover:bg-blue-900 dark:bg-black dark:hover:bg-blue-900 shadow transition-all border-2 border-blue-700 dark:border-blue-400"
        >
          ← Back to Portfolio
        </Link>
      </header>
      <div className="flex flex-1">
        {/* Left Navigation */}
        <aside
          className={
            `w-80 min-w-[220px] max-w-xs p-6 flex flex-col gap-8 shadow-xl relative z-10 h-screen sticky top-0 ` +
            (isDarkMode
              ? "bg-[#0F1E3D]/90 border-[#1C3B6E] border-r text-blue-200"
              : "bg-[#1C3B6E]/90 border-[#0F1E3D] border-r text-black")
          }
        >
          <nav className="flex-1 flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2 uppercase tracking-wider">
                Courses
              </h3>
              <ul className="space-y-2">
                {data.courses.map((course, idx) => (
                  <li key={course.title}>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition-all duration-200 border-2 border-transparent group flex items-center gap-2
                      ${
                        idx === selectedCourseIdx
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-200 border-blue-400 dark:border-blue-700 scale-105 shadow"
                          : "hover:bg-blue-50 dark:hover:bg-gray-800 text-blue-700 dark:text-blue-300 hover:border-blue-300 dark:hover:border-blue-700 hover:scale-105"
                      }`}
                      onClick={() => {
                        setSelectedCourseIdx(idx);
                        setActiveModuleIdx(null);
                      }}
                    >
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          idx === selectedCourseIdx
                            ? "bg-blue-700 dark:bg-blue-400"
                            : "bg-blue-300 dark:bg-blue-700"
                        }`}
                      ></span>
                      {course.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="mt-auto pt-6 border-t border-blue-100 dark:border-blue-800 text-xs text-blue-400 dark:text-blue-200 text-center">
            <span>
              Powered by{" "}
              <span className="text-blue-700 dark:text-blue-400 font-bold">
                AI
              </span>{" "}
              &amp;{" "}
              <span className="text-blue-700 dark:text-blue-400 font-bold">
                Next.js
              </span>
            </span>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto h-screen">
          <h1 className="text-4xl font-black mb-6 text-black dark:text-white tracking-tight">
            {data.specialization} Journey
          </h1>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">
              {selectedCourse.title}
            </h2>
            {selectedCourse.description && (
              <p className="mb-2 text-blue-900 dark:text-blue-100/80">
                {selectedCourse.description}
              </p>
            )}
            {selectedCourse.modules.map((module, idx) => (
              <div
                key={module.name}
                ref={(el) => {
                  moduleRefs.current[idx] = el;
                }}
                className={`mb-6 ml-4 border-l-4 border-blue-200 dark:border-blue-700 pl-4 bg-white/70 dark:bg-gray-900/60 rounded-lg shadow-sm py-2 ${
                  activeModuleIdx === idx
                    ? "ring-2 ring-blue-400 dark:ring-blue-500"
                    : ""
                }`}
              >
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-1">
                  {module.name}
                </h3>
                {module.summary && (
                  <p className="mb-2 text-blue-900 dark:text-blue-100/80">
                    {module.summary}
                  </p>
                )}
                <ul className="list-disc list-inside mb-2">
                  {module.labs.map((lab) => (
                    <li key={lab.title}>
                      <Link
                        href={lab.link}
                        className="text-blue-700 dark:text-blue-300 underline hover:text-blue-900 dark:hover:text-blue-400"
                        target="_blank"
                      >
                        {lab.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <div className="mt-10 text-blue-700 dark:text-blue-300">
            <p>
              Reference: <br />
              <Link
                href="https://www.coursera.org/programs/hec-pak-learning-program-j8ady/professional-certificates/ai-engineer?source=search"
                className="underline"
                target="_blank"
              >
                IBM AI Engineer Professional Certificate on Coursera
              </Link>
            </p>
          </div>
        </main>
        {/* Right Modules Navigation */}
        <aside
          className={
            `w-72 min-w-[200px] max-w-xs p-6 flex flex-col gap-4 shadow-xl relative z-10 h-screen sticky top-0 ` +
            (isDarkMode
              ? "bg-[#0F1E3D]/90 border-[#1C3B6E] border-l text-blue-200"
              : "bg-[#1C3B6E]/90 border-[#0F1E3D] border-l text-black")
          }
        >
          <div>
            <h4 className="text-md font-semibold text-blue-700 dark:text-blue-300 mb-2 uppercase tracking-wider">
              Modules
            </h4>
            <ul className="space-y-1 pl-2 border-l-2 border-blue-200 dark:border-blue-700">
              {selectedCourse.modules.map((module, i) => (
                <li
                  key={module.name}
                  className={`text-blue-900 dark:text-blue-100 px-2 py-1 rounded transition-all duration-150 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 cursor-pointer ${
                    activeModuleIdx === i
                      ? "bg-blue-100 dark:bg-blue-900 font-bold"
                      : ""
                  }`}
                  onClick={() => handleModuleClick(i)}
                >
                  <span className="font-medium text-blue-700 dark:text-blue-300 mr-2">
                    {i + 1}.
                  </span>{" "}
                  {module.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CertificationJourneyPage;
