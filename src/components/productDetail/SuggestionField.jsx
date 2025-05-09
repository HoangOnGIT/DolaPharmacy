import React from "react";
import ProductSuggetionCard from "../product/ProductSuggetionCard";

function SuggestionField({ title, list }) {
  return (
    <div className="ring-2 ring-blue-500 rounded-[5px] same-finding">
      <div className="bg-blue-600 text-white p-3 rounded-t-[5px]">{title}</div>
      <div className="product-suggestion space-y-5">
        {list &&
          list.map((item, index) => {
            if (index < 5)
              return <ProductSuggetionCard key={item.id} product={item} />;
          })}
      </div>
    </div>
  );
}

export default SuggestionField;
