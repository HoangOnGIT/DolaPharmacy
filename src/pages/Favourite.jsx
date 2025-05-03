import React from "react";
import { useFav } from "../contexts/FavouriteContext";
import { Typography, Row, Col, notification, Empty } from "antd";
import ProductCard from "../components/product/ProductCard";
import { useCart } from "../contexts/CartContext";
import { HeartOutlined } from "@ant-design/icons";

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
    <div className="py-12 px-6 bg-gradient-to-b from-blue-50 to-gray-100 ring-1 ring-gray-600 ">
      <div className="max-w-[1200px] mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="mb-10 text-center">
          <Title
            level={2}
            className="flex items-center justify-center gap-3"
            style={{ color: "#1890ff", marginBottom: "0.5rem" }}
          >
            <HeartOutlined style={{ fontSize: "1.5rem" }} /> Sản phẩm yêu thích
          </Title>
          <p className="text-gray-500">
            Danh sách các sản phẩm bạn đã đánh dấu yêu thích
          </p>
        </div>

        {contextHolder}

        {favList.items && favList.items.length > 0 ? (
          <Row gutter={[24, 32]}>
            {favList.items.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                <div className="h-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] rounded-lg overflow-hidden">
                  <ProductCard
                    product={item}
                    isFavourited={true}
                    handleToggleFav={handleToggleFav}
                    handleAddToCart={handleAddToCart}
                  />
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="py-16 bg-gray-50 rounded-lg">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="mt-4">
                  <p className="text-gray-600 font-medium text-lg mb-2">
                    Không có sản phẩm yêu thích nào
                  </p>
                  <p className="text-gray-500">
                    Hãy duyệt các sản phẩm và thêm vào danh sách yêu thích của
                    bạn
                  </p>
                </div>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Favourite;
