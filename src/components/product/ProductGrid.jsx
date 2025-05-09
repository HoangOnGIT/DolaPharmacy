import React from "react";
import ProductCard from "./ProductCard";
import LoadingComponent from "../common/Loading/LoadingCompoent";
import ProductPagination from "./ProductPagination";
import EmptyProducts from "./EmptyProducts";

const ProductGrid = ({
  products,
  loading,
  favList,
  handleAddToCart,
  handleToggleFav,
  pagination,
  handlePageChange,
  setFilter,
}) => {
  if (products && products.length > 0) {
    if (loading) {
      return (
        <div className="fade-in">
          <LoadingComponent />
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {products.map((product) => {
            let isFavourited = false;
            if (
              favList.items &&
              favList.items.find((favItem) => favItem.id === product.id)
            ) {
              isFavourited = true;
            }

            return (
              <div
                key={product.id}
                className="transition-transform hover:-translate-y-1 hover:shadow-xl rounded-xl bg-white border border-gray-100"
              >
                <ProductCard
                  product={product}
                  isFavourited={isFavourited}
                  handleAddToCart={handleAddToCart}
                  handleToggleFav={handleToggleFav}
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <ProductPagination
            pagination={pagination}
            handlePageChange={handlePageChange}
          />
        </div>
      </>
    );
  }

  return <EmptyProducts setFilter={setFilter} />;
};

export default ProductGrid;
