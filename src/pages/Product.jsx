import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Row, Pagination } from "antd";
import { SortAscendingOutlined } from "@ant-design/icons";
import queryString from "query-string";

import CatergoryCard from "../components/catergory/CatergoryCard";
import FilterContent from "../components/filter/FilterContent";
import SelectedFilter from "../components/filter/SelectedFilter";
import SortCard from "../components/filter/SortCard";
import ProductCard from "../components/product/ProductCard";
import LoadingComponent from "../components/common/Loading/LoadingCompoent";
import { useFav } from "../contexts/FavouriteContext";

const Product = () => {
  const { category } = useParams();
  const { favList } = useFav();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ _page: 1, _limit: 16, _totalRows: 0 });
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
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const filterOptions = [
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
      options: brands,
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

  const sortOptions = [
    { name: "Tên A-Z", order: "asc", sort_name: "name" },
    { name: "Tên Z-A", order: "desc", sort_name: "name" },
    { name: "Hàng mới", order: "desc", sort_name: "createdAt" },
    { name: "Giá thấp đến cao", order: "asc", sort_name: "salePrice" },
    { name: "Giá cao xuống thấp", order: "desc", sort_name: "salePrice" },
  ];

  const handleChangeFilter = (value, key) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
      _page: 1,
    }));
  };

  const handleChangeSort = (sortName, order) => {
    setFilter((prev) => ({
      ...prev,
      _sort: sortName,
      _order: order,
      _page: 1,
    }));
    setActiveSort({ sort_name: sortName, order });
  };

  const handleDeleteFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: prev[key].filter((item) => item !== value),
      _page: 1,
    }));
  };

  const handlePageChange = (page) => {
    setFilter((prev) => ({
      ...prev,
      _page: page,
    }));
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = queryString.stringify(filter);

    fetch(`http://localhost:3000/api/products?${params}`)
      .then((res) => res.json())
      .then(({ body, pagination }) => {
        setProducts(body);
        setPagination(pagination);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => {
    const params = queryString.stringify(filter);
    setSearchParams(params);
  }, [filter]);

  return (
    <div className="w-full flex justify-center my-10">
      <div className="w-[80%]">
        {/* CATEGORY */}
        <section className="bg-gray-50 py-10 mb-8">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Danh mục sản phẩm
          </h2>
          <Row gutter={[16, 16]}>
            {categories.map((cat) => (
              cat.displayOrder <= 6 && (
                <CatergoryCard
                  key={cat.id}
                  catergory={cat}
                  onFilter={setFilter}
                />
              )
            ))}
          </Row>
        </section>

        {/* FILTER + PRODUCT LIST */}
        <section className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* FILTER SIDEBAR */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="bg-blue-600 text-white px-4 py-3 rounded mb-4">
              <span className="font-medium text-lg">Bộ lọc sản phẩm</span>
              <p className="text-sm opacity-90 mt-0.5">
                Giúp bạn tìm sản phẩm nhanh hơn
              </p>
            </div>

            {(filter.priceRange.length > 0 ||
              filter.brand.length > 0 ||
              filter.targeted.length > 0 ||
              filter.weight.length > 0) && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Bạn đã chọn</h3>
                <SelectedFilter filter={filter} onDelete={handleDeleteFilter} />
              </div>
            )}

            <div className="space-y-6">
              {filterOptions.map((item, idx) => (
                <FilterContent
                  key={idx}
                  filterObj={item}
                  onChange={handleChangeFilter}
                  selected={filter}
                  filtering={filter[item.queryParam]}
                />
              ))}
            </div>
          </div>

          {/* PRODUCT CONTENT */}
          <div>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                Tất cả sản phẩm
              </h1>

              {/* Sort */}
              <div className="flex items-center gap-2 mb-4">
                <SortAscendingOutlined className="text-gray-600" />
                <span className="text-gray-600">Xếp theo:</span>
                <div className="flex gap-2 flex-wrap">
                  {sortOptions.map((sortItem, idx) => (
                    <SortCard
                      key={idx}
                      sortObj={sortItem}
                      handleChangeSort={handleChangeSort}
                      isActive={
                        activeSort &&
                        activeSort.sort_name === sortItem.sort_name &&
                        activeSort.order === sortItem.order
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Product grid */}
              {loading ? (
                <LoadingComponent />
              ) : products.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isFavourited={favList.items.some(
                          (favItem) => favItem.id === product.id
                        )}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center mt-8">
                    <Pagination
                      current={pagination._page}
                      pageSize={pagination._limit}
                      total={pagination._totalRows}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                      hideOnSinglePage
                      className="custom-pagination"
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm">
                  <h3 className="text-2xl font-medium text-gray-700 mb-2">
                    Không tìm thấy sản phẩm
                  </h3>
                  <p className="text-gray-500 mb-6 text-center">
                    Hãy thử thay đổi bộ lọc hoặc xóa bộ lọc hiện tại
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
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Product;
