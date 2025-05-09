import React from "react";
import { Row } from "antd";
import CatergoryCard from "./CatergoryCard";

const CategorySection = ({ categories, setFilter }) => {
  return (
    <div className="category-section mb-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700 pb-2 tracking-tight">
        Danh mục sản phẩm
      </h2>
      <div className="mx-auto flex justify-center items-center">
        <Row gutter={[24, 24]} className="w-full">
          {categories &&
            categories.map((category) => {
              if (category.displayOrder <= 6) {
                return (
                  <CatergoryCard
                    catergory={category}
                    onFilter={setFilter}
                    key={category.id}
                  />
                );
              }
              return null;
            })}
        </Row>
      </div>
    </div>
  );
};

export default CategorySection;
