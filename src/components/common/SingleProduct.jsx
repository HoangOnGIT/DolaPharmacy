import React from "react";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

const SingleProduct = ({ product }) => {
  const hasDiscount = product.discount && product.discount.value > 0;
  const discountedPrice = product.salePrice;
  return (
    <div className="bg-white rounded-lg shadow-md w-70 flex-shrink-0 p-4 flex flex-col items-center text-center relative cursor-pointer group">
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
          -{product.discount.value}%
        </div>
      )}
      {/* Favorite Button */}
      <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 focus:outline-none cursor-pointer">
        <HeartIcon className="h-5 w-5 text-[#ff0000]" />
      </button>
      {/* Product Image with Zoom Effect */}
      <div className="relative w-48 h-55 mb-4 mt-6 overflow-hidden rounded-lg">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-120"
        />
      </div>
      {/* Product Name with Fixed Height */}
      <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
        {product.name}
      </h3>
      {/* Pricing */}
      <div className="flex items-center justify-center mb-2">
        <span className="text-red-500 font-bold text-lg mr-6">
          {discountedPrice?.toLocaleString("vi-VN")}₫
        </span>
        {hasDiscount && (
          <span className="text-gray-500 line-through text-sm">
            {product.basePrice?.toLocaleString("vi-VN")}₫
          </span>
        )}
      </div>
      {/* Sold Count */}
      <p className="text-gray-600 text-sm mb-4 font-semibold">
        Đã bán {product.stock.total}
      </p>
      {/* Buy Button */}
      <button className="cursor-pointer bg-blue-500 hover:bg-[#5dac46] transition-colors duration-300 text-white font-bold py-2 px-4 rounded-lg flex items-center focus:outline-none justify-center">
        <ShoppingCartIcon
          className="h-5 w-5 inline-block mr-2"
          style={{ color: "white" }}
        />
        <span className="text-white">Mua</span>
      </button>
    </div>
  );
};

export default SingleProduct;
