import React from "react";
import { Breadcrumb } from "antd";

const ProductBreadcrumb = ({ promotion }) => {
  return (
    <>
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
    </>
  );
};

export default ProductBreadcrumb;
