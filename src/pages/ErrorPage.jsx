import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-b from-[#7fadff] to-[#0f62f9] p-6 text-white">
          <div className="flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-center">Rất tiếc!</h1>
        </div>

        <div className="p-6">
          <p className="text-lg text-gray-700 mb-4 text-center">
            Đã xảy ra lỗi không mong muốn.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <p className="text-blue-800 font-medium break-words">
              {error.statusText || error.message || "Lỗi không xác định"}
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              to="/"
              className="flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
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
                  d="M3 12l2-2m0 0l7-7 7 7m-7-7v14"
                />
              </svg>
              Trở về Trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
