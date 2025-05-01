import React, { memo, useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AddToCart from "./AddToCart";
import { useFav } from "../../contexts/FavouriteContext";

const ProductCard = memo(
  ({ product, isFavourited, handleAddToCart, handleToggleFav }) => {
    const navigate = useNavigate();

    function handleToggleFavourite(e) {
      e.stopPropagation();
      handleToggleFav(product);
    }

    function handleClick() {
      navigate(`/product-detail/${product.id}`);
    }

    return (
      <div
        className="col-span-1 rounded-lg ring-1 ring-gray-300 hover:ring-blue-500 h-[340px] relative shadow-md overflow-hidden transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-lg bg-white"
        onClick={() => handleClick()}
      >
        <div
          className="absolute top-2 right-2 text-red-500 cursor-pointer z-10"
          onClick={handleToggleFavourite}
        >
          {isFavourited ? <HeartFilled /> : <HeartOutlined />}
        </div>

        <div className="absolute top-2 left-2 z-10">
          {product.discount && product.discount.value && (
            <BadgeDiscount discount={`${product.discount.value}%`} />
          )}
        </div>

        <div className="absolute bottom-4 right-4 z-10">
          <AddToCart item={product} handleAddToCart={handleAddToCart} />
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
);

function BadgeDiscount({ discount }) {
  return <div className="bg-red-600 text-white py-0.5 px-2">-{discount}</div>;
}

export default ProductCard;
