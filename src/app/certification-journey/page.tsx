"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import coursesData from "../../../public/courses_with_github_links.json";
import { useTheme } from "@/context/ThemeContext";
import CertificationHeader from "@/components/CertificationHeader";
import CourseNav from "@/components/CourseNav";
import ModuleNav from "@/components/ModuleNav";
import ModuleCard from "@/components/ModuleCard";
import PoweredBy from "@/components/PoweredBy";

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
  const { isDarkMode, toggleTheme } = useTheme();
  const [selectedCourseIdx, setSelectedCourseIdx] = useState(0);
  const [activeModuleIdx, setActiveModuleIdx] = useState<number | null>(null);
  const selectedCourse = data.courses[selectedCourseIdx];
  // Refs for module sections
  const moduleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [showRightNav, setShowRightNav] = useState(false);

  // Scroll to module when clicked in right nav
  const handleModuleClick = (idx: number) => {
    setActiveModuleIdx(idx);
    moduleRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    // On mobile, close right nav after click
    setShowRightNav(false);
  };

  return (
    <div
      className={
        `min-h-screen flex flex-col transition-colors duration-300 ` +
        (isDarkMode ? "bg-gray-900" : "bg-gray-50")
      }
    >
      <CertificationHeader
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        setShowLeftNav={setShowLeftNav}
        setShowRightNav={setShowRightNav}
      />

      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* Left Navigation */}
        <aside
          className={
            `fixed md:static top-0 left-0 z-40 md:z-10 h-full md:h-auto w-72 min-w-[220px] max-w-xs p-6 flex flex-col gap-8 shadow-xl transition-transform duration-300 bg-opacity-95 md:bg-opacity-100 ` +
            (isDarkMode
              ? "bg-gray-800/95 border-gray-700 border-r text-blue-200"
              : "bg-white/95 border-gray-200 border-r text-gray-800") +
            (showLeftNav
              ? " translate-x-0"
              : " -translate-x-full md:translate-x-0")
          }
          style={{ minHeight: "100vh" }}
        >
          <CourseNav
            courses={data.courses}
            selectedCourseIdx={selectedCourseIdx}
            setSelectedCourseIdx={setSelectedCourseIdx}
            setActiveModuleIdx={setActiveModuleIdx}
            setShowLeftNav={setShowLeftNav}
          />
          <PoweredBy />
        </aside>

        {/* Overlay for mobile nav */}
        {showLeftNav && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setShowLeftNav(false)}
            aria-label="Close navigation overlay"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 md:p-12 overflow-y-auto min-h-[calc(100vh-80px)]">
          <section className="mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-300 mb-4">
              {selectedCourse.title}
            </h2>
            {selectedCourse.description && (
              <p className="mb-4 text-gray-700 dark:text-blue-100/80 text-lg md:text-xl">
                {selectedCourse.description}
              </p>
            )}
            <div className="flex flex-col gap-8">
              {selectedCourse.modules.map((module, idx) => (
                <ModuleCard
                  key={module.name}
                  module={module}
                  idx={idx}
                  activeModuleIdx={activeModuleIdx}
                  moduleRef={(el) => {
                    moduleRefs.current[idx] = el;
                  }}
                />
              ))}
            </div>
          </section>
          <div className="mt-12 text-blue-700 dark:text-blue-300 text-lg">
            <p>
              Reference: <br />
              <Link
                href="https://www.coursera.org/programs/hec-pak-learning-program-j8ady/professional-certificates/ai-engineer?source=search"
                className="underline hover:text-blue-900 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
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
            `fixed md:static top-0 right-0 z-40 md:z-10 h-full md:h-auto w-64 min-w-[180px] max-w-xs p-6 flex flex-col gap-4 shadow-xl transition-transform duration-300 bg-opacity-95 md:bg-opacity-100 ` +
            (isDarkMode
              ? "bg-gray-800/95 border-gray-700 border-l text-blue-200"
              : "bg-white/95 border-gray-200 border-l text-gray-800") +
            (showRightNav
              ? " translate-x-0"
              : " translate-x-full md:translate-x-0")
          }
          style={{ minHeight: "100vh" }}
        >
          <ModuleNav
            modules={selectedCourse.modules}
            activeModuleIdx={activeModuleIdx}
            handleModuleClick={handleModuleClick}
          />
        </aside>

        {/* Overlay for mobile right nav */}
        {showRightNav && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setShowRightNav(false)}
            aria-label="Close navigation overlay"
          />
        )}
      </div>
    </div>
  );
};

export default CertificationJourneyPage;
