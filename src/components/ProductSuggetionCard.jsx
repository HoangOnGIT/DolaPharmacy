import React from "react";

function ProductSuggetionCard({ product }) {
  return (
    <div className="flex items-center text-[12px]">
      <img src={product.images[0].url} className="h-[80px] w-[80px] p-1"></img>
      <div className="w-full p-2 flex flex-col justify-around">
        <span>{product.name}</span>
        <span className="text-green-500">
          {product.salePrice
            ? parseFloat(product.salePrice).toFixed(0)
            : parseFloat(product.basePrice).toFixed(0)}
        </span>
        <span className="line-through">
          {product.salePrice ? parseFloat(product.basePrice).toFixed(2) : ""}
        </span>
      </div>
    </div>
  );
}

export default ProductSuggetionCard;
