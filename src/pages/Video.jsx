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
      image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      title: "Có cần xét nghiệm trước khi tiêm HPV hay không?",
      date: "18/07/2023",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 3,
      title: "Trước và sau khi tiêm vắc xin cơ thể cần gì, nên ăn gì?",
      date: "18/07/2023",
      image: "https://images.unsplash.com/photo-1536064479547-7ee40b74b807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 4,
      title: "Phân khác các loại thuốc trị lạc đông tiền hiệu quả",
      date: "18/07/2023",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 5,
      title: "Người bị u xơ tuyến giáp có uống được collagen không?",
      date: "18/07/2023",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
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
  
          {/* Sidebar area */}
          <div className="md:w-80 bg-white rounded-lg shadow-md">
            <div className="bg-blue-800 text-white py-3 px-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Tin tức mới nhất</h2>
            </div>
            <div className="divide-y">
              {latestNews.map((news) => (
                <Link key={news.id} to={`/news/${news.id}`} className="block hover:bg-blue-50 transition-colors">
                  <div className="p-4 flex gap-3">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800 line-clamp-2">{news.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{news.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="p-4 border-t">
              <Link 
                to="/news" 
                className="text-blue-800 font-medium hover:text-blue-600 flex items-center justify-center"
              >
                Xem tất cả tin tức
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
