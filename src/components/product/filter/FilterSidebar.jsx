import React from "react";
import FilterContent from "./FilterContent";
import SelectedFilter from "./SelectedFilter";

const FilterSidebar = ({
  filterArr,
  filter,
  handleChangeFilter,
  handleDeleteFilter,
  handleClearAllFilters,
}) => {
  // Check if any filters are applied
  const hasActiveFilters =
    filter.priceRange.length !== 0 ||
    filter.targeted.length !== 0 ||
    filter.weight.length !== 0 ||
    filter.brand.length !== 0;

  return (
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
              {hasActiveFilters ? (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">Bạn đã chọn</h3>
                    <button
                      onClick={handleClearAllFilters}
                      className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Xóa tất cả
                    </button>
                  </div>
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
  );
};

export default FilterSidebar;
