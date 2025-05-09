import React from "react";
import { Col } from "antd";

function CatergoryCard({ catergory, onFilter }) {
  return (
    <Col span={4}>
      <div
        className="ring-1 shadow-md rounded-lg ring-gray-200 hover:ring-blue-500 flex flex-col items-center justify-center h-32 p-3 space-y-2 hover:text-blue-600 hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer bg-white"
        onClick={() =>
          onFilter((prev) => {
            return { ...prev, category: catergory.id };
          })
        }
        title={catergory.name}
      >
        <div className="flex justify-center items-center">
          <img
            src={catergory.image}
            alt={catergory.name}
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="text-center w-full">
          <span
            className="font-semibold text-gray-800 block truncate text-sm max-w-full overflow-hidden whitespace-nowrap"
            title={catergory.name}
          >
            {catergory.name}
          </span>
        </div>
      </div>
    </Col>
  );
}

export default CatergoryCard;
