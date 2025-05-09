import React from "react";

const EmptyProducts = ({ setFilter }) => {
  const handleResetFilter = () => {
    setFilter({
      _page: 1,
      _limit: 16,
      status: "active",
      priceRange: [],
      brand: [],
      targeted: [],
      weight: [],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <svg
        className="w-20 h-20 text-gray-300 mb-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Không tìm thấy sản phẩm nào
      </h3>
      <p className="text-gray-500 text-center mb-4">
        Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm của bạn.
      </p>
      <button
        onClick={handleResetFilter}
        className="px-5 py-2 bg-blue-600 !text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Xóa bộ lọc
      </button>
    </div>
  );
};

export default EmptyProducts;
