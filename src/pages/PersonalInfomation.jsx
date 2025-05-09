import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Card, Typography, Spin, Tabs, Row, Col, message } from "antd";
import { UserOutlined, ShoppingOutlined } from "@ant-design/icons";
import AddressModal from "../components/personalInfo/AddressModal";

import ProfileCard from "../components/personalInfo/ProfileCard";
import BasicInfoCard from "../components/personalInfo/BasicInfoCard";
import AddressList from "../components/personalInfo/AddressList";
import OtherInfoCard from "../components/personalInfo/OtherInfoCard";
import OrderHistory from "../components/personalInfo/OrderHistory";

const { Title } = Typography;
const { TabPane } = Tabs;

function PersonalInfomation() {
  const { user, logout, isAuthenticated } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingAddress, setDeletingAddress] = useState(null);
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
      console.log(`${BASE_URL}/api/orders?userId=${user.id}`);

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

  // Function to handle adding a new address
  const handleAddAddress = async (values) => {
    console.log(values);

    setSubmitting(true);
    try {
      const newAddress = {
        id: Date.now() + userInfo.id,
        type: values.type || "shipping",
        isPrimary: values.isPrimary || false,
        street: values.address,
        city: values.province,
        state: values.district,
        ward: values.ward,
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

  // Function to handle address deletion
  const handleDeleteAddress = async (addressId) => {
    setDeletingAddress(addressId);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Check if it's the last primary address
      const isPrimaryAddress = userInfo.addresses.find(
        (addr) => addr.id === addressId
      )?.isPrimary;
      const primaryAddressCount = userInfo.addresses.filter(
        (addr) => addr.isPrimary
      ).length;
      if (
        isPrimaryAddress &&
        primaryAddressCount <= 1 &&
        userInfo.addresses.length > 1
      ) {
        message.warning(
          "Không thể xóa địa chỉ chính duy nhất. Vui lòng đặt địa chỉ khác làm địa chỉ chính trước."
        );
        return;
      }

      // Get current addresses
      const currentAddresses = userInfo.addresses;
      // Filter out the address to delete
      const updatedAddresses = currentAddresses.filter(
        (addr) => addr.id !== addressId
      );

      // Create updated user info
      const updatedUserInfo = {
        ...userInfo,
        addresses: updatedAddresses,
      };

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
        throw new Error("Failed to delete address");
      }

      const updatedUser = await response.json();
      setUserInfo(updatedUser);

      message.success("Xóa địa chỉ thành công!");
    } catch (error) {
      console.error("Error deleting address:", error);
      message.error("Không thể xóa địa chỉ. Vui lòng thử lại sau.");
    } finally {
      setDeletingAddress(null);
    }
  };

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <Card className="mb-6 shadow-md border-0 rounded-xl overflow-hidden">
        <Title level={2} className="text-center mb-6 text-blue-700">
          Thông Tin Cá Nhân
        </Title>

        <Tabs
          defaultActiveKey="info"
          className="bg-white rounded-lg"
          type="card"
          tabBarStyle={{ marginBottom: "1rem", fontWeight: "bold" }}
        >
          <TabPane
            tab={
              <span className="flex items-center gap-2">
                <UserOutlined />
                Thông tin cá nhân
              </span>
            }
            key="info"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={24} lg={8}>
                <ProfileCard userInfo={userInfo} />
              </Col>
              <Col xs={24} md={24} lg={16}>
                <BasicInfoCard userInfo={userInfo} />
              </Col>
            </Row>

            <AddressList
              addresses={userInfo.addresses}
              onAddAddress={() => setIsAddressModalVisible(true)}
              onDeleteAddress={handleDeleteAddress}
              deletingAddress={deletingAddress}
            />

            <OtherInfoCard userInfo={userInfo} />
          </TabPane>

          <TabPane
            tab={
              <span className="flex items-center gap-2">
                <ShoppingOutlined />
                Lịch sử đơn hàng
              </span>
            }
            key="orders"
          >
            <OrderHistory orders={orders} loading={loading} />
          </TabPane>
        </Tabs>
      </Card>

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
