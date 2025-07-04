import React from "react";

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
}) => (
  <nav className="flex-1 flex flex-col gap-6">
    <div>
      <h3 className="text-lg font-extrabold text-blue-700 dark:text-blue-300 mb-4 uppercase tracking-wider">
        Courses
      </h3>
      <ul className="space-y-3">
        {courses.map((course, idx) => (
          <li key={course.title}>
            <button
              className={`w-full text-left px-5 py-3 rounded-xl font-bold transition-all duration-200 border-2 border-transparent group flex items-center gap-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                ${
                  idx === selectedCourseIdx
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-200 border-blue-400 dark:border-blue-700 scale-105 shadow-lg"
                    : "hover:bg-blue-50 dark:hover:bg-gray-800 text-blue-700 dark:text-blue-300 hover:border-blue-300 dark:hover:border-blue-700 hover:scale-105"
                }`}
              onClick={() => {
                setSelectedCourseIdx(idx);
                setActiveModuleIdx(null);
                setShowLeftNav(false);
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
);

export default CourseNav;
