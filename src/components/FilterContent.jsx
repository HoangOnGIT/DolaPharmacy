import { Card } from "antd";
import React from "react";
import "./FilterContent.css"; // Import custom CSS for scrollbar

function FilterContent({ filterObj }) {
  return (
    <div className="ring-1 ring-blue-800 rounded-[5px] ">
      <div className="card__header bg-blue-800 font-semibold text-white text-[13px] p-2">
        <span>{filterObj.title}</span>
      </div>
      <div className="h-50 px-3 py-1 overflow-y-auto custom-scrollbar text-[13px] ">
        <ul className="list-none space-y-1.5">
          {filterObj.options &&
            filterObj.options.map((option, index) => (
              <li className="flex items-center space-x-2" key={index}>
                <input type="checkbox" name="" id={index} />
                <label htmlFor={index}>{option}</label>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default FilterContent;
