import React from "react";
import { Link } from "react-router-dom";

const NewsSkeleton = () => (
  <div className="p-4 flex gap-3 animate-pulse">
    <div className="bg-gray-300 w-20 h-20 rounded-md overflow-hidden"></div>
    <div className="flex-1">
      <div className="bg-gray-300 h-4 w-full rounded mb-2"></div>
      <div className="bg-gray-300 h-4 w-3/4 rounded mb-2"></div>
      <div className="bg-gray-300 h-3 w-1/4 rounded"></div>
    </div>
  </div>
);

function NewsSection({ loading, latestNews }) {
  return (
    <div className="md:w-80 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-4 px-5 rounded-t-lg flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        <h2 className="text-xl font-semibold !m-0">Tin tức mới nhất</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {loading
          ? Array(5)
              .fill()
              .map((_, index) => <NewsSkeleton key={index} />)
          : latestNews.map((news) => (
              <Link
                key={news.id}
                to={`/news/${news.id}`}
                className="block transition-all duration-200 hover:bg-blue-50"
              >
                <div className="p-4 flex gap-4">
                  <div className="relative w-20 h-20 overflow-hidden rounded-md shadow-sm">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 line-clamp-2 hover:text-blue-700 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {news.date}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <Link
          to="/news"
          className="text-blue-700 font-medium hover:text-blue-800 flex items-center justify-center group transition-colors px-4 py-2 rounded-full hover:bg-blue-100"
        >
          Xem tất cả tin tức
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default NewsSection;
