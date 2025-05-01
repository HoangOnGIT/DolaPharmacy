import { Badge } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function ProductSuggetionCard({ product }) {
  const navigate = useNavigate();

  function handleClick() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    navigate(`/product-detail/${product.id}`);
  }

  function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }

  return (
    <div
      className="flex items-center text-[12px]"
      onClick={() => handleClick()}
    >
      <Badge.Ribbon
        text={product.discount ? `-${product.discount.value}%` : ""}
      >
        <div className="w-[80px] h-[80px]">
          <img
            src={product.images[0].url}
            className="h-[80px] w-[80px] p-1 object-cover"
          ></img>
        </div>{" "}
      </Badge.Ribbon>
      <div className="w-full p-2 flex flex-col justify-around">
        <span>{product.name}</span>
        <div className="space-x-3">
          <span className="text-green-500">
            {product.salePrice
              ? formatPrice(product.salePrice)
              : formatPrice(product.basePrice)}
          </span>
          <span className="line-through">
            {product.salePrice ? formatPrice(product.basePrice) : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductSuggetionCard;
