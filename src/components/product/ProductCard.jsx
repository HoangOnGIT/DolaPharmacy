import React, { useState } from "react";
import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [isFavourited, setIsFavourited] = useState(false);

  function handleToggleFavourite() {
    setIsFavourited(!isFavourited);
  }

  function handleClick() {
    navigate(`/product-detail/${product.id}`);
  }

  return (
    <div
      className="col-span-1 rounded-lg ring-1 ring-gray-300 hover:ring-blue-500 h-[340px] relative shadow-md overflow-hidden transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-lg bg-white"
      onClick={() => handleClick()}
    >
      <div className="absolute top-2 right-2 text-red-500 cursor-pointer z-10">
        {isFavourited ? (
          <HeartFilled onClick={() => handleToggleFavourite()} />
        ) : (
          <HeartOutlined onClick={() => handleToggleFavourite()} />
        )}
      </div>

      <div className="absolute top-2 left-2 z-10">
        {product.discount && product.discount.value && (
          <BadgeDiscount discount={`${product.discount.value}%`} />
        )}
      </div>

      <div className="absolute bottom-4 right-4 z-10">
        <AddToCart item={product} />
      </div>

      <div className="flex items-center justify-center bg-gray-100 h-[200px]">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="h-full object-contain hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </div>

      <div className="flex flex-col justify-between px-3 py-2">
        <span className="text-[15px] font-semibold text-gray-800 truncate">
          {product.name}
        </span>
        <div className="mt-1">
          <span className="text-green-600 text-[16px] font-bold">
            {product.salePrice
              ? new Intl.NumberFormat("vi-VN").format(
                  parseFloat(product.salePrice).toFixed(0)
                )
              : new Intl.NumberFormat("vi-VN").format(
                  parseFloat(product.basePrice).toFixed(0)
                )}
            <span className="text-[13px] font-medium ml-1">₫</span>
          </span>
          {product.salePrice && (
            <span className="block line-through text-[13px] text-gray-500">
              {new Intl.NumberFormat("vi-VN").format(
                parseFloat(product.basePrice).toFixed(0)
              )}
              <span className="text-xs">₫</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function BadgeDiscount({ discount }) {
  return <div className="bg-red-600 text-white py-0.5 px-2">-{discount}</div>;
}

function AddToCart({ item }) {
  const { addToCart } = useCart();

  async function handleAddToCart(e, item) {
    e.stopPropagation(); // Prevent event from bubbling up to parent
    addToCart(item);
  }

  return (
    <div
      className="bg-blue-600 text-white py-1 px-3 rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 hover:shadow-xl hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
      onClick={(e) => handleAddToCart(e, item)}
    >
      <ShoppingCartOutlined className="mr-1" />
      <span className="text-sm font-medium">Thêm</span>
    </div>
  );
}

export default ProductCard;
