import { ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";
import { useCart } from "../../contexts/CartContext";

function AddToCart({ item, handleAddToCart }) {
  function onClickCart(e) {
    e.stopPropagation();
    handleAddToCart(item);
  }

  return (
    <div>
      <button
        type="button"
        className="bg-gradient-to-r from-blue-500 to-blue-700 !text-white py-2 px-4 rounded-lg flex items-center justify-center shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer font-medium"
        onClick={(e) => onClickCart(e)}
      >
        <ShoppingCartOutlined className="mr-2 text-lg" />
        <span className="text-sm font-medium">Thêm</span>
      </button>
    </div>
  );
}

export default AddToCart;
