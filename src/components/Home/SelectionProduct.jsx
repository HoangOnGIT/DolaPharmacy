import React, { useEffect, useState } from "react";
import img1 from "../../img/Header/BannerHealth6.png";
import img2 from "../../img/Header/BannerHealth7.png";
import img3 from "../../img/Header/imgSelection/Baby.png";
import img4 from "../../img/Header/imgSelection/MomAndBaby.png";
import img5 from "../../img/Header/imgSelection/Old.png";
import SingleProduct from "../common/SingleProduct";
import { Link } from "react-router-dom";
import queryString from "query-string";

const SelectionProduct = ({ name }) => {
  const [category, setCategory] = useState([]);
  const [active, setActive] = useState(null);
  const [products, setProducts] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const searchMost = [
    "Dầu cá",
    "Omega3",
    "Canxi",
    "Vitamin D",
    "Vitamin C",
    "Loãng xương",
    "Mệt mỏi",
    "Mất ngủ",
  ];


  useEffect(() => {
    fetch(`${BASE_URL}/api/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
        console.log(category);
        
        if (data && data.length > 0) {
          setActive(data[0].name);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  
  useEffect(() => {
    if (active) {
      console.log(
        `${BASE_URL}/api/products?${queryString.stringify({
          categoryName: active,
        })}`
      );
      
      fetch(`${BASE_URL}/api/products?${queryString.stringify({
          categoryName: active,
        })}`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    } else {
      setProducts([]);
    }
  }, [active]);

  const handleActive = (key) => {
    setActive(key);
  };

  console.log(products);

  return (
    <div className="my-14 px-4">
      <Link to="/product">
        <p className="hover:text-[#003cbf] cursor-pointer w-fit font-semibold text-3xl mb-6">
          {name}
        </p>
      </Link>

      <div className="grid grid-cols-5 gap-6">
        {/* Banner bên trái */}
        <div className="col-span-1 space-y-4">
          <a href="#">
            <img
              src={img1}
              alt=""
              className="w-full h-[600px] object-cover rounded-lg mb-4"
            />
          </a>
          <a href="#">
            <img
              src={img2}
              alt=""
              className="w-full h-[610px] object-cover rounded-lg"
            />
          </a>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="col-span-4">
          {/* Nút danh mục */}
          <div className="flex gap-3 mb-6">
            {category.slice(4, 6).map((item) => (
              <button
                key={item.id}
                onClick={() => handleActive(item.name)}
                className={`flex items-center px-4 py-4 rounded-sm cursor-pointer border border-blue-500 transition-colors  hover:bg-blue-600 hover:!text-white ${
                  active === item.name
                    ? "bg-blue-600 !text-white"
                    : "bg-white text-blue-600"
                }`}
              >
                <img
                  src={img3}
                  alt=""
                  className="w-[24px] h-[24px] object-cover rounded-full mr-2"
                />
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Lưới sản phẩm */}
          <div className="grid grid-cols-4 gap-20">
            {products.slice(0,8).map((product) => (
              <SingleProduct key={product.id} product={product} />
            ))}
          </div>

          {/* Nút xem tất cả */}
          <div className="flex justify-center my-6">
            <Link to="/product">
              <button className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-600 hover:!text-white transition cursor-pointer">
                Xem tất cả
              </button>
            </Link>
          </div>

          {/* Tìm kiếm nhiều nhất */}
          <div className="mt-6">
            <p className="text-lg font-medium mb-2">Tìm kiếm nhiều nhất:</p>
            <div className="flex flex-wrap gap-2">
              {searchMost.map((item, index) => (
                <button
                  key={index}
                  className="bg-blue-500 rounded-sm px-3 py-1 hover:bg-[#5dac46] cursor-pointer transition-colors duration-300"
                >
                  <span className="text-xs text-white">{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionProduct;
