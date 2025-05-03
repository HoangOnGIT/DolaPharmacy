import React, { memo, useEffect, useState } from "react";
import CatergoryCard from "../components/catergory/CatergoryCard";
import { Breadcrumb, notification, Row } from "antd";
import FilterContent from "../components/filter/FilterContent";
import { SortAscendingOutlined } from "@ant-design/icons";
import ProductCard from "../components/product/ProductCard";
import queryString from "query-string";
import { Pagination } from "antd";
import LoadingComponent from "../components/common/Loading/LoadingCompoent";
import SelectedFilter from "../components/filter/SelectedFilter";
import SortCard from "../components/filter/SortCard";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useFav } from "../contexts/FavouriteContext";
import { useCart } from "../contexts/CartContext";

const Product = ({ promotion = false }) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { favList } = useFav();
  const { toggleFavourite } = useFav();
  const { addToCart } = useCart();
  const [catergories, setCatergories] = useState([]);
  const [branding, setBranding] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 16,
    _totalRows: 1,
  });

  let initalFilter = {
    _page: 1,
    _limit: 16,
    status: "active",
    priceRange: [],
    brand: [],
    targeted: [],
    weight: [],
  };

  if (promotion) {
    initalFilter = {
      ...initalFilter,
      discount_ne: null,
    };
  }

  const [filter, setFilter] = useState(initalFilter);

  const [activeSort, setActiveSort] = useState(null);
  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  function handleChangeFilter(e, queryParam) {
    setFilter({ ...filter, [queryParam]: e });
  }

  function handleChangeSort(name, order) {
    setFilter({ ...filter, _sort: name, _order: order, _page: 1 });
    setActiveSort({ sort_name: name, order: order });
  }

  function handleDeleteFilter(queryParam, content) {
    setFilter((prevFilter) => {
      const updatedQueryParam = prevFilter[queryParam].filter(
        (item) => item !== content
      );
      return {
        ...prevFilter,
        [queryParam]: updatedQueryParam,
      };
    });
  }

  function handlePageChange(n) {
    setPagination({ ...pagination, _page: n });
    setFilter({ ...filter, _page: n });
  }

  function handleAddToCart(item) {
    if (!item || !item.name) {
      alert("Không thể thêm vào giỏ hàng!");
      return;
    }

    if (item.variant) {
      addToCart(item);
    } else {
      addToCart(item);
    }

    api.success({
      message: "Thêm giỏ hàng thành công",
      description: `${item.name} được thêm vào giỏ hàng thành công!`,
      duration: 2,
    });
  }

  function handleToggleFav(item) {
    if (!item || !item.name) {
      console.error("Invalid item passed to handleAddToCart:", item);
      return;
    }
    toggleFavourite(item);
  }

  useEffect(() => {
    fetch(BASE_URL + "/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCatergories(data);
      });
  }, []); // Fetch categories only once on component mount

  useEffect(() => {
    fetch(BASE_URL + "/api/brands")
      .then((res) => res.json())
      .then((data) => {
        setBranding(data);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = queryString.stringify(filter);

    fetch(`${BASE_URL}/api/products?${params}`)
      .then((res) => res.json())
      .then(({ body, pagination }) => {
        setProducts(body);
        setPagination(pagination);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [filter]); // Fetch products whenever the filter changes

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

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = queryString.stringify(filter);
    setSearchParams(params); // This updates the URL query parameters
  }, [filter]);

  console.log("BASE URL:", import.meta.env.VITE_API_BASE_URL);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-gray-100 min-h-screen py-12">
      <div className="w-4/5 mx-auto px-4">
        {promotion ? (
          <Breadcrumb
            style={{ marginBottom: 28 }}
            items={[
              { title: "Trang chủ", href: "/" },
              { title: "Sản phẩm khuyến mãi" },
            ]}
          />
        ) : (
          <Breadcrumb
            style={{ marginBottom: 28 }}
            items={[{ title: "Trang chủ", href: "/" }, { title: "Sản phẩm" }]}
          />
        )}

        <div className="category-section mb-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-700 pb-2 tracking-tight">
            Danh mục sản phẩm
          </h2>
          <div className="mx-auto flex justify-center items-center">
            <Row gutter={[24, 24]} className="w-full">
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

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Filter sidebar */}
          <div className="filter-sidebar">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-blue-600 text-white px-6 py-4">
                <span className="font-semibold text-lg">Bộ lọc sản phẩm</span>
                <p className="text-sm opacity-90 mt-0.5 !mb-0">
                  Giúp bạn tìm sản phẩm nhanh hơn
                </p>
              </div>

              <div className="p-6">
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

                    <div className="space-y-7">
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
          {/* context holder for notification */}
          {contextHolder}
          {/* Product grid */}
          <div className="product-section">
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 border border-gray-100">
              <h1 className="text-2xl font-bold text-blue-800 mb-4">
                Tất cả sản phẩm
              </h1>
              <div className="flex flex-wrap items-center gap-3 pb-2">
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
              loading ? (
                <div className="fade-in">
                  <LoadingComponent />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {products.map((product) => {
                      let isFavourited = false;
                      if (
                        favList.items &&
                        favList.items.find(
                          (favItem) => favItem.id === product.id
                        )
                      ) {
                        isFavourited = true;
                      }

                      return (
                        <div className="transition-transform hover:-translate-y-1 hover:shadow-xl rounded-xl bg-white border border-gray-100">
                          <ProductCard
                            product={product}
                            key={product.id}
                            isFavourited={isFavourited}
                            handleAddToCart={handleAddToCart}
                            handleToggleFav={handleToggleFav}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center mt-10">
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
              )
            ) : (
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
                  className="px-5 py-2 bg-blue-600 !text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
