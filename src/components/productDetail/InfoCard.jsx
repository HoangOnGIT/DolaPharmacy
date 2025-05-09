import React from "react";

function InfoCard({ title, content, iconPath }) {
  return (
    <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md border-2 border-blue-100">
      <div className="bg-blue-100 p-3 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={iconPath}
          />
        </svg>
      </div>
      <div>
        <h3 className="text-blue-700 font-semibold text-sm">{title}</h3>
        <p className="text-xs text-gray-600">{content}</p>
      </div>
    </div>
  );
}

export default InfoCard;
