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
  DatePicker,
  Checkbox,
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
  const [currUser, setCurrUser] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [provinces, setProvices] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
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

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (user) {
      fetch(`${BASE_URL}/api/users/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setCurrUser(data);
        });
    }
  }, [user]);

  const fillUserInfo = () => {
    if (currUser?.addresses?.length === 0) {
      api.warning({
        message: "Vui long nhập địa chỉ",
        description: "Bạn chưa có địa chỉ nào trong tài khoản của mình.",
        duration: 2,
      });
      return;
    }

    if (currUser) {
      const primaryShippingAddress =
        currUser.addresses?.find(
          (addr) => addr.type === "shipping" && addr.isPrimary
        ) ||
        currUser.addresses?.find((addr) => addr.type === "shipping") ||
        currUser.addresses?.[0];

      const fullName = `${currUser.firstName || ""} ${
        currUser.lastName || ""
      }`.trim();

      form.setFieldsValue({
        fullName: fullName,
        phone: primaryShippingAddress?.phone,
        email: currUser.email || "",
        province: primaryShippingAddress?.city || "",
        district: primaryShippingAddress?.state || "",
        address: primaryShippingAddress?.street || "",
      });

      api.success({
        message: "Thông tin đã được điền",
        description: "Thông tin cá nhân của bạn đã được điền vào form.",
        duration: 2,
      });
    }
  };

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
      userId: user ? user.id : "Khách vãng lai",
      paymentMethod: paymentMethod,
      status: "pending",
      total: total, // Include the total amount
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BASE_URL}/api/orders`, {
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
              <div className="flex justify-between items-center mb-4">
                <Title level={4} style={{ margin: 0 }}>
                  Thông tin nhận hàng
                </Title>
                {user && (
                  <Button type="primary" onClick={fillUserInfo} ghost>
                    Sử dụng thông tin của tôi
                  </Button>
                )}
              </div>
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
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    { required: true, message: "Vui lòng số điện thoại!" },
                  ]}
                >
                  <Input placeholder="Số điện thoại" size="large" />
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

                <Form.Item
                  name="deliveryDate"
                  label="Ngày giao hàng"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ngày giao hàng!",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày giao hàng"
                  />
                </Form.Item>

                <Form.Item
                  name="deliveryTime"
                  label="Giờ giao hàng"
                  rules={[
                    { required: true, message: "Vui lòng chọn giờ giao hàng!" },
                  ]}
                >
                  <Select defaultValue="08:00 - 12:00">
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
                    <Form.Item name="companyName" label="Tên công ty">
                      <Input placeholder="Tên công ty" />
                    </Form.Item>

                    <Form.Item name="taxId" label="Mã số thuế">
                      <Input placeholder="Mã số thuế" />
                    </Form.Item>

                    <Form.Item name="companyAddress" label="Địa chỉ công ty">
                      <TextArea
                        rows={4}
                        placeholder="Nhập địa chỉ công ty (bao gồm Phường/Xã, Quận/Huyện, Tỉnh/Thành phố nếu có)"
                      />
                    </Form.Item>

                    <Form.Item name="invoiceEmail" label="Email nhận hóa đơn">
                      <Input placeholder="Email nhận hóa đơn" />
                    </Form.Item>
                  </>
                )}

                <Form.Item name="notes" label="Ghi chú">
                  <TextArea placeholder="Ghi chú (tùy chọn)" rows={4} />
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>

        <div className="md:w-1/3 md:sticky md:top-6 self-start mb-8">
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
                <span>{new Intl.NumberFormat("vi-VN").format(total)} ₫ </span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span className="text-green-500">{"Miễn phí"}</span>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Tổng cộng</span>
                <span className="font-bold text-green-500">
                  {new Intl.NumberFormat("vi-VN").format(total)} ₫
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
