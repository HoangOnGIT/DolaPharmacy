import React from "react";

function LoadingComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-blue-500">
        Vui lòng chờ...
      </p>
    </div>
  );
}

export default LoadingComponent;
