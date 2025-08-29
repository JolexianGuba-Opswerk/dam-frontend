import React from "react";
import { FcHighPriority } from "react-icons/fc";

const CustomError = ({
  error,
  onRetry,
  title = "Something went wrong",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg ${className}`}
    >
      <FcHighPriority className="text-4xl mb-3" />
      <h3 className="text-lg font-medium text-red-800 mb-2">{title}</h3>
      <p className="text-red-600 text-sm mb-4 text-center">
        {error?.message || "An unexpected error occurred"}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default CustomError;
