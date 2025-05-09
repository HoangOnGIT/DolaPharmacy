import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Spin,
  Alert,
  Divider,
  Tag,
  Table,
  Image,
  Space,
  Descriptions,
  Button,
  Result,
} from "antd";

const { Title, Text } = Typography;

function OrderDetail({ confirm = false }) {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/api/orders/${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch order");
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [orderId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    if (typeof dateString === "string" && !dateString.includes("T"))
      return dateString;

    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "processing":
        return "blue";
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "default";
    }
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case "transfer":
        return "Chuyển khoản";
      case "cod":
        return "Thanh toán khi nhận hàng (COD)";
      default:
        return method;
    }
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center gap-4">
          {record.images && record.images.length > 0 && (
            <Image
              src={record.images[0].url}
              alt={record.images[0].alt}
              width={80}
              className="rounded-md object-cover"
              placeholder={
                <div className="bg-gray-200 w-20 h-20 rounded-md flex items-center justify-center">
                  Loading
                </div>
              }
            />
          )}
          <div>
            <Text strong className="block mb-1">
              {record.name}
            </Text>
            <Text type="secondary" className="block">
              Phân loại: {record.variant.name}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "salePrice",
      key: "salePrice",
      render: (salePrice, record) => (
        <div>
          <Text className="text-red-500 font-medium block">
            {formatCurrency(salePrice)}
          </Text>
          {record.basePrice > record.salePrice && (
            <Text delete type="secondary" className="block">
              {formatCurrency(record.basePrice)}
            </Text>
          )}
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Thành tiền",
      key: "total",
      align: "right",
      render: (_, record) => (
        <Text strong className="text-red-600">
          {formatCurrency(record.salePrice * record.quantity)}
        </Text>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spin size="large" tip="Đang tải thông tin đơn hàng..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert
          message="Lỗi"
          description={`Không thể tải thông tin đơn hàng: ${error}`}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "processing":
        return "Đang xử lý";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  console.log(order);

  if (confirm) {
    return (
      <div className="max-w-4xl mx-auto p-4 mb-10">
        <Card className="shadow-lg rounded-lg overflow-hidden border border-gray-100">
          <Result
            status="success"
            title="Đặt hàng thành công!"
            subTitle={`Mã đơn hàng: ${
              order?.id || ""
            }. Cảm ơn bạn đã mua sắm tại Dola Pharmacy!`}
            extra={[
              <Button
                type="primary"
                key="continue"
                className="bg-green-600 hover:bg-green-700 border-green-600 min-w-[200px]"
                onClick={() => navigate("/product")}
              >
                Tiếp tục mua sắm
              </Button>,
              <Button
                key="details"
                onClick={() => {
                  navigate(`/orders/${order?.id}`);
                }}
                className="min-w-[200px]"
              >
                Xem chi tiết đơn hàng
              </Button>,
            ]}
          />
          <Divider className="my-6 bg-gray-200" />

          <Descriptions
            title={
              <span className="text-lg font-medium text-green-800">
                Thông tin đơn hàng
              </span>
            }
            bordered
            column={{ xs: 1, sm: 2 }}
            className="mb-6"
            labelStyle={{ fontWeight: 600, backgroundColor: "#f5f9f7" }}
            contentStyle={{ backgroundColor: "#ffffff" }}
            size="middle"
          >
            <Descriptions.Item label="Mã đơn hàng" span={1}>
              <Text copyable>{order.id}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Họ tên">
              {order.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {order.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {order.address}, {order.district}, {order.province}
            </Descriptions.Item>
            {order.deliveryDate && (
              <Descriptions.Item label="Ngày giao hàng">
                {formatDate(order.deliveryDate)}
              </Descriptions.Item>
            )}
            {order.deliveryTime && (
              <Descriptions.Item label="Giờ giao hàng">
                {order.deliveryTime}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Phương thức thanh toán">
              {getPaymentMethodText(order.paymentMethod)}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">
              <Text className="text-red-600 font-bold text-lg">
                {formatCurrency(order.total)}
              </Text>
            </Descriptions.Item>
          </Descriptions>

          {order.companyName && (
            <>
              <Divider
                orientation="left"
                orientationMargin="0"
                className="font-medium text-green-800 mb-4"
              >
                <span className="bg-green-50 px-4 py-1 rounded-lg">
                  Thông tin xuất hóa đơn
                </span>
              </Divider>

              <Descriptions
                bordered
                column={{ xs: 1, sm: 2 }}
                className="mb-6"
                labelStyle={{ fontWeight: 600, backgroundColor: "#f5f9f7" }}
                contentStyle={{ backgroundColor: "#ffffff" }}
                size="middle"
              >
                <Descriptions.Item label="Tên công ty">
                  {order.companyName}
                </Descriptions.Item>
                <Descriptions.Item label="Mã số thuế">
                  {order.taxId}
                </Descriptions.Item>
                {order.companyAddress && (
                  <Descriptions.Item label="Địa chỉ công ty">
                    {order.companyAddress}
                  </Descriptions.Item>
                )}
                {order.invoiceEmail && (
                  <Descriptions.Item label="Email nhận hóa đơn">
                    {order.invoiceEmail}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </>
          )}

          <div className="flex flex-col items-center justify-center mt-6 bg-gray-50 py-6 px-4 rounded-lg">
            <Text type="secondary" className="mb-4 text-center">
              Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua số
              hotline:{" "}
              <Text strong className="text-green-700">
                1800 1800
              </Text>
            </Text>
            <Text className="text-green-600 font-medium text-center">
              Dola Pharmacy - Chăm sóc sức khỏe tận tâm
            </Text>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mb-10">
      <Card className="shadow-lg rounded-lg overflow-hidden border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <Title level={3} className="m-0 text-green-700 font-semibold">
              Chi tiết đơn hàng
            </Title>
            <Text className="text-gray-500 mt-1 block">
              Cảm ơn bạn đã mua sắm tại Dola Pharmacy
            </Text>
          </div>
          <div className="mt-4 md:mt-0">
            <Tag
              color={getStatusColor(order.status)}
              className="py-1.5 px-4 text-base rounded-full font-medium shadow-sm"
            >
              {getStatusText(order.status)}
            </Tag>
          </div>
        </div>

        <Divider className="my-6 bg-gray-200" />

        <Descriptions
          title={
            <span className="text-lg font-medium text-green-800">
              Thông tin đơn hàng
            </span>
          }
          bordered
          column={{ xs: 1, sm: 2 }}
          className="mb-8"
          labelStyle={{
            fontWeight: 600,
            backgroundColor: "#f5f9f7",
          }}
          contentStyle={{ backgroundColor: "#ffffff" }}
          size="middle"
        >
          <Descriptions.Item label="Mã đơn hàng" span={1}>
            <Text copyable>{order.id}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Ngày đặt hàng">
            {formatDate(order.createdAt)}
          </Descriptions.Item>
          {order.deliveryDate && (
            <Descriptions.Item label="Ngày giao hàng">
              {formatDate(order.deliveryDate)}
            </Descriptions.Item>
          )}
          {order.deliveryTime && (
            <Descriptions.Item label="Giờ giao hàng">
              {order.deliveryTime}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Phương thức thanh toán">
            {getPaymentMethodText(order.paymentMethod)}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">
            <Text className="text-red-600 font-bold text-lg">
              {formatCurrency(order.total)}
            </Text>
          </Descriptions.Item>
        </Descriptions>

        <Divider
          orientation="left"
          orientationMargin="0"
          className="font-medium text-green-800 mb-4"
        >
          <span className="bg-green-50 px-4 py-1 rounded-lg">
            Thông tin người nhận
          </span>
        </Divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-gray-50 p-4 rounded-lg">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <p className="mb-3">
              <strong className="text-green-700">Họ tên:</strong>{" "}
              {order.fullName}
            </p>
            <p className="mb-3">
              <strong className="text-green-700">Email:</strong> {order.email}
            </p>
            <p className="mb-0">
              <strong className="text-green-700">Số điện thoại:</strong>{" "}
              {order.phone}
            </p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <p className="mb-3">
              <strong className="text-green-700">Địa chỉ:</strong>{" "}
              {order.address}
            </p>
            <p className="mb-3">
              <strong className="text-green-700">Quận/Huyện:</strong>{" "}
              {order.district}
            </p>
            <p className="mb-0">
              <strong className="text-green-700">Tỉnh/Thành phố:</strong>{" "}
              {order.province}
            </p>
          </div>
        </div>

        {order.companyName && (
          <>
            <Divider
              orientation="left"
              orientationMargin="0"
              className="font-medium text-green-800 mb-4"
            >
              <span className="bg-green-50 px-4 py-1 rounded-lg">
                Thông tin xuất hóa đơn
              </span>
            </Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-gray-50 p-4 rounded-lg">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="mb-3">
                  <strong className="text-green-700">Tên công ty:</strong>{" "}
                  {order.companyName}
                </p>
                <p className="mb-0">
                  <strong className="text-green-700">Mã số thuế:</strong>{" "}
                  {order.taxId}
                </p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                {order.companyAddress && (
                  <p className="mb-3">
                    <strong className="text-green-700">Địa chỉ công ty:</strong>{" "}
                    {order.companyAddress}
                  </p>
                )}
                {order.invoiceEmail && (
                  <p className="mb-0">
                    <strong className="text-green-700">
                      Email nhận hóa đơn:
                    </strong>{" "}
                    {order.invoiceEmail}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        <Divider
          orientation="left"
          orientationMargin="0"
          className="font-medium text-green-800 mb-4"
        >
          <span className="bg-green-50 px-4 py-1 rounded-lg">
            Sản phẩm đã đặt
          </span>
        </Divider>
        {order.items && Array.isArray(order.items) ? (
          <Table
            dataSource={order.items}
            columns={columns}
            rowKey="id"
            pagination={false}
            className="mb-8"
            rowClassName="hover:bg-gray-50"
            bordered
            summary={() => (
              <Table.Summary>
                <Table.Summary.Row className="bg-green-50">
                  <Table.Summary.Cell colSpan={3} className="text-right">
                    <Text strong className="text-lg">
                      Tổng thanh toán:
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell className="text-right">
                    <Text strong className="text-xl text-red-600">
                      {formatCurrency(order.total || 0)}
                    </Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
        ) : (
          <Alert
            message="Thông tin sản phẩm không khả dụng"
            description="Không thể hiển thị danh sách sản phẩm trong đơn hàng."
            type="warning"
          />
        )}

        <div className="flex flex-col items-center justify-center mt-8 bg-gray-50 py-6 px-4 rounded-lg">
          <Text type="secondary" className="mb-4 text-center">
            Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua số
            hotline:{" "}
            <Text strong className="text-green-700">
              1800 1800
            </Text>
          </Text>
          <Text className="text-green-600 font-medium text-center mb-6">
            Dola Pharmacy - Chăm sóc sức khỏe tận tâm
          </Text>

          <Button
            type="primary"
            size="large"
            className="bg-green-600 hover:bg-green-800 border-green-600 min-w-[200px] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
            onClick={() => navigate(-1)}
          >
            <span>Trở lại</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default OrderDetail;
