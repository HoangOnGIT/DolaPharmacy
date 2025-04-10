import React from "react";
import { Card } from "antd";
import { Col, Row } from "antd";
function CatergoryCard({ catergory, onFilter }) {
  return (
    <Col span={4}>
      <div
        className="ring-1 shadow-xl rounded-[5px] ring-gray-200 hover:ring-blue-700 flex h-25 px-2 space-x-3 hover:text-blue-700 hover:shadow-blue-300"
        onClick={() =>
          onFilter((prev) => {
            return { ...prev, category: catergory.id };
          })
        }
      >
        <div className="flex justify-center items-center">
          <img src={catergory.image} className="w-20 h-20" />
        </div>
        <div className="flex flex-col justify-around">
          <span className="font-semibold">{catergory.name}</span>
          <span className="text-blue-600">({5} sản phẩm)</span>
        </div>
      </div>
    </Col>
  );
}

export default CatergoryCard;
