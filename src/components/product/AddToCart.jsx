import { ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";
import { useCart } from "../../contexts/CartContext";

function AddToCart({ item }) {
  const { addToCart } = useCart();

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
  }

  return (
    <div>
      <button
        type="button"
        className="bg-blue-600 text-white py-1 px-3 rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 hover:shadow-xl hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
        onClick={handleAddToCart}
      >
        <ShoppingCartOutlined className="mr-1" />
        <span className="text-sm font-medium">Thêm</span>
      </button>
    </div>
  );
}

export default AddToCart;
