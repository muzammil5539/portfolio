import React from "react";

const PoweredBy: React.FC = () => (
  <div className="mt-auto pt-6 border-t border-blue-200/30 dark:border-blue-700/30 text-xs text-center">
    <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
      <span>Powered by</span>
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        <span className="text-blue-600 dark:text-blue-400 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI
        </span>
      </div>
      <span>&</span>
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-gray-800 dark:bg-white rounded-full"></div>
        <span className="text-gray-800 dark:text-white font-semibold">
          Next.js
        </span>
      </div>
    </div>
  </div>
);

export default PoweredBy;
