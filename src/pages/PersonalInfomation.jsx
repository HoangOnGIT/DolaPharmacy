import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Card, Typography, Spin } from "antd";

const { Title, Text } = Typography;

function PersonalInfomation() {
  const { user, logout, isAuthenticated } = useAuth();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`http://localhost:3000/api/users/${user.id}`)
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
    } else {
      alert("Vui lòng đăng nhập lại tài khoản");
      logout();
    }
  }, []);

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Title level={2} className="text-center mb-6">
        Thông Tin Cá Nhân
      </Title>
      <Card className="mb-6 shadow-md">
        <Title level={4}>Thông Tin Cơ Bản</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Text>
            <strong>ID:</strong> {userInfo.id}
          </Text>
          <Text>
            <strong>Email:</strong> {userInfo.email}
          </Text>
          <Text>
            <strong>Họ và Tên:</strong> {userInfo.firstName} {userInfo.lastName}
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
            <strong>Trạng Thái Xác Minh:</strong> {userInfo.verificationStatus}
          </Text>
          <Text>
            <strong>Lần Đăng Nhập Cuối:</strong>{" "}
            {new Date(userInfo.lastLogin).toLocaleString()}
          </Text>
        </div>
      </Card>
      <Card className="mb-6 shadow-md">
        <Title level={4}>Địa Chỉ</Title>
        {userInfo.addresses.map((address) => (
          <Card
            key={address.id}
            className="mb-4 shadow-sm border border-gray-200"
          >
            <Text>
              <strong>Loại:</strong> {address.type}
            </Text>
            <br />
            <Text>
              <strong>Họ và Tên:</strong> {address.firstName} {address.lastName}
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
      <Card className="shadow-md">
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
    </div>
  );
}

export default PersonalInfomation;
