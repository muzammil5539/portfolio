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
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? "bg-ai-navy" : "bg-gray-50"
      }`}
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
          className={`fixed md:static top-0 left-0 z-40 md:z-10 h-full md:h-auto w-72 min-w-[220px] max-w-xs p-6 flex flex-col gap-8 transition-transform duration-300 backdrop-blur-lg ${
            isDarkMode
              ? "bg-ai-charcoal/95 border-r border-ai-slate/50"
              : "bg-white/95 border-r border-gray-200"
          } ${showLeftNav ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
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
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setShowLeftNav(false)}
            aria-label="Close navigation overlay"
          />
        )}

        {/* Main Content */}
        <main className={`flex-1 p-4 sm:p-8 md:p-12 overflow-y-auto min-h-[calc(100vh-80px)] ${
          isDarkMode ? "bg-ai-navy-light" : "bg-gray-50"
        }`}>
          {/* Background Elements */}
          <div className={`fixed inset-0 bg-grid-pattern bg-grid pointer-events-none ${
            isDarkMode ? "opacity-10" : "opacity-5"
          }`}></div>
          
          <section className="mb-14 relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className={`h-px w-8 bg-gradient-to-r from-transparent ${isDarkMode ? "to-ai-cyan" : "to-cyan-500"}`}></div>
              <span className={`text-sm font-medium tracking-wider uppercase ${isDarkMode ? "text-ai-cyan" : "text-cyan-600"}`}>
                Course {selectedCourseIdx + 1} of {data.courses.length}
              </span>
            </div>
            
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? "text-ai-text" : "text-gray-900"
            }`}>
              {selectedCourse.title}
            </h2>
            
            {selectedCourse.description && (
              <p className={`mb-8 text-lg md:text-xl max-w-3xl ${
                isDarkMode ? "text-ai-text-muted" : "text-gray-600"
              }`}>
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
          
          <div className={`mt-12 p-6 rounded-2xl border relative z-10 ${
            isDarkMode 
              ? "glass-card border-ai-slate/50" 
              : "bg-white border-gray-200 shadow-md"
          }`}>
            <p className={`text-lg ${isDarkMode ? "text-ai-text" : "text-gray-900"}`}>
              <span className={`font-semibold ${isDarkMode ? "text-ai-cyan" : "text-cyan-600"}`}>Reference:</span>
              <br />
              <Link
                href="https://www.coursera.org/programs/hec-pak-learning-program-j8ady/professional-certificates/ai-engineer?source=search"
                className={`inline-flex items-center gap-2 mt-2 transition-colors ${
                  isDarkMode 
                    ? "text-ai-cyan hover:text-ai-text" 
                    : "text-cyan-600 hover:text-cyan-800"
                }`}
                target="_blank"
              >
                IBM AI Engineer Professional Certificate on Coursera
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </p>
          </div>
        </main>

        {/* Right Modules Navigation */}
        <aside
          className={`fixed md:static top-0 right-0 z-40 md:z-10 h-full md:h-auto w-64 min-w-[180px] max-w-xs p-6 flex flex-col gap-4 transition-transform duration-300 backdrop-blur-lg ${
            isDarkMode
              ? "bg-ai-charcoal/95 border-l border-ai-slate/50"
              : "bg-white/95 border-l border-gray-200"
          } ${showRightNav ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}
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
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setShowRightNav(false)}
            aria-label="Close navigation overlay"
          />
        )}
      </div>
    </div>
  );
};

export default CertificationJourneyPage;
