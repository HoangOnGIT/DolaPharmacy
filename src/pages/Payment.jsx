import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Radio,
  Divider,
  Typography,
  Badge,
  Card,
  Space,
  notification,
} from "antd";
import {
  ArrowLeftOutlined,
  BankOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import imgLogo from "../img/Header/Logo.png";
import { useCart } from "../contexts/CartContext";
import PaymentProduct from "../components/product/PaymentProduct";
import { Await, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [provinces, setProvices] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const { cart, emptyCart } = useCart();
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const total =
    cart?.items?.reduce((acc, item) => {
      const price = item.salePrice || item.basePrice;
      return (acc += item.quantity * price);
    }, 0) || 0;

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p")
      .then((response) => response.json())
      .then((data) => {
        setProvices(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/d")
      .then((response) => response.json())
      .then((data) => {
        setDistricts(data);
      });
  }, []);

  function handleSubmit() {
    form.submit();
  }

  async function handleFinish() {
    const values = form.getFieldsValue();

    // Use validated values from form.onFinish parameter
    const order = {
      ...values,
      items: cart.items,
      userId: user.id,
      paymentMethod: paymentMethod,
      status: "pending",
      total: total, // Include the total amount
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3000/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Order error:", errorData);
        api.warning({
          message: "Không thể thêm hoá đơn!",
          description: `Đã có lỗi xảy ra. Vui lòng thử lại sau!`,
          duration: 2,
        });
        return;
      }

      const serverContent = await response.json();

      api.success({
        message: "Đặt hàng thành công!",
        description: "Cảm ơn bạn đã đặt hàng tại DolaPharmacy.",
        duration: 3,
      });

      emptyCart();

      form.resetFields();
      navigate(`/confirmation/${serverContent.id}`);
    } catch (error) {
      console.error("Order submission error:", error);
      api.error({
        message: "Lỗi kết nối",
        description: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
        duration: 3,
      });
    }
  }

  function handleFailed() {
    api.warning({
      message: "Không thể thêm hoá đơn!",
      description: `Vui lòng kiểm tra thông tin đặt hàng!`,
      duration: 2,
    });
  }

  function handleReturn() {
    navigate(-1);
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="py-6 border-b border-gray-200">
        <div className="flex flex-col items-center">
          <img src={imgLogo} alt="DolaPharmacy" className="max-w-[200px]" />
        </div>
      </div>
      {contextHolder}
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="flex-grow">
          <div className="mb-8">
            <Card className="mb-6">
              <Title level={4} className="mb-4">
                Thông tin nhận hàng
              </Title>
              <Form
                layout="vertical"
                form={form}
                onFinish={handleFinish}
                onFinishFailed={handleFailed}
              >
                <Form.Item
                  name="fullName"
                  label="Họ và tên"
                  rules={[
                    { required: true, message: "Vui lòng nhập họ và tên!" },
                  ]}
                >
                  <Input placeholder="Họ và tên" size="large" />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="Số điện thoại"
                  rules={[
                    { required: true, message: "Vui lòng số điện thoại!" },
                  ]}
                >
                  <div className="flex gap-2">
                    <Input
                      placeholder="Số điện thoại"
                      size="large"
                      className="flex-1"
                    />
                  </div>
                </Form.Item>
                <Form.Item name="email" label="Email">
                  <Input placeholder="Email (tuỳ chọn)" size="large" />
                </Form.Item>

                <Form.Item
                  name="province"
                  label="Tỉnh thành"
                  rules={[
                    { required: true, message: "Vui lòng chọn tỉnh thành!" },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Chọn tỉnh thành"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={provinces.map((province) => {
                      return { value: province.name, label: province.name };
                    })}
                  />
                </Form.Item>
                <Form.Item
                  name="district"
                  label="Quận huyện"
                  rules={[
                    { required: true, message: "Vui lòng chọn quận huyện!" },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Chọn quận huyện"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={districts.map((district) => {
                      return { value: district.name, label: district.name };
                    })}
                  ></Select>
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Địa chỉ chi tiết"
                  rules={[
                    { required: true, message: "Vui lòng nhập địa chỉ!" },
                  ]}
                >
                  <Input placeholder="Số nhà, tên đường..." size="large" />
                </Form.Item>
                <Form.Item name="notes" label="Ghi chú">
                  <TextArea placeholder="Ghi chú (tùy chọn)" rows={4} />
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>

        <div className="md:w-1/3">
          <Card style={{ marginBottom: "20px" }}>
            <Title level={4} className="mb-4">
              Thanh toán
            </Title>
            <Radio.Group
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                <Radio value="transfer" className="w-full">
                  <div className="flex items-center justify-between w-full p-3 border border-gray-200 rounded space-x-3">
                    <span>Chuyển khoản </span>
                    <BankOutlined className="text-xl" />
                  </div>
                </Radio>
                <Radio value="cod" className="w-full">
                  <div className="flex items-center justify-between w-full p-3 border border-gray-200 rounded space-x-3">
                    <span>Thu hộ (COD)</span>
                    <DollarOutlined className="text-xl" />
                  </div>
                </Radio>
              </Space>
            </Radio.Group>
          </Card>
          <Card>
            <Title level={4}>{`Đơn hàng (${
              cart.items ? cart.items.length : 0
            } sản phẩm)`}</Title>
            <div className="mt-4">
              {cart.items &&
                cart.items.map((cartItem) => (
                  <PaymentProduct product={cartItem} key={cartItem.id} />
                ))}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{new Intl.NumberFormat("vi-VN").format(total)}₫ </span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span className="text-green-500">{"Miễn phí"}</span>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Tổng cộng</span>
                <span className="font-bold text-green-500">
                  {new Intl.NumberFormat("vi-VN").format(total)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <Button
                type="link"
                className="px-0"
                icon={<ArrowLeftOutlined />}
                onClick={() => handleReturn()}
              >
                Quay về giỏ hàng
              </Button>
              <Button type="primary" size="large" onClick={handleSubmit}>
                ĐẶT HÀNG
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Payment;
