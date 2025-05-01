import React from "react";
import { Table, Button, InputNumber, Image, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useCart } from "../../contexts/CartContext";

function CartList() {
  const { cart, updateItemQuantity, removeItemFromCart } = useCart();

  // Ensure cart items are properly formatted for table rendering
  const safeCartItems = (cart.items || []).map((item) => {
    return {
      ...item,
      // Convert any potential object values to strings
      name: item.name ? String(item.name) : "Unnamed Product",
      variant:
        typeof item.variant === "object"
          ? JSON.stringify(item.variant)
          : item.variant || "Hiện tại sản phẩm chưa có phân loại",
    };
  });

  const columns = [
    {
      title: "Thông tin sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={
              record.images && record.images[0]
                ? record.images[0].url
                : "https://placeholder.com/80"
            }
            alt={String(record.name)}
            width={80}
            height={80}
            style={{ marginRight: "16px", objectFit: "contain" }}
          />
          <div className="ml-5">
            <div style={{ maxWidth: 300, fontWeight: 500, marginBottom: 4 }}>
              {String(record.name)}
            </div>
            <Button
              type="link"
              danger
              style={{ padding: 0, fontSize: "12px" }}
              onClick={() => removeItemFromCart(record.id)}
            >
              Xóa
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "variant",
      key: "variant",
      render: (_, record) => {
        console.log(record.variant.name);

        return <span>{record.variant ? record.variant : "Mặc định"}</span>;
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (_, record) => {
        const price = record.salePrice || record.basePrice;
        return (
          <div style={{ color: "#2a9d8f" }}>
            {new Intl.NumberFormat("vi-VN").format(price)}₫
          </div>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 150,
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            icon={<MinusOutlined />}
            onClick={() => updateItemQuantity(record.id, record.quantity - 1)}
            style={{
              background: "#e0e0e0",
              borderColor: "#e0e0e0",
              borderRadius: "4px",
            }}
          />
          <InputNumber
            min={1}
            value={record.quantity}
            style={{ width: 40, textAlign: "center", margin: "0 4px" }}
            controls={false}
            onChange={(value) => updateItemQuantity(record.id, value)}
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => updateItemQuantity(record.id, record.quantity + 1)}
            style={{
              background: "#2a6fdb",
              borderColor: "#2a6fdb",
              color: "white",
              borderRadius: "4px",
            }}
          />
        </Space>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      width: 140,
      align: "right",
      render: (_, record) => {
        const price = record.salePrice || record.basePrice;
        return (
          <div style={{ color: "#e63946", fontWeight: 500 }}>
            {new Intl.NumberFormat("vi-VN").format(price * record.quantity)}₫
          </div>
        );
      },
    },
  ];

  return (
    <div className="cart-table">
      <Table
        dataSource={safeCartItems}
        columns={columns}
        pagination={false}
        rowKey="id"
        style={{ borderRadius: "8px", overflow: "hidden" }}
        className="cart-items-table"
      />
      <style jsx>{`
        .cart-items-table .ant-table-thead > tr > th {
          background-color: #f5f5f5;
        }
        .cart-table {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}

export default CartList;
