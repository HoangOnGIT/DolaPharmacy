import React from "react";
import { useFav } from "../contexts/FavouriteContext";
import { Typography, Row, Col, notification } from "antd";
import ProductCard from "../components/product/ProductCard";
import { useCart } from "../contexts/CartContext";

const { Title } = Typography;

function Favourite() {
  const { favList } = useFav();
  const { toggleFavourite } = useFav();
  const { addToCart } = useCart();
  const [api, contextHolder] = notification.useNotification();

  function handleToggleFav(item) {
    if (!item || !item.name) {
      console.error("Invalid item passed to handleAddToCart:", item);
      return;
    }
    const flag = toggleFavourite(item);
  }

  function handleAddToCart(item) {
    if (!item || !item.name) {
      alert("Không thể thêm vào giỏ hàng!");
      return;
    }

    addToCart(item);
    api.success({
      message: "Thêm giỏ hàng thành công",
      description: `${item.name} được thêm vào giỏ hàng thành công!`,
      duration: 2,
    });
  }

  return (
    <div className="p-6 bg-gray-100  flex justify-center mt-20">
      <div className="w-[70%]">
        <Title level={2} className="text-center mb-6">
          Sản phẩm yêu thích
        </Title>
        {contextHolder}
        {favList.items && favList.items.length > 0 ? (
          <Row gutter={[16, 16]}>
            {favList.items.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard
                  product={item}
                  isFavourited={true}
                  handleToggleFav={handleToggleFav}
                  handleAddToCart={handleAddToCart}
                />{" "}
                {/* Render ProductCard */}
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
