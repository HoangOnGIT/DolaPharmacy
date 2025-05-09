import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { LoadingOutlined, ShoppingOutlined } from "@ant-design/icons";
import CartList from "../components/Cart/CartList";
import { Button } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart } = useCart();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingOutlined />;
  }

  const navigate = useNavigate();

  const total =
    cart.items?.reduce((acc, item) => {
      const price = item.salePrice || item.basePrice;
      return (acc += item.quantity * price);
    }, 0) || 0;

  return (
    <div className="w-[80%] mx-auto px-4 my-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column - Cart items */}
        <div className={cart.items?.length === 0 ? "w-full" : "lg:w-2/3"}>
          <h2 className="text-xl font-medium mb-4">Giỏ hàng của bạn</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {cart.items?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <ShoppingOutlined
                  style={{
                    fontSize: "50px",
                    color: "#999",
                    marginBottom: "16px",
                  }}
                />
                <span className="text-[15px] text-gray-500 text-center">
                  Không có sản phẩm nào trong giỏ hàng của bạn
                </span>
              </div>
            ) : (
              <>
                <CartList />
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg">Tổng tiền:</span>
                    <span className="text-xl font-medium text-red-600">
                      {new Intl.NumberFormat("vi-VN").format(total)}₫
                    </span>
                  </div>
                  <Button
                    type="primary"
                    block
                    size="large"
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => navigate("/payment")}
                  >
                    Thanh toán
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {cart.items?.length > 0 && (
          <div className="lg:w-1/3">
            <h2 className="text-xl font-medium mb-4">Thông tin đơn hàng</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">
                Thông tin giao hàng và xuất hóa đơn sẽ được cung cấp trong bước
                thanh toán
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
