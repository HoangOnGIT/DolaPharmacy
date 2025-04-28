import { CloseOutlined } from "@ant-design/icons";
import React from "react";

function FilterCard({ content, queryParam, onDelete }) {
  return (
    <div className="bg-blue-100 text-blue-800 border border-blue-200 rounded-md py-1 px-2 text-xs flex items-center gap-1.5 hover:bg-blue-200 transition-all">
      <button
        className="text-blue-700 hover:text-blue-900 flex items-center"
        onClick={() => onDelete(queryParam, content)}
      >
        <CloseOutlined style={{ fontSize: "11px" }} />
      </button>
      <span className="font-medium">{content}</span>
    </div>
  );
}

export default FilterCard;
