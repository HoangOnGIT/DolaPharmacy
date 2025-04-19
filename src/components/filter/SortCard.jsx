import React from "react";

function SortCard({ sortObj, handleChangeSort, isActive }) {
  return (
    <div
      className={`cursor-pointer flex items-center justify-center border rounded-md py-1 px-3 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-blue-700 text-white border-blue-700"
          : "text-blue-700 border-blue-600 hover:text-white hover:bg-blue-700"
      }`}
      onClick={() => handleChangeSort(sortObj.sort_name, sortObj.order)}
    >
      {sortObj.name}
    </div>
  );
}

export default SortCard;
