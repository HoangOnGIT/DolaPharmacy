import React, { createContext, useContext, useState, useEffect } from "react";
import queryString from "query-string";

const FilterContext = createContext();

export default function FilterProvider({ children }) {
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 16,
    _totalRows: 1,
  });

  const [branding, setBranding] = useState([]);
  const [products, setProducts] = useState([]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, _page: page }));
  };

  useEffect(() => {
    const params = queryString.stringify({
      _page: pagination._page,
      _limit: pagination._limit,
    });
    fetch(`http://localhost:3000/api/products?${params}`)
      .then((res) => res.json())
      .then(({ body, pagination }) => {
        setProducts(body);
        setPagination(pagination);

        if (pagination._page === 1) {
          const uniqueBrands = [
            ...new Set(body.map((product) => product.brand)),
          ];
          setBranding(uniqueBrands);
        }
      });
  }, [pagination]);

  return (
    <FilterContext.Provider
      value={{
        pagination,
        branding,
        products,
        handlePageChange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
