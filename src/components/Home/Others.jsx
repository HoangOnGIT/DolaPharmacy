import React, { useEffect, useState } from "react";
import VideoThumbNail from "../video/VideoThumbNail";
import img1 from "../../img/Header/imgDataOthers/image1.png";
import img2 from "../../img/Header/imgDataOthers/image2.png";
import img3 from "../../img/Header/imgDataOthers/image3.png";
import img4 from "../../img/Header/imgDataOthers/image4.png";
import { Link } from "react-router-dom";

const Others = () => {
  const [dataCategory, setDataCategory] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const itemsPerPage = 8;
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const dataOthers = [
    {
      img: img1,
      title: "Miễn phí vận chuyển",
      desc: "Cho tất cả đơn hàng trong nội thành Hồ Chí Minh",
    },
    {
      img: img2,
      title: "Miễn phí đổi - trả",
      desc: "Đổi với sản phẩm lỗi sản xuất hoặc vận chuyển",
    },
    {
      img: img3,
      title: "Hỗ trợ nhanh chóng",
      desc: "Gọi Hotline: 19006750 để được hỗ trợ ngay lập tức",
    },
    {
      img: img4,
      title: "Ưu đãi thành viên",
      desc: "Đăng ký thành viên để được nhận nhiều khuyến mãi",
    },
  ];

  // Danh sách 4 video từ Video.jsx
  const healthVideos = [
    {
      url: "https://picsum.photos/id/237/200/150",
      title: "Hà Nội - Obito ft. VSTRA (rmx) | Remake",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744191734/H%C3%A0_N%E1%BB%99i_-_Obito_ft._VSTRA_rmx_Remake_xlvieb.mp4",
    },
    {
      url: "https://picsum.photos/id/239/200/150",
      title: "Falling behind // thought you wanted to dance - transition",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744194752/falling_behind_thought_you_wanted_to_dance_-_transition_ocnhgw.mp4",
    },
    {
      url: "https://picsum.photos/id/254/200/150",
      title: "Ngọt - LẦN CUỐI (đi bên em xót xa người ơi)",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744191734/H%C3%A0_N%E1%BB%99i_-_Obito_ft._VSTRA_rmx_Remake_xlvieb.mp4",
    },
    {
      url: "https://picsum.photos/id/241/200/150",
      title: "Hà Nội - Obito ft. VSTRA (rmx) | Remake",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744191734/H%C3%A0_N%E1%BB%99i_-_Obito_ft._VSTRA_rmx_Remake_xlvieb.mp4",
    },
  ];

  useEffect(() => {
    fetch(`${BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setDataCategory(data);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleCategoryNext = () => {
    if (categoryIndex + itemsPerPage < dataCategory.length) {
      setCategoryIndex(categoryIndex + 1);
    }
  };

  const handleCategoryPrev = () => {
    if (categoryIndex > 0) {
      setCategoryIndex(categoryIndex - 1);
    }
  };

  return (
    <>
      <div className="py-4">
        <div className="flex justify-between items-center my-10">
          <div>
            <Link to="product">
              <p className="hover:text-[#003cbf] cursor-pointer w-[300px] font-semibold text-3xl ">
                Sản phẩm nổi bật
              </p>
            </Link>
          </div>
        </div>
        <div className="relative w-full">
          <div className="overflow-hidden">
            <div
              className="flex flex-row items-center transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  categoryIndex * (100 / itemsPerPage)
                }%)`,
              }}
            >
              {dataCategory.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 flex flex-col items-center justify-center"
                  style={{ width: `${100 / itemsPerPage}%`, minWidth: "120px" }}
                >
                  <a href="#" className="flex flex-col items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain transition-transform duration-300 ease-in-out transform hover:scale-90"
                    />
                    <p
                      className="text-sm text-gray-700 mt-2 text-center leading-tight px-2"
                      style={{ minHeight: "2.5rem", maxWidth: "100px" }}
                    >
                      {item.name}
                    </p>
                  </a>
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
          {categoryIndex + itemsPerPage < dataCategory.length && (
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
      {/* Phần video */}
      <div>
        <div>
          <Link to="product">
            <p className="hover:text-[#003cbf] cursor-pointer w-[300px] font-semibold text-3xl ">
              Video
            </p>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthVideos.map((video, index) => (
            <VideoThumbNail urlObj={video} key={index} />
          ))}
        </div>
      </div>
      {/* Hỗ trợ */}
      <div className="flex justify-center items-center mt-20 gap-8 flex-wrap">
        {dataOthers.map((item, index) => (
          <div
            className="flex items-center text-left w-[23%] min-w-[220px] p-2"
            key={index}
          >
            <div className="mr-3">
              <img
                className="object-cover h-[40px] w-[40px]"
                src={item.img}
                alt={item.title}
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-800 mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-gray-900">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Others;
