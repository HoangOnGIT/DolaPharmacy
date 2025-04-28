import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { ShoppingOutlined } from "@ant-design/icons";
import CartList from "../components/cartList/CartList";
import { Form, Input, Button, Checkbox, Select, DatePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      if (!localStorage.getItem("token")) navigate("/login");
    }
  }, [isAuthenticated]);

  const [showInvoiceForm, setShowInvoiceForm] = useState(false);

  // Calculate total price
  const total =
    cart.items?.reduce((acc, item) => {
      const price = item.salePrice || item.basePrice;
      return acc + price * item.quantity;
    }, 0) || 0;

  return (
    <div className="container mx-auto px-4 my-8">
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
              <Form layout="vertical">
                <Form.Item label="Chọn ngày giao hàng">
                  <DatePicker
                    style={{ width: "100%" }}
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày giao hàng"
                  />
                </Form.Item>

                <Form.Item label="Chọn giờ giao hàng">
                  <Select defaultValue="19:00 - 21:00">
                    <Select.Option value="08:00 - 12:00">
                      08:00 - 12:00
                    </Select.Option>
                    <Select.Option value="14:00 - 18:00">
                      14:00 - 18:00
                    </Select.Option>
                    <Select.Option value="19:00 - 21:00">
                      19:00 - 21:00
                    </Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Checkbox
                    checked={showInvoiceForm}
                    onChange={(e) => setShowInvoiceForm(e.target.checked)}
                  >
                    Xuất hóa đơn công ty
                  </Checkbox>
                </Form.Item>

                {showInvoiceForm && (
                  <>
                    <Form.Item label="Tên công ty">
                      <Input placeholder="Tên công ty" />
                    </Form.Item>

                    <Form.Item label="Mã số thuế">
                      <Input placeholder="Mã số thuế" />
                    </Form.Item>

                    <Form.Item label="Địa chỉ công ty">
                      <TextArea
                        rows={4}
                        placeholder="Nhập địa chỉ công ty (bao gồm Phường/Xã, Quận/Huyện, Tỉnh/Thành phố nếu có)"
                      />
                    </Form.Item>

                    <Form.Item label="Email nhận hóa đơn">
                      <Input placeholder="Email nhận hóa đơn" />
                    </Form.Item>
                  </>
                )}
              </Form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
