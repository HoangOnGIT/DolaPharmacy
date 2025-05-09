import React from "react";
import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

function ProductActions({
  handleAddToCart,
  product,
  fav,
  handleFav,
  showModal,
}) {
  return (
    <div className="flex mt-6 gap-3">
      <button
        className="flex-1 flex items-center justify-center gap-3 bg-blue-600 hover:bg-green-500 !text-white font-bold text-base py-4 px-6 rounded-lg shadow-md transition-colors h-14"
        onClick={() => handleAddToCart(product)}
      >
        <ShoppingCartOutlined style={{ fontSize: "24px" }} />
        <div className="text-left">
          <span className="block">Thêm vào giỏ</span>
          <span className="text-xs opacity-90">Miễn phí giao hàng</span>
        </div>
      </button>
      <button
        className={`w-14 flex items-center justify-center rounded-lg shadow-md transition-colors py-4 px-6 h-14 ring-2 ring-blue-500 ${
          fav ? " hover:text-green-500" : " hover:text-green-500"
        }`}
        onClick={() => handleFav()}
      >
        {fav ? (
          <HeartFilled className="text-2xl" style={{ color: "red" }} />
        ) : (
          <HeartOutlined className="text-2xl" style={{ color: "blue" }} />
        )}
      </button>
      <button
        className="w-14 flex items-center justify-center rounded-lg shadow-md transition-colors py-4 px-6 h-14 ring-2 ring-blue-500 hover:text-green-500"
        onClick={showModal}
      >
        <InfoCircleOutlined className="text-2xl" style={{ color: "blue" }} />
      </button>
    </div>
  );
}

export default ProductActions;
