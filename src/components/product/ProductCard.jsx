import React, { memo, useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AddToCart from "./AddToCart";

import { Skeleton, Space, Image } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import useNotification from "antd/es/notification/useNotification";

const ProductCard = ({
  product,
  isFavourited,
  handleAddToCart,
  handleToggleFav,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [api, context] = useNotification();

  function handleToggleFavourite(e) {
    e.stopPropagation();
    if (!isAuthenticated) {
      api.warning({
        message: "Không thể thêm sản phẩm yêu thích",
        description: "Hãy đăng nhập để thêm sản phẩm yêu thích.",
        duration: 1.5,
      });
      return;
    }
    handleToggleFav(product);
  }

  function handleClick() {
    navigate(`/product-detail/${product.id}`);
  }

  return (
    <div
      // href={`/product-detail/${product.id}`}
      className="col-span-1 rounded-lg ring-1 ring-gray-300 hover:ring-blue-500 h-[340px] relative shadow-md overflow-hidden transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-lg bg-white block"
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
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
      {context}

      {loading ? (
        <div className="w-full">
          <div className="flex items-center justify-center h-[200px]">
            <Skeleton.Image active style={{ width: 150, height: 150 }} />
          </div>
          <div className="px-3 py-2">
            <Skeleton active paragraph={{ rows: 1 }} title={{ width: "80%" }} />
            <Space direction="vertical" size={2} className="w-full">
              <Skeleton.Button
                active
                size="small"
                shape="round"
                block={false}
                style={{ width: 80 }}
              />
              <Skeleton.Button
                active
                size="small"
                shape="round"
                block={false}
                style={{ width: 60 }}
              />
            </Space>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center h-[200px]">
            <img
              src={product.images[0].url}
              alt={product.name}
              className="h-full object-contain hover:scale-110 transition-transform duration-500 ease-in-out"
              preview={false}
            />
          </div>

          <div className="flex flex-col justify-between px-3 py-2">
            <span className="text-[13px] font-semibold text-gray-800 ">
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
        </>
      )}

      {/* Hidden image to trigger loading state */}
      <img
        src={product.images[0].url}
        alt="preload"
        style={{ display: "none" }}
        preview={false}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

function BadgeDiscount({ discount }) {
  return (
    <div className="bg-red-600 text-white font-semibold rounded-md py-0.5 px-2">
      -{discount}
    </div>
  );
}

export default ProductCard;
