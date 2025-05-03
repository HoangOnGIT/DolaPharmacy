import { Badge } from "antd";
import Paragraph from "antd/es/skeleton/Paragraph";
import React from "react";

function PaymentProduct({ product }) {
  function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }
  return (
    <div className="flex py-4 border-b border-gray-200">
      <div className="relative mr-4">
        <Badge
          count={`Số lượng: ${product.quantity}`}
          color="green"
          className="absolute top-0 right-0"
        >
          <img
            src={product.images[0].url}
            alt="Product"
            className="w-14 h-14 object-cover rounded"
          />
        </Badge>
      </div>

      <div className="w-full p-2 flex flex-col justify-around">
        <div className="flex justify-between items-center">
          <span>{product.name}</span>
        </div>
        <div className="space-x-3">
          <span>
            {product.salePrice
              ? formatPrice(product.salePrice)
              : formatPrice(product.basePrice)}
          </span>
        </div>
        <div className="mt-1 font-semibold text-green-600">
          Thành tiền:{" "}
          {formatPrice(
            product.quantity * (product.salePrice || product.basePrice)
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentProduct;
