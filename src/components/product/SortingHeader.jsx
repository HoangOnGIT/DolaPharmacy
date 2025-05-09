import React from "react";
import { SortAscendingOutlined } from "@ant-design/icons";
import SortCard from "./filter/SortCard";

const SortingHeader = ({ sortArr, handleChangeSort, activeSort }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 border border-gray-100">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Tất cả sản phẩm</h1>
      <div className="flex flex-wrap items-center gap-3 pb-2">
        <div className="flex items-center text-gray-600 mr-2">
          <SortAscendingOutlined className="mr-1" />
          <span>Xếp theo: </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sortArr &&
            sortArr.map((sortObj, index) => (
              <SortCard
                sortObj={sortObj}
                key={index}
                handleChangeSort={handleChangeSort}
                isActive={
                  activeSort &&
                  activeSort.sort_name === sortObj.sort_name &&
                  activeSort.order === sortObj.order
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SortingHeader;
