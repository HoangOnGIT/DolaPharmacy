import React, { memo, useEffect, useState } from "react";
import { notification } from "antd";
import queryString from "query-string";
import { useSearchParams } from "react-router-dom";
import { useFav } from "../contexts/FavouriteContext";
import { useCart } from "../contexts/CartContext";

// Import new components
import ProductBreadcrumb from "../components/product/ProductBreadcrumb";
import CategorySection from "../components/product/CategorySection";
import FilterSidebar from "../components/product/filter/FilterSidebar";
import SortingHeader from "../components/product/SortingHeader";
import ProductGrid from "../components/product/ProductGrid";

const Product = ({ promotion = false }) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { favList, toggleFavourite } = useFav();
  const { addToCart } = useCart();
  const [catergories, setCatergories] = useState([]);
  const [branding, setBranding] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 16,
    _totalRows: 1,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  let initalFilter = {
    _page: 1,
    _limit: 16,
    status: "active",
    priceRange: [],
    brand: [],
    targeted: [],
    weight: [],
    categoryName: searchParams.get("categoryName") || "",
  };

  if (promotion) {
    initalFilter = {
      ...initalFilter,
      discount_ne: null,
    };
  }

  if (!initalFilter.categoryName) {
    delete initalFilter.categoryName;
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

  function handleClearAllFilters() {
    setFilter({
      ...initalFilter,
      _page: 1,
    });
    setActiveSort(null);
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

    if (item.variants) {
      addToCart({ ...item, variant: item.variants[0] });
    } else {
      addToCart(item);
    }

    api.success({
      message: "Thêm giỏ hàng thành công",
      description: `${item.name} được thêm vào giỏ hàng thành công!`,
      duration: 1.5,
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
  }, []);

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
  }, [filter]);

  // Update filter from URL params on initial load
  useEffect(() => {
    const urlSearchQuery = searchParams.get("q");
    if (urlSearchQuery && urlSearchQuery !== filter.q) {
      setFilter((prev) => ({ ...prev, q: urlSearchQuery }));
    }
  }, []);

  // Update search params when filter changes
  useEffect(() => {
    const params = queryString.stringify(filter);
    setSearchParams(params);
  }, [filter, setSearchParams]);

  const filterArr = [
    {
      title: "Chọn mức giá",
      options: [
        "Dưới 100.000đ",
        "100.000đ - 200.000đ",
        "200.000đ - 300.000đ",
        "300.000đ - 500.000đ",
        "Trên 500.000đ",
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
    <div className="bg-gradient-to-br from-blue-50 via-white to-gray-100 min-h-screen py-12">
      <div className="w-[70%] mx-auto px-4">
        {/* Breadcrumb */}
        <ProductBreadcrumb promotion={promotion} />

        {/* Categories */}
        <CategorySection categories={catergories} setFilter={setFilter} />

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Filter sidebar */}
          <FilterSidebar
            filterArr={filterArr}
            filter={filter}
            handleChangeFilter={handleChangeFilter}
            handleDeleteFilter={handleDeleteFilter}
            handleClearAllFilters={handleClearAllFilters}
          />

          {/* Context holder for notification */}
          {contextHolder}

          {/* Product section */}
          <div className="product-section">
            {/* Sorting header */}
            <SortingHeader
              sortArr={sortArr}
              handleChangeSort={handleChangeSort}
              activeSort={activeSort}
            />

            {/* Product grid */}
            <ProductGrid
              products={products}
              loading={loading}
              favList={favList}
              handleAddToCart={handleAddToCart}
              handleToggleFav={handleToggleFav}
              pagination={pagination}
              handlePageChange={handlePageChange}
              setFilter={setFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
