import React from "react";
import { useFav } from "../contexts/FavouriteContext";
import { Typography, Row, Col } from "antd";
import ProductCard from "../components/product/ProductCard";

const { Title } = Typography;

function Favourite() {
  const { favList } = useFav();

  return (
    <div className="p-6 bg-gray-100  flex justify-center mt-20">
      <div className="w-[70%]">
        <Title level={2} className="text-center mb-6">
          Sản phẩm yêu thích
        </Title>
        {favList.items && favList.items.length > 0 ? (
          <Row gutter={[16, 16]}>
            {favList.items.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard product={item} /> {/* Render ProductCard */}
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            Không có sản phẩm yêu thích nào.
          </p>
        )}
      </div>
    </div>
  );
}

export default Favourite;
