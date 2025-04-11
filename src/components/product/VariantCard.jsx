import React from "react";

function VariantCard({ variant }) {
  return (
    <div className="ring-1 ring-blue-800 w-fit p-2 hover:ring-2 rounded-[5px]">
      <span>{variant.name}</span>
    </div>
  );
}

export default VariantCard;
