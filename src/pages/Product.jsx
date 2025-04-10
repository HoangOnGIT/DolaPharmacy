import React, { useEffect, useState } from "react";
import CatergoryCard from "../components/CatergoryCard";
import { Row } from "antd";
import FilterContent from "../components/FilterContent";
import { SortAscendingOutlined } from "@ant-design/icons";
import ProductCard from "../components/ProductCard";
import queryString from "query-string";
import { Pagination } from "antd";

function Product() {
  const [catergories, setCatergories] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 16,
    _totalRows: 1,
  });

  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 16,
    status: "active",
  });

  const filterArr = [
    {
      title: "Chọn mức giá",
      options: [
        "Dưới 1 triệu",
        "1 triệu - 2 triệu",
        "2 triệu - 3 triệu",
        "3 triệu - 4 triệu",
        "4 triệu - 5 triệu",
        "5 triệu - 10 triệu",
        "10 triệu - 20 triệu",
        "20 triệu - 50 triệu",
        "Trên 50 triệu",
      ],
    },
    {
      title: "Thương hiệu",
      options: [
        "Dưới 1 triệu",
        "1 triệu - 2 triệu",
        "2 triệu - 3 triệu",
        "3 triệu - 4 triệu",
        "4 triệu - 5 triệu",
        "5 triệu - 10 triệu",
        "10 triệu - 20 triệu",
        "20 triệu - 50 triệu",
        "Trên 50 triệu",
      ],
    },
    {
      title: "Đối tượng",
      options: ["Nam", "Nữ", "Trẻ em", "Người cao tuổi", "Phụ nữ mang thai"],
    },
    {
      title: "Trọng lượng",
      options: [
        "Dưới 100g",
        "100g - 200g",
        "200g - 500g",
        "500g - 1kg",
        "Trên 1kg",
      ],
    },
  ];

  const sortArr = [
    "Tên A-Z",
    "Tên Z-A",
    "Hàng mới",
    "Giá thấp đến cao",
    "Giá cao xuống thấp",
  ];

  useEffect(() => {
    const params = queryString.stringify(filter);
    fetch("http://localhost:3000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCatergories(data);
      });
    fetch(`http://localhost:3000/api/products?${params}`)
      .then((res) => res.json())
      .then(({ body, pagination }) => {
        setProducts(body);
        setPagination(pagination);
      });
  }, [filter]);

  function handlePageChange(n) {
    setPagination({ ...pagination, _page: n });
    setFilter({ ...filter, _page: n });
  }

  return (
    <div
      style={{ width: "100%" }}
      className="flex items-center justify-center mt-10"
    >
      <div className="w-[70%]">
        <div className="catergory">
          <div className="mx-auto flex justify-center items-center space-x-3">
            <Row gutter={16}>
              {catergories &&
                catergories.map((catergory) => {
                  if (catergory.displayOrder <= 6) {
                    return (
                      <CatergoryCard
                        catergory={catergory}
                        onFilter={setFilter}
                        key={catergory.id}
                      />
                    );
                  }
                })}
            </Row>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_4fr] min-h-screen mt-10 gap-5">
          <div className="filter">
            <div>
              <div className="bg-blue-600 text-white px-3 py-2 rounded-[5px]">
                <span>Bộ lọc sản phẩm</span> <br></br>
                <span className="text-[12px]">
                  Giúp bạn tìm sản phẩm nhanh hơn
                </span>
              </div>
              <div className="flex flex-col space-y-3 mt-3">
                {filterArr &&
                  filterArr.map((filterObj, index) => (
                    <FilterContent filterObj={filterObj} key={index} />
                  ))}
              </div>
            </div>
          </div>
          <div className="product">
            <h1 className="text-[24px] font-semibold">Tất cả sản phẩm</h1>
            <div className="flex space-x-3 items-center mt-1">
              <SortAscendingOutlined /> <span>Xếp theo: </span>
              {sortArr &&
                sortArr.map((name, index) => (
                  <SortCard name={name} key={index} />
                ))}
            </div>
            <div className="grid grid-cols-4 gap-5 mt-5">
              {products &&
                products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
            </div>
            <div className="flex justify-center mt-8">
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
                            ? "pagination-item-active"
                            : ""
                        }`}
                      >
                        {page}
                      </div>
                    );
                  }
                  if (type === "prev" || type === "next") {
                    return (
                      <div className="pagination-nav-button">
                        {originalElement}
                      </div>
                    );
                  }
                  return originalElement;
                }}
              />
            </div>
            <style jsx>{`
              .custom-pagination .ant-pagination-item,
              .custom-pagination .ant-pagination-prev,
              .custom-pagination .ant-pagination-next {
                border-color: #2563eb;
                border-radius: 3px;
                transition: all 0.3s;
              }
              .custom-pagination .ant-pagination-item a {
                color: #2563eb;
              }
              .custom-pagination .ant-pagination-item:hover,
              .custom-pagination
                .ant-pagination-prev:hover
                .ant-pagination-item-link,
              .custom-pagination
                .ant-pagination-next:hover
                .ant-pagination-item-link {
                border-color: #2563eb;
                color: white;
                background-color: #2563eb;
              }
              .custom-pagination .ant-pagination-item:hover {
                background-color: #2563eb;
                border-color: #2563eb;
              }
              .custom-pagination .ant-pagination-item:hover a {
                color: white;
              }
              .custom-pagination .ant-pagination-item-active {
                background-color: #2563eb;
                border-color: #2563eb;
              }
              .custom-pagination .ant-pagination-item-active a {
                color: white;
              }
              .pagination-item {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
              }
              .pagination-item:hover {
                background-color: #2563eb;
                color: white;
              }
              .pagination-item-active {
                background-color: #2563eb;
                color: white;
              }
              .pagination-nav-button {
                color: #2563eb;
              }
              .pagination-nav-button:hover {
                color: white;
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
}

function SortCard({ name }) {
  return (
    <div
      className="flex items-center justify-center text-blue-800 ring-2 ring-blue-800 rounded-[3px] p-0.5 hover:text-white hover:bg-blue-800
    transition-all duration-300"
    >
      {name}
    </div>
  );
}

export default Product;
