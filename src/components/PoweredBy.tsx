import React from "react";

const PoweredBy: React.FC = () => (
  <div className="mt-auto pt-6 border-t border-blue-100 dark:border-blue-800 text-xs text-blue-400 dark:text-blue-200 text-center">
    <span>
      Powered by{" "}
      <span className="text-blue-700 dark:text-blue-400 font-bold">AI</span>{" "}
      &amp;{" "}
      <span className="text-blue-700 dark:text-blue-400 font-bold">
        Next.js
      </span>
    </span>
  </div>
);

export default PoweredBy;
