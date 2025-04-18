import React, { useEffect, useState } from "react";
import CatergoryCard from "../components/catergory/CatergoryCard";
import { Row } from "antd";
import FilterContent from "../components/filter/FilterContent";
import { CloseOutlined, SortAscendingOutlined } from "@ant-design/icons";
import ProductCard from "../components/product/ProductCard";
import queryString from "query-string";
import { Pagination } from "antd";

function Product() {
  const [catergories, setCatergories] = useState([]);
  const [branding, setBranding] = useState([]);
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
    priceRange: [],
    brand: [],
    targeted: [],
    weight: [],
  });
  const [activeSort, setActiveSort] = useState(null);

  function handleChangeFilter(e, queryParam) {
    setFilter({ ...filter, [queryParam]: e });
  }

  function handleChangeSort(name, order) {
    setFilter({ ...filter, _sort: name, _order: order });
    setActiveSort({ sort_name: name, order: order });
  }

  function handleDeleteFilter(queryParam, content) {
    setFilter({
      ...filter,
      [queryParam]: filter[queryParam].filter((item) => item !== content),
    });
  }

  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCatergories(data);
      });
  }, []); // Fetch categories only once on component mount

  useEffect(() => {
    fetch("http://localhost:3000/api/brands")
      .then((res) => res.json())
      .then((data) => {
        setBranding(data);
      });
  }, []);

  useEffect(() => {
    const params = queryString.stringify(filter);

    console.log(`http://localhost:3000/api/products?${params}`);

    fetch(`http://localhost:3000/api/products?${params}`)
      .then((res) => res.json())
      .then(({ body, pagination }) => {
        setProducts(body);
        setPagination(pagination);
      });
  }, [filter]); // Fetch products whenever the filter changes

  function handlePageChange(n) {
    setPagination({ ...pagination, _page: n });
    setFilter({ ...filter, _page: n });
  }

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
      queryParam: "priceRange",
    },
    {
      title: "Thương hiệu",
      options: branding,
      queryParam: "brand",
    },
    {
      title: "Đối tượng",
      options: ["Nam", "Nữ", "Trẻ em", "Người cao tuổi", "Phụ nữ mang thai"],
      queryParam: "targeted",
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
      queryParam: "weight",
    },
  ];

  const sortArr = [
    { name: "Tên A-Z", order: "asc", sort_name: "name" },
    { name: "Tên Z-A", order: "desc", sort_name: "name" },
    { name: "Hàng mới", order: "desc", sort_name: "createdAt" },
    { name: "Giá thấp đến cao", order: "asc", sort_name: "salePrice" },
    { name: "Giá cao xuống thấp", order: "desc", sort_name: "salePrice" },
  ];

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="category-section mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 pb-2">
            Danh mục sản phẩm
          </h2>
          <div className="mx-auto flex justify-center items-center">
            <Row gutter={[16, 16]} className="w-full">
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

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Filter sidebar */}
          <div className="filter-sidebar">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-blue-600 text-white px-4 py-3">
                <span className="font-medium text-lg">Bộ lọc sản phẩm</span>
                <p className="text-sm opacity-90 mt-0.5">
                  Giúp bạn tìm sản phẩm nhanh hơn
                </p>
              </div>

              <div className="p-4">
                {filterArr && (
                  <>
                    {filter.priceRange.length !== 0 ||
                    filter.targeted.length !== 0 ||
                    filter.weight.length !== 0 ||
                    filter.brand.length !== 0 ? (
                      <div className="mb-4">
                        <h3 className="font-medium text-gray-700 mb-2">
                          Bạn đã chọn
                        </h3>
                        <SelectedFilter
                          filter={filter}
                          onDelete={handleDeleteFilter}
                        />
                      </div>
                    ) : null}

                    <div className="space-y-6">
                      {filterArr.map((filterObj, index) => (
                        <FilterContent
                          filterObj={filterObj}
                          onChange={handleChangeFilter}
                          selected={filter}
                          filtering={filter[filterObj.queryParam]}
                          key={index}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="product-section">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h1 className="text-2xl font-semibold text-gray-800 mb-3">
                Tất cả sản phẩm
              </h1>
              <div className="flex flex-wrap items-center gap-2 pb-2">
                <div className="flex items-center text-gray-600 mr-2">
                  <SortAscendingOutlined className="mr-1" />
                  <span>Xếp theo: </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sortArr &&
                    sortArr.map((sortObj, index) => (
                      <SortCard
                        sortObj={sortObj}
                        key={index}
                        handleChangeSort={handleChangeSort}
                        isActive={
                          activeSort &&
                          activeSort.sort_name === sortObj.sort_name &&
                          activeSort.order === sortObj.order
                        }
                      />
                    ))}
                </div>
              </div>
            </div>

            {products && products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
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
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg shadow-sm">
                <svg
                  className="w-16 h-16 text-gray-300 mb-4"
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
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Không tìm thấy sản phẩm nào
                </h3>
                <p className="text-gray-500 text-center mb-4">
                  Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm của bạn.
                </p>
                <button
                  onClick={() =>
                    setFilter({
                      _page: 1,
                      _limit: 16,
                      status: "active",
                      priceRange: [],
                      brand: [],
                      targeted: [],
                      weight: [],
                    })
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}

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

function SortCard({ sortObj, handleChangeSort, isActive }) {
  return (
    <div
      className={`cursor-pointer flex items-center justify-center border rounded-md py-1 px-3 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-blue-700 text-white border-blue-700"
          : "text-blue-700 border-blue-600 hover:text-white hover:bg-blue-700"
      }`}
      onClick={() => handleChangeSort(sortObj.sort_name, sortObj.order)}
    >
      {sortObj.name}
    </div>
  );
}

function SelectedFilter({ filter, onDelete }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filter.priceRange &&
        filter.priceRange.map((content, index) => (
          <FilterCard
            content={content}
            queryParam="priceRange"
            onDelete={onDelete}
            key={index}
          />
        ))}
      {filter.brand &&
        filter.brand.map((content, index) => (
          <FilterCard
            content={content}
            queryParam="brand"
            onDelete={onDelete}
            key={index}
          />
        ))}
      {filter.targeted &&
        filter.targeted.map((content, index) => (
          <FilterCard
            content={content}
            queryParam="targeted"
            onDelete={onDelete}
            key={index}
          />
        ))}
      {filter.weight &&
        filter.weight.map((content, index) => (
          <FilterCard
            content={content}
            queryParam="weight"
            onDelete={onDelete}
            key={index}
          />
        ))}
    </div>
  );
}

function FilterCard({ content, queryParam, onDelete }) {
  return (
    <div className="bg-blue-100 text-blue-800 border border-blue-200 rounded-md py-1 px-2 text-xs flex items-center gap-1.5 hover:bg-blue-200 transition-all">
      <button
        className="text-blue-700 hover:text-blue-900 flex items-center"
        onClick={() => onDelete(queryParam, content)}
      >
        <CloseOutlined style={{ fontSize: "11px" }} />
      </button>
      <span className="font-medium">{content}</span>
    </div>
  );
}

export default Product;
