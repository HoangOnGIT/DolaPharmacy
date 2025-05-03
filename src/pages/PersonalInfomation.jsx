import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Spin,
  Table,
  Tag,
  Button,
  Empty,
  Tabs,
  Divider,
  message,
  Space,
  Select,
} from "antd";
import AddressModal from "../components/AddressModal";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

function PersonalInfomation() {
  const { user, logout, isAuthenticated } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (isAuthenticated) {
      console.log(`${BASE_URL}/api/users/${user.id}`);

      fetch(`${BASE_URL}/api/users/${user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user information");
          }
          return response.json();
        })
        .then((data) => {
          setUserInfo(data);
        })
        .catch((error) => {
          alert("Lỗi xác thực người dùng!");
          logout();
          console.error(error);
        });

      // Fetch user orders
      fetch(`${BASE_URL}/api/orders?userId=${user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch orders");
          }
          return response.json();
        })
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setLoading(false);
        });
    } else {
      alert("Vui lòng đăng nhập lại tài khoản");
      logout();
    }
  }, [isAuthenticated, user, logout]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Format date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Order status tag color mapping
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

  // Status text mapping
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

  // Function to handle adding a new address
  const handleAddAddress = async (values) => {
    setSubmitting(true);
    try {
      const newAddress = {
        type: values.type || "shipping",
        isPrimary: values.isPrimary || false,
        street: values.address,
        city: values.province,
        state: values.district,
        country: "Việt Nam",
        phone: values.phoneNumber,
      };

      // Create a copy of user info and add the new address
      let updatedUserInfo;

      if (userInfo.addresses) {
        updatedUserInfo = {
          ...userInfo,
          addresses: [...userInfo.addresses, newAddress],
        };
      } else {
        updatedUserInfo = {
          ...userInfo,
          addresses: [newAddress],
        };
      }

      // Update primary address if needed
      if (values.isPrimary) {
        updatedUserInfo.addresses = updatedUserInfo.addresses.map((addr) => ({
          ...addr,
          isPrimary: addr.id === newAddress.id,
        }));
      }

      const token = localStorage.getItem("token");

      // Send the updated user info to the API
      const response = await fetch(`${BASE_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to update address");
      }

      const updatedUser = await response.json();
      setUserInfo(updatedUser);

      message.success("Thêm địa chỉ thành công!");
      setIsAddressModalVisible(false);
    } catch (error) {
      console.error("Error adding address:", error);
      message.error("Không thể thêm địa chỉ. Vui lòng thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  };

  // Define columns for the orders table
  const orderColumns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      render: (id) => <Text copyable>{id}</Text>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      defaultSortOrder: "descend",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => (
        <Text strong className="text-red-600">
          {formatCurrency(total)}
        </Text>
      ),
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)} className="py-1 px-2">
          {getStatusText(status)}
        </Tag>
      ),
      filters: [
        { text: "Chờ xử lý", value: "pending" },
        { text: "Đang xử lý", value: "processing" },
        { text: "Hoàn thành", value: "completed" },
        { text: "Đã hủy", value: "cancelled" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          className="bg-blue-500"
          onClick={() => navigate(`/orders/${record.id}`)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="!p-6 bg-gray-100 min-h-screen">
      <Title level={2} className="text-center !mx-6">
        Thông Tin Cá Nhân
      </Title>

      <Tabs
        defaultActiveKey="info"
        className="bg-white shadow-md rounded-lg p-4 !mb-6"
      >
        <TabPane
          tab="Thông tin cá nhân"
          key="info"
          style={{ marginLeft: "30px" }}
        >
          <Card className="mb-6 shadow-md border-0">
            <Title level={4}>Thông Tin Cơ Bản</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Text>
                <strong>ID:</strong> {userInfo.id}
              </Text>
              <Text>
                <strong>Email:</strong> {userInfo.email}
              </Text>
              <Text>
                <strong>Họ và Tên:</strong> {userInfo.firstName}{" "}
                {userInfo.lastName}
              </Text>
              <Text>
                <strong>Số Điện Thoại:</strong> {userInfo.phone}
              </Text>
              <Text>
                <strong>Ngày Sinh:</strong> {userInfo.dateOfBirth}
              </Text>
              <Text>
                <strong>Vai Trò:</strong> {userInfo.role}
              </Text>
              <Text>
                <strong>Trạng Thái Xác Minh:</strong>{" "}
                {userInfo.verificationStatus}
              </Text>
              <Text>
                <strong>Lần Đăng Nhập Cuối:</strong>{" "}
                {new Date(userInfo.lastLogin).toLocaleString()}
              </Text>
            </div>
          </Card>
          <Card className="mb-6 shadow-md border-0">
            <div className="flex justify-between items-center mb-4">
              <Title level={4}>Địa Chỉ</Title>
              <Button
                type="primary"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setIsAddressModalVisible(true)}
              >
                Thêm địa chỉ
              </Button>
            </div>
            {userInfo.addresses &&
              userInfo.addresses.map((address) => (
                <Card
                  key={address.id}
                  className="mb-4 shadow-sm border border-gray-200"
                >
                  <Text>
                    <strong>Loại:</strong> {address.type}
                  </Text>
                  <br />
                  <Text>
                    <strong>Họ và Tên:</strong> {address.firstName}{" "}
                    {address.lastName}
                  </Text>
                  <br />
                  <Text>
                    <strong>Địa Chỉ:</strong> {address.street}, {address.city},{" "}
                    {address.state}, {address.postalCode}, {address.country}
                  </Text>
                  <br />
                  <Text>
                    <strong>Số Điện Thoại:</strong> {address.phone}
                  </Text>
                  <br />
                  <Text>
                    <strong>Địa Chỉ Chính:</strong>{" "}
                    {address.isPrimary ? "Có" : "Không"}
                  </Text>
                </Card>
              ))}
          </Card>
          <Card className="shadow-md border-0">
            <Title level={4}>Thông Tin Khác</Title>
            <Text>
              <strong>Ngày Tạo:</strong>{" "}
              {new Date(userInfo.createdAt).toLocaleString()}
            </Text>
            <br />
            <Text>
              <strong>Ngày Cập Nhật:</strong>{" "}
              {new Date(userInfo.updatedAt).toLocaleString()}
            </Text>
          </Card>
        </TabPane>

        <TabPane tab="Lịch sử đơn hàng" key="orders">
          <Card className="shadow-md border-0">
            <Title level={4} className="mb-4">
              Đơn Hàng Của Tôi
            </Title>

            {loading ? (
              <div className="flex justify-center my-12">
                <Spin size="large" />
              </div>
            ) : orders.length > 0 ? (
              <Table
                dataSource={orders}
                columns={orderColumns}
                rowKey="id"
                pagination={{
                  pageSize: 5,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20"],
                }}
                className="shadow-sm"
              />
            ) : (
              <Empty
                description="Bạn chưa có đơn hàng nào"
                className="my-8"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                <Button
                  type="primary"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => navigate("/products")}
                >
                  Mua sắm ngay
                </Button>
              </Empty>
            )}
          </Card>
        </TabPane>
      </Tabs>

      {/* Use the AddressModal component */}
      <AddressModal
        visible={isAddressModalVisible}
        onCancel={() => setIsAddressModalVisible(false)}
        onAddAddress={handleAddAddress}
        submitting={submitting}
      />
    </div>
  );
}

export default PersonalInfomation;
