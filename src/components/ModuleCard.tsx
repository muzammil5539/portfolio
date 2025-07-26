import React from "react";
import Link from "next/link";

interface ModuleCardProps {
  module: {
    name: string;
    summary?: string;
    labs: { title: string; link: string }[];
  };
  idx: number;
  activeModuleIdx: number | null;
  moduleRef: (el: HTMLDivElement | null) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  idx,
  activeModuleIdx,
  moduleRef,
}) => (
  <div
    ref={moduleRef}
    className={`group relative ml-0 sm:ml-4 border-l-0 sm:border-l-4 pl-0 sm:pl-6 rounded-xl transition-all duration-300 ease-out ${
      activeModuleIdx === idx
        ? "border-blue-500 dark:border-blue-400 bg-gradient-to-br from-blue-50 via-white to-blue-50/50 dark:from-blue-950/30 dark:via-gray-800 dark:to-blue-950/20 ring-1 ring-blue-400 dark:ring-blue-500 shadow-lg shadow-blue-200/30 dark:shadow-blue-900/30"
        : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gradient-to-br hover:from-blue-50/20 hover:via-white hover:to-blue-50/10 dark:hover:from-gray-700 dark:hover:via-gray-750 dark:hover:to-gray-800 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 shadow-sm"
    }`}
    tabIndex={0}
    aria-label={`Module: ${module.name}`}
    style={{
      paddingTop: "1.5rem",
      paddingBottom: "1.5rem",
      paddingLeft: "clamp(0.75rem, 4vw, 2rem)",
      paddingRight: "clamp(0.75rem, 4vw, 2rem)",
    }}
  >
    {/* Subtle tech accent for active state */}
    {activeModuleIdx === idx && (
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-transparent to-purple-500/3 dark:from-blue-400/5 dark:via-transparent dark:to-purple-400/5 rounded-xl pointer-events-none" />
    )}

    {/* Content */}
    <div className="relative z-10">
      {/* Module Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
          {module.name}
        </h3>
        <div
          className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
            activeModuleIdx === idx
              ? "bg-blue-500 dark:bg-blue-400 text-white dark:text-gray-900 shadow-lg"
              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 group-hover:text-blue-600 dark:group-hover:text-blue-300"
          }`}
        >
          {idx + 1}
        </div>
      </div>

      {/* Module Summary */}
      {module.summary && (
        <div className="mb-6 p-4 rounded-xl bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
            {module.summary}
          </p>
        </div>
      )}

      {/* Labs Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center">
          <div className={`w-5 h-5 mr-2 rounded ${activeModuleIdx === idx ? 'bg-blue-500/20' : 'bg-gray-200 dark:bg-gray-700'} flex items-center justify-center`}>
            <svg
              className="w-3 h-3 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          Labs & Exercises
        </h4>

        <div className="grid gap-2">
          {module.labs.map((lab, labIdx) => (
            <Link
              key={lab.title}
              href={lab.link}
              target="_blank"
              className="group/lab flex items-center p-3 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-bold mr-3 group-hover/lab:bg-blue-500 group-hover/lab:text-white dark:group-hover/lab:bg-blue-400 dark:group-hover/lab:text-gray-900 transition-all duration-300">
                {labIdx + 1}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-gray-800 dark:text-gray-200 font-medium text-sm md:text-base group-hover/lab:text-blue-700 dark:group-hover/lab:text-blue-300 transition-colors duration-300 truncate">
                  {lab.title.replace(/\.ipynb$/, "")}
                </p>
              </div>

              <svg
                className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover/lab:text-blue-500 dark:group-hover/lab:text-blue-400 transition-all duration-300 transform group-hover/lab:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ModuleCard;
