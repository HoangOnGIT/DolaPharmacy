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

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/api/orders/${orderId}`)
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

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
              Phân loại: {record.variant}
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

  if (confirm) {
    return (
      <div className="max-w-4xl mx-auto p-4 mb-10">
        <Card className="shadow-md text-center">
          <Result
            status="success"
            title="Đặt hàng thành công!"
            subTitle={`Mã đơn hàng: ${order.id}. Cảm ơn bạn đã mua sắm tại Dola Pharmacy!`}
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
                onClick={() => navigate(`/orders/${orderId}`)}
              >
                Xem chi tiết đơn hàng
              </Button>,
            ]}
          />
          <Divider />
          <div className="text-left p-4">
            <Title level={5}>Thông tin đơn hàng</Title>
            <p>
              <strong>Họ tên:</strong> {order.fullName}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {order.phoneNumber}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {order.address}, {order.district},{" "}
              {order.province}
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong>{" "}
              {getPaymentMethodText(order.paymentMethod)}
            </p>
            <p>
              <strong>Tổng tiền:</strong>{" "}
              <span className="text-red-600 font-bold">
                {formatCurrency(order.total)}
              </span>
            </p>
          </div>
          <Text type="secondary" className="mt-4 block">
            Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua số
            hotline: <Text strong>1800 1800</Text>
          </Text>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mb-10">
      <Card className="shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <Title level={3} className="m-0 text-green-700">
              Chi tiết đơn hàng
            </Title>
            <Text className="text-gray-500">
              Cảm ơn bạn đã mua sắm tại Dola Pharmacy
            </Text>
          </div>
          <div className="mt-4 md:mt-0">
            <Tag
              color={getStatusColor(order.status)}
              className="py-1 px-3 text-base"
            >
              {getStatusText(order.status)}
            </Tag>
          </div>
        </div>

        <Divider className="my-6" />

        <Descriptions
          title="Thông tin đơn hàng"
          bordered
          column={{ xs: 1, sm: 2 }}
          className="mb-8"
        >
          <Descriptions.Item label="Mã đơn hàng">{order.id}</Descriptions.Item>
          <Descriptions.Item label="Ngày đặt hàng">
            {formatDate(order.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Phương thức thanh toán">
            {getPaymentMethodText(order.paymentMethod)}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">
            <Text className="text-red-600 font-bold">
              {formatCurrency(order.total)}
            </Text>
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Thông tin người nhận</Divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <p>
              <strong>Họ tên:</strong> {order.fullName}
            </p>
            <p>
              <strong>Email:</strong> {order.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {order.phoneNumber}
            </p>
          </div>
          <div>
            <p>
              <strong>Địa chỉ:</strong> {order.address}
            </p>
            <p>
              <strong>Quận/Huyện:</strong> {order.district}
            </p>
            <p>
              <strong>Tỉnh/Thành phố:</strong> {order.province}
            </p>
          </div>
        </div>

        <Divider orientation="left">Sản phẩm đã đặt</Divider>
        <Table
          dataSource={order.items}
          columns={columns}
          rowKey="id"
          pagination={false}
          className="mb-8"
          summary={() => (
            <Table.Summary>
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={3} className="text-right">
                  <Text strong>Tổng thanh toán:</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="text-right">
                  <Text strong className="text-xl text-red-600">
                    {formatCurrency(order.total)}
                  </Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />

        <div className="flex flex-col items-center justify-center mt-8">
          <Text type="secondary" className="mb-4 text-center">
            Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua số
            hotline: <Text strong>1800 1800</Text>
          </Text>
          <Text className="text-green-600 text-center mb-6">
            Dola Pharmacy - Chăm sóc sức khỏe tận tâm
          </Text>

          <Button
            type="primary"
            size="large"
            className="bg-green-600 hover:bg-green-700 border-green-600 min-w-[200px]"
            onClick={() => navigate(-1)}
          >
            Trở lại
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default OrderDetail;
