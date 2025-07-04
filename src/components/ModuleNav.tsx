import React from "react";

interface ModuleNavProps {
  modules: { name: string }[];
  activeModuleIdx: number | null;
  handleModuleClick: (idx: number) => void;
}

const ModuleNav: React.FC<ModuleNavProps> = ({
  modules,
  activeModuleIdx,
  handleModuleClick,
}) => (
  <div>
    <h4 className="text-lg font-extrabold text-blue-700 dark:text-blue-300 mb-4 uppercase tracking-wider">
      Modules
    </h4>
    <ul className="space-y-2 pl-2 border-l-2 border-blue-200 dark:border-blue-700">
      {modules.map((module, i) => (
        <li
          key={module.name}
          className={`text-blue-900 dark:text-blue-100 px-3 py-2 rounded-lg transition-all duration-150 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 cursor-pointer text-base md:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
            activeModuleIdx === i
              ? "bg-blue-100 dark:bg-blue-900 font-bold scale-105"
              : ""
          }`}
          onClick={() => handleModuleClick(i)}
          tabIndex={0}
          aria-label={`Go to module: ${module.name}`}
        >
          <span className="font-bold text-blue-700 dark:text-blue-300 mr-2">
            {i + 1}.
          </span>{" "}
          {module.name}
        </li>
      ))}
    </ul>
  </div>
);

export default ModuleNav;
