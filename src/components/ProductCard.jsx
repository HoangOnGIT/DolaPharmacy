import React, { useState } from "react";
import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

function ProductCard({ product }) {
  const [isFavourited, setIsFavourited] = useState(false);

  function handleToggleFavourite() {
    setIsFavourited(!isFavourited);
  }

  return (
    <div className="col-span-1 rounded-[5px] ring-2 ring-gray-400 hover:ring-blue-700 h-[300px] relative shadow-xl overflow-hidden transition-all duration-500">
      <div className="absolute top-2 right-2 text-red-500 cursor-pointer">
        {isFavourited ? (
          <HeartFilled onClick={() => handleToggleFavourite()} />
        ) : (
          <HeartOutlined onClick={() => handleToggleFavourite()} />
        )}
      </div>

      <div className="absolute top-0 left-0">
        <BadgeDiscount discount={"5%"} />
      </div>

      <div className="absolute bottom-5 right-5">
        <AddToCart item={product} />
      </div>
      <div className="flex items-center justify-center">
        {" "}
        <img
          src={product.images[0].url}
          className="h-[200px] rounded-t-[5px] hover:scale-110 transition-all duration-500"
        />
      </div>

      <div className="flex flex-col justify-between px-1 mt-3">
        <span className="h-[18px] text-[15px]">{product.name}</span>
        <br></br>
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

function BadgeDiscount({ discount }) {
  return <div className="bg-red-600 text-white py-0.5 px-2">-{discount}</div>;
}

function AddToCart({ item }) {
  function handleAddToCart(item) {
    console.log(item);
    // Add logic to add the item to the cart here
  }

  return (
    <div
      className="bg-blue-800 text-white py-0.5 px-2 rounded-3xl h-[32px] w-[32px]"
      onClick={() => handleAddToCart(item)}
    >
      <ShoppingCartOutlined />
    </div>
  );
}

export default ProductCard;
