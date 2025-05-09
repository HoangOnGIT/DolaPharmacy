import React from "react";

function VariantCard({ variant, handleClickVari, active }) {
  return (
    <div
      className={` ring-blue-800 w-fit p-2 hover:ring-2 rounded-[5px] cursor-pointer ${
        active ? "bg-blue-600 text-white ring-3" : "ring-1"
      } `}
      onClick={() => handleClickVari(variant)}
    >
      <span>{variant.name}</span>
    </div>
  );
}

export default VariantCard;
