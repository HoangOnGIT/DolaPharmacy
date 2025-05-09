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
  Row,
  Col,
} from "antd";
import {
  ArrowLeftOutlined,
  BankOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import emailjs from "@emailjs/browser";

import imgLogo from "../img/Header/Logo.png";
import { useCart } from "../contexts/CartContext";
import PaymentProduct from "../components/product/PaymentProduct";
import { Await, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PaymentProductsList from "../components/product/PaymentProductList";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

function Payment() {
  const [currUser, setCurrUser] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [provinces, setProvices] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const { cart, emptyCart } = useCart();
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState();
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

  useEffect(() => {
    // Fetch provinces from the new API
    fetch("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the specific response format with data property
        if (responseData.error === 0 && responseData.data) {
          const formattedProvinces = responseData.data.map((province) => ({
            id: province.id,
            value: province.name,
            label: province.name,
          }));
          setProvices(formattedProvinces);
        } else {
          console.error("Province data format is incorrect:", responseData);
          api.error({
            message: "Lỗi dữ liệu",
            description:
              "Không thể tải danh sách tỉnh thành. Dữ liệu không hợp lệ.",
            duration: 3,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
        api.error({
          message: "Lỗi dữ liệu",
          description:
            "Không thể tải danh sách tỉnh thành. Vui lòng thử lại sau.",
          duration: 3,
        });
      });
  }, []);

  // Load districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
        .then((response) => response.json())
        .then((responseData) => {
          // Similar handling for districts data
          if (responseData.error === 0 && responseData.data) {
            const formattedDistricts = responseData.data.map((district) => ({
              value: district.name,
              label: district.name,
              id: district.id,
            }));
            setDistricts(formattedDistricts);
          } else {
            console.error("District data format is incorrect:", responseData);
            api.error({
              message: "Lỗi dữ liệu",
              description:
                "Không thể tải danh sách quận huyện. Dữ liệu không hợp lệ.",
              duration: 3,
            });
          }
          // Reset ward selection when district changes
          setSelectedDistrict(null);
          form.setFieldsValue({ district: undefined, ward: undefined });
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
          api.error({
            message: "Lỗi dữ liệu",
            description:
              "Không thể tải danh sách quận huyện. Vui lòng thử lại sau.",
            duration: 3,
          });
        });
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  // Load wards when district changes
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
        .then((response) => response.json())
        .then((responseData) => {
          const formattedWards = responseData.data.map((ward) => ({
            value: ward.name,
            label: ward.name,
          }));
          setWards(formattedWards);
          form.setFieldsValue({ ward: undefined });
        })
        .catch((error) => {
          console.error("Error fetching wards:", error);
          api.error({
            message: "Lỗi dữ liệu",
            description:
              "Không thể tải danh sách phường xã. Vui lòng thử lại sau.",
            duration: 3,
          });
        });
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  function handleSubmit() {
    form.submit();
  }

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

      // First, update the basic information
      form.setFieldsValue({
        fullName: fullName,
        phone: primaryShippingAddress?.phone,
        email: currUser.email || "",
        address: primaryShippingAddress?.street || "",
      });

      // Set province and handle cascading fields
      const province = primaryShippingAddress?.city;
      if (province) {
        form.setFieldsValue({ province });

        // Find the province ID to trigger the district loading
        const provinceItem = provinces.find((p) => p.value === province);
        if (provinceItem) {
          // Set the selected province to trigger district loading
          setSelectedProvince(provinceItem.id);

          // Handle district selection after provinces are loaded
          setTimeout(() => {
            const district = primaryShippingAddress?.state;
            if (district) {
              // First wait for districts to load
              const checkDistricts = setInterval(() => {
                if (districts.length > 0) {
                  clearInterval(checkDistricts);

                  // Now set the district value
                  form.setFieldsValue({ district });

                  // Find district ID to trigger ward loading
                  const districtItem = districts.find(
                    (d) => d.value === district
                  );
                  if (districtItem) {
                    setSelectedDistrict(districtItem.id);

                    // Handle ward selection after districts are loaded
                    setTimeout(() => {
                      const ward = primaryShippingAddress?.ward;
                      if (ward) {
                        // Wait for wards to load
                        const checkWards = setInterval(() => {
                          if (wards.length > 0) {
                            clearInterval(checkWards);
                            form.setFieldsValue({ ward });
                          }
                        }, 200);

                        // Set a timeout to clear the interval if it takes too long
                        setTimeout(() => clearInterval(checkWards), 5000);
                      }
                    }, 500);
                  }
                }
              }, 200);

              // Set a timeout to clear the interval if it takes too long
              setTimeout(() => clearInterval(checkDistricts), 5000);
            }
          }, 500);
        }
      }

      api.success({
        message: "Thông tin đã được điền",
        description: "Thông tin cá nhân của bạn đã được điền vào form.",
        duration: 2,
      });
    }
  };

  async function handleFinish() {
    setLoading(true);
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

    try {
      const response = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        setLoading(false);
        return;
      }

      const serverContent = await response.json();

      const templateId = "template_c5pwx77";
      const serviceId = "service_ztlc7ux";
      const publicKey = import.meta.env.VITE_PUBLIC_MAIL_KEY;

      // Format the individual items properly for Handlebars template
      const formattedItems = cart.items.map((item) => {
        // Ensure the image URL is valid
        const imageUrl = item.images[0].url
          ? item.images[0].url
          : "https://res.cloudinary.com/dbmtxumro/image/upload/v1746693032/placeholder_image.png";

        // Ensure price is valid
        const price = parseFloat(item.salePrice || item.basePrice || 0);

        return {
          name: item.name || "Sản phẩm",
          units: item.quantity || 1,
          image_url: imageUrl,
          price: new Intl.NumberFormat("vi-VN", {
            minimumFractionDigits: 2,
          }).format(price),
          variant: item.variant,
        };
      });

      const shipping = 0;
      const tax = 0; // Define tax variable to avoid reference error

      const emailData = {
        to_email: values.email || "",
        order_id: serverContent.id || "N/A",
        email: values.email || "",
        orders: formattedItems,
        // Add user shipping information
        fullName: values.fullName || "",
        phone: values.phone || "",
        province: values.province || "",
        district: values.district || "",
        address: values.address || "",
        deliveryDate: values.deliveryDate
          ? values.deliveryDate.format("DD/MM/YYYY")
          : "",
        deliveryTime: values.deliveryTime || "",
        // Cost information
        cost: {
          shipping: new Intl.NumberFormat("vi-VN", {
            maximumFractionDigits: 0,
          }).format(shipping),
          tax: new Intl.NumberFormat("vi-VN", {
            maximumFractionDigits: 0,
          }).format(tax),
          total: new Intl.NumberFormat("vi-VN", {
            maximumFractionDigits: 0,
          }).format(total),
        },
      };

      console.log("Email data being sent:", JSON.stringify(emailData, null, 2));

      // Send email
      if (values.email) {
        try {
          await emailjs.send(serviceId, templateId, emailData, publicKey);
          alert(
            `Thông tin đơn hàng đã được gửi tới địa chỉ email: ${emailData.to_email}`
          );
        } catch (emailError) {
          console.error("Failed to send order confirmation email:", emailError);
        }
      }

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
    } finally {
      setLoading(false);
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
                initialValues={{
                  deliveryTime: "08:00 - 12:00",
                }}
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="fullName"
                      label="Họ và tên"
                      rules={[
                        { required: true, message: "Vui lòng nhập họ và tên!" },
                      ]}
                    >
                      <Input placeholder="Họ và tên" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="phone"
                      label="Số điện thoại"
                      rules={[
                        { required: true, message: "Vui lòng số điện thoại!" },
                      ]}
                    >
                      <Input placeholder="Số điện thoại" size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="email" label="Email">
                  <Input placeholder="Email (tuỳ chọn)" size="large" />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="province"
                      label="Tỉnh thành"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn tỉnh thành!",
                        },
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
                        options={provinces}
                        onChange={(value, option) => {
                          setSelectedProvince(
                            provinces.find(
                              (province) => (province.name = value)
                            ).id
                          );
                          // form.setFieldsValue({
                          //   district: undefined,
                          //   ward: undefined,
                          // });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="district"
                      label="Quận huyện"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn quận huyện!",
                        },
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
                        options={districts}
                        disabled={!selectedProvince}
                        onChange={(value) => {
                          setSelectedDistrict(
                            districts.find(
                              (district) => district.value === value
                            ).id
                          );
                          form.setFieldsValue({ ward: undefined });
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="ward"
                      label="Phường xã"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn phường xã!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Chọn phường xã"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={wards}
                        disabled={!selectedDistrict}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="address"
                  label="Địa chỉ chi tiết"
                  rules={[
                    { required: true, message: "Vui lòng nhập địa chỉ!" },
                  ]}
                >
                  <Input placeholder="Số nhà, tên đường..." size="large" />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
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
                        disabledDate={(current) => {
                          return (
                            current &&
                            current < new Date().setHours(0, 0, 0, 0) + 1
                          );
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="deliveryTime"
                      label="Giờ giao hàng"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn giờ giao hàng!",
                        },
                      ]}
                    >
                      <Select defaultValue="8:00 - 12:00">
                        <Select.Option value="8:00 - 12:00">
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
                  </Col>
                </Row>

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
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Form.Item name="companyName" label="Tên công ty">
                          <Input placeholder="Tên công ty" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item name="taxId" label="Mã số thuế">
                          <Input placeholder="Mã số thuế" />
                        </Form.Item>
                      </Col>
                    </Row>

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
              {cart.items && <PaymentProductsList products={cart.items} />}
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
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
                loading={loading}
              >
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
