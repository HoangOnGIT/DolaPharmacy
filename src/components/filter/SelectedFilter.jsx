import React from "react";
import FilterCard from "./FilterCard";

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

export default SelectedFilter;
