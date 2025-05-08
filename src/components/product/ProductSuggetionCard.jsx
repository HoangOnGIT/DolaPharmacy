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
    <a
      href={`/product-detail/${product.id}`}
      className="flex items-center text-[14px] no-underline text-inherit cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
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
        <span className="mb-3 font-bold text-[14px]">{product.name}</span>
        <div className="space-x-3">
          <span className="text-green-500 text-[14px]">
            {product.salePrice
              ? formatPrice(product.salePrice)
              : formatPrice(product.basePrice)}
          </span>
          <span className="line-through text-[11px]">
            {product.salePrice ? formatPrice(product.basePrice) : ""}
          </span>
        </div>
      </div>
    </a>
  );
}

export default ProductSuggetionCard;
