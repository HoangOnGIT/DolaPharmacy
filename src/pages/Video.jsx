import React from "react";
import VideoThumbNail from "../components/video/VideoThumbNail";
import { Link } from "react-router-dom";

function Video() {
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
    {
      url: "https://picsum.photos/id/653/200/150",
      title: "Hà Nội - Obito ft. VSTRA (rmx) | Remake",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744191734/H%C3%A0_N%E1%BB%99i_-_Obito_ft._VSTRA_rmx_Remake_xlvieb.mp4",
    },
    {
      url: "https://picsum.photos/id/143/200/150",
      title: "Hà Nội - Obito ft. VSTRA (rmx) | Remake",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744191734/H%C3%A0_N%E1%BB%99i_-_Obito_ft._VSTRA_rmx_Remake_xlvieb.mp4",
    },
  ];

  const latestNews = [
    {
      id: 1,
      title: "Trẻ em sau tiêm vắc xin bao lâu thì sốt?",
      date: "18/07/2023",
      image: "/images/news/vaccine.jpg",
    },
    {
      id: 2,
      title: "Có cần xét nghiệm trước khi tiêm HPV hay không?",
      date: "18/07/2023",
      image: "/images/news/hpv.jpg",
    },
    {
      id: 3,
      title: "Trước và sau khi tiêm vắc xin cơ thể cần gì, nên ăn gì?",
      date: "18/07/2023",
      image: "/images/news/vaccine-care.jpg",
    },
    {
      id: 4,
      title: "Phân khác các loại thuốc trị lạc đông tiền hiệu quả",
      date: "18/07/2023",
      image: "/images/news/medicine.jpg",
    },
    {
      id: 5,
      title: "Người bị u xơ tuyến giáp có uống được collagen không?",
      date: "18/07/2023",
      image: "/images/news/collagen.jpg",
    },
  ];

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main content area */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Video</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthVideos.map((video, index) => (
                <VideoThumbNail urlObj={video} key={index} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-72 lg:w-80 space-y-6">
            {/* Navigation Menu */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white px-4 py-3">
                <span className="font-medium text-lg">Danh mục tin tức</span>
              </div>
              <div>
                <Link
                  to="/"
                  className="block px-4 py-3 hover:bg-blue-50 transition-colors"
                >
                  Trang chủ
                </Link>
                <Link
                  to="/gioi-thieu"
                  className="block px-4 py-3 hover:bg-blue-50 transition-colors"
                >
                  Giới thiệu
                </Link>
                <div className="block px-4 py-3">
                  <div className="flex justify-between items-center cursor-pointer">
                    <span>Sản phẩm</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="block px-4 py-3">
                  <div className="flex justify-between items-center cursor-pointer">
                    <span>Tin tức</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <Link
                  to="/video"
                  className="block px-4 py-3 bg-blue-50 text-blue-600 font-medium"
                >
                  Video
                </Link>
                <Link
                  to="/cau-hoi-thuong-gap"
                  className="block px-4 py-3 hover:bg-blue-50 transition-colors"
                >
                  Câu hỏi thường gặp
                </Link>
                <Link
                  to="/lien-he"
                  className="block px-4 py-3 hover:bg-blue-50 transition-colors"
                >
                  Liên hệ
                </Link>
              </div>
            </div>

            {/* Latest News Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white px-4 py-3">
                <span className="font-medium text-lg">Tin mới nhất</span>
              </div>
              <div>
                {latestNews.map((news) => (
                  <div
                    key={news.id}
                    className="flex p-3 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0 mr-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm">
                        {news.id}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex">
                        <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden mr-3 flex-shrink-0">
                          <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                            {news.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {news.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
