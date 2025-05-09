import React from "react";
import { Pagination } from "antd";

const ProductPagination = ({ pagination, handlePageChange }) => {
  return (
    <Pagination
      current={pagination._page}
      pageSize={pagination._limit}
      total={pagination._totalRows}
      onChange={handlePageChange}
      showSizeChanger={false}
      hideOnSinglePage={true}
      className="custom-pagination"
      itemRender={(page, type, originalElement) => {
        if (type === "page") {
          return (
            <div
              className={`pagination-item ${
                pagination._page === page
                  ? "pagination-item-active bg-blue-600 text-white"
                  : "hover:bg-blue-100"
              }`}
            >
              {page}
            </div>
          );
        }
        if (type === "prev" || type === "next") {
          return <div className="pagination-nav-button">{originalElement}</div>;
        }
        return originalElement;
      }}
    />
  );
};

export default ProductPagination;
