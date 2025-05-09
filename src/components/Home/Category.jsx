import React, { useState } from "react";
import img1 from "../../img/Header/imgCategory/image1.png";
import img2 from "../../img/Header/imgCategory/image2.png";
import img3 from "../../img/Header/imgCategory/image3.png";
import img4 from "../../img/Header/imgCategory/image4.png";
import img5 from "../../img/Header/imgCategory/image5.png";
import img6 from "../../img/Header/imgCategory/image6.png";
import img7 from "../../img/Header/imgCategory/image7.png";
import img8 from "../../img/Header/imgCategory/image8.png";
import img9 from "../../img/Header/imgCategory/image9.png";
import img10 from "../../img/Header/imgCategory/image10.png";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import img1a from "../../img/Header/imgDiscount/image1.png";
import img2a from "../../img/Header/imgDiscount/image2.png";
import img3a from "../../img/Header/imgDiscount/image3.png";
import img4a from "../../img/Header/imgDiscount/image4.png";
import { Link } from "react-router-dom";

const Category = () => {
  const categories = [
    { name: "Quà Tặng Sức Khỏe", img: img1 },
    { name: "Thiết Bị Y Tế", img: img2 },
    { name: "Khuyến Mãi Hot", img: img3 },
    { name: "Vitamin & Khoáng Chất", img: img4 },
    { name: "Vitamin Cho U50+", img: img5 },
    { name: "Vitamin Cho Mẹ", img: img6 },
    { name: "Dưỡng Trắng Da", img: img7 },
    { name: "Ung Thư - Bướu", img: img8 },
    { name: "Tăng Cân", img: img9 },
    { name: "Giảm Cân", img: img10 },
  ];

  const discount = [
    {
      name: "DOLA10",
      desc: "Giảm 10.000đ giá trị đơn hàng",
      expiry: "1/1/2024",
      img: img1a,
      details: "Áp dụng cho tất cả đơn hàng từ 100.000đ. Mỗi tài khoản chỉ được sử dụng 1 lần. Không áp dụng đồng thời với các khuyến mãi khác.",
    },
    {
      name: "FREESHIP",
      desc: "Miễn phí vận chuyển",
      expiry: "Không thời hạn",
      img: img2a,
      details: "Áp dụng cho tất cả đơn hàng từ 200.000đ. Miễn phí vận chuyển tối đa 30.000đ. Áp dụng cho tất cả phương thức vận chuyển.",
    },
    {
      name: "DOLA20",
      desc: "Giảm 20.000đ giá trị đơn hàng",
      expiry: "1/1/2024",
      img: img3a,
      details: "Áp dụng cho tất cả đơn hàng từ 150.000đ. Mỗi tài khoản chỉ được sử dụng 1 lần. Không áp dụng đồng thời với các khuyến mãi khác.",
    },
    {
      name: "DOLA50K",
      desc: "Giảm 50.000đ giá trị đơn hàng",
      expiry: "1/1/2024",
      img: img4a,
      details: "Áp dụng cho tất cả đơn hàng từ 300.000đ. Mỗi tài khoản chỉ được sử dụng 1 lần. Không áp dụng đồng thời với các khuyến mãi khác.",
    },
  ];

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [discountIndex, setDiscountIndex] = useState(0);
  const [copiedStates, setCopiedStates] = useState({});
  const [modalInfo, setModalInfo] = useState(null);
  const itemsPerPage = 8;
  const discountItemsPerPage = 4;

  const handleCategoryNext = () => {
    if (categoryIndex + itemsPerPage < categories.length) {
      setCategoryIndex(categoryIndex + 1);
    }
  };

  const handleCategoryPrev = () => {
    if (categoryIndex > 0) {
      setCategoryIndex(categoryIndex - 1);
    }
  };

  const handleDiscountNext = () => {
    if (discountIndex + discountItemsPerPage < discount.length) {
      setDiscountIndex(discountIndex + 1);
    }
  };

  const handleDiscountPrev = () => {
    if (discountIndex > 0) {
      setDiscountIndex(discountIndex - 1);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedStates((prev) => ({ ...prev, [code]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [code]: false }));
    }, 2000); // Revert to "Sao chép" after 2 seconds
  };

  const openModal = (discountItem) => {
    setModalInfo(discountItem);
  };

  const closeModal = () => {
    setModalInfo(null);
  };

  return (
    <>
      {/* Category Section */}
      <div className="py-4">
        <div className="mb-10">
          <Link to="product">
            <p className="hover:text-[#003cbf] cursor-pointer w-[300px] font-semibold text-3xl ">
              Danh mục nổi bật
            </p>
          </Link>
        </div>
        <div className="relative w-full">
          <div className="overflow-hidden">
            <div
              className="flex flex-row items-center transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${categoryIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex flex-col items-center"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <Link className="flex flex-col items-center" to="product">
                    <img
                      src={category.img}
                      alt={category.name}
                      className="w-20 h-20 transition-transform duration-300 ease-in-out transform hover:scale-90"
                    />
                    <p className="text-base text-gray-700 mt-3 text-center">
                      {category.name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {categoryIndex > 0 && (
            <div className="absolute top-1/2 transform -translate-y-1/2 left-0">
              <button
                dir="ltr"
                onClick={handleCategoryPrev}
                className="group hover:bg-blue-500 transition-colors cursor-pointer rounded-full shadow-md bg-gray-200 py-4 px-1 rounded-s-lg"
              >
                <svg
                  className="w-6 h-6 text-gray-600 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          )}
          {categoryIndex + itemsPerPage < categories.length && (
            <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
              <button
                dir="rtl"
                onClick={handleCategoryNext}
                className="group hover:bg-blue-500 transition-colors cursor-pointer p-2 rounded-full shadow-md bg-gray-200 py-4 px-1 rounded-s-lg"
              >
                <svg
                  className="w-6 h-6 text-gray-600 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Discount Section */}
      <div className="py-4">
        <div className="relative w-full">
          <div className="overflow-hidden">
            <div
              className="flex flex-row transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${discountIndex * (100 / discountItemsPerPage)}%)`,
              }}
            >
              {discount.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: `${100 / discountItemsPerPage}%` }}
                >
                  <div className="relative flex items-center justify-between border-2 border-blue-500 rounded-lg p-3 bg-white shadow-md mx-1 coupon-notch">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.img}
                        alt="Discount icon"
                        className="w-10 h-10 object-contain"
                      />
                      <div>
                        <h3 className="text-base font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                        <p className="text-[10px] text-gray-500">
                          HSD: {item.expiry}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(item.name)}
                      className={`px-3 py-1 rounded-lg text-white transition-colors cursor-pointer ${
                        copiedStates[item.name]
                          ? "bg-green-600"
                          : "bg-blue-500 hover:bg-green-600"
                      }`}
                    >
                      <span className="text-white text-xs">
                        {copiedStates[item.name] ? "Đã lưu" : "Sao chép"}
                      </span>
                    </button>
                    <button 
                      className="absolute top-2 right-2 text-blue-500 cursor-pointer"
                      onClick={() => openModal(item)}
                    >
                      <InformationCircleIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {discountIndex > 0 && (
            <div className="absolute top-1/2 transform -translate-y-1/2 left-0">
              <button
                dir="ltr"
                onClick={handleDiscountPrev}
                className="group hover:bg-blue-500 transition-colors cursor-pointer p-2 rounded-full shadow-md bg-gray-200 py-4 px-1 rounded-s-lg"
              >
                <svg
                  className="w-6 h-6 group-hover:text-white text-[#0f62f9]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          )}
          {discountIndex + discountItemsPerPage < discount.length && (
            <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
              <button
                dir="rtl"
                onClick={handleDiscountNext}
                className="group hover:bg-blue-500 transition-colors cursor-pointer p-2 rounded-full shadow-md bg-gray-200 py-4 px-1 rounded-s-lg"
              >
                <svg
                  className="w-6 h-6 group-hover:text-white !text-[#0f62f9]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalInfo && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            <div className="flex items-center mb-4">
              <img src={modalInfo.img} alt="Discount icon" className="w-12 h-12 mr-4" />
              <div>
                <h3 className="text-xl font-bold text-blue-600">{modalInfo.name}</h3>
                <p className="text-sm text-gray-600">{modalInfo.desc}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Hạn sử dụng:</span>
                <span className="text-sm text-gray-800">{modalInfo.expiry}</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <h4 className="text-md font-semibold mb-2 text-gray-800">Điều kiện áp dụng:</h4>
              <p className="text-sm text-gray-600">{modalInfo.details}</p>
            </div>
            
            <button 
              onClick={() => {
                handleCopy(modalInfo.name);
                closeModal();
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-300 cursor-pointer"
            >
              Sử dụng ngay
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Category;