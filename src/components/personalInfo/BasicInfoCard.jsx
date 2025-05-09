import React from "react";
import { Card, Typography, Divider, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function BasicInfoCard({ userInfo }) {
  return (
    <Card className="h-full shadow-md border-0 rounded-lg transition-all duration-300 hover:shadow-lg">
      <Title level={4} className="flex items-center gap-2 text-blue-700 mb-4">
        <UserOutlined /> Thông Tin Cơ Bản
      </Title>
      <Divider className="my-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded-md">
          <Text type="secondary" className="block">
            Email
          </Text>
          <Text strong>{userInfo.email}</Text>
        </div>
        <div className="bg-gray-50 p-3 rounded-md">
          <Text type="secondary" className="block">
            Họ và Tên
          </Text>
          <Text strong>
            {userInfo.firstName} {userInfo.lastName}
          </Text>
        </div>
        <div className="bg-gray-50 p-3 rounded-md">
          <Text type="secondary" className="block">
            Số Điện Thoại
          </Text>
          <Text strong>{userInfo.phone || "Chưa cập nhật"}</Text>
        </div>
        <div className="bg-gray-50 p-3 rounded-md">
          <Text type="secondary" className="block">
            Ngày Sinh
          </Text>
          <Text strong>{userInfo.dateOfBirth || "Chưa cập nhật"}</Text>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <Text type="secondary" className="block">
            Trạng Thái Xác Minh
          </Text>
          <Text strong>
            {userInfo.verificationStatus === "verified" ? (
              <Tag color="green">Đã xác minh</Tag>
            ) : (
              <Tag color="orange">Chưa xác minh</Tag>
            )}
          </Text>
        </div>
        <div className="bg-gray-50 p-3 rounded-md">
          <Text type="secondary" className="block">
            Lần Đăng Nhập Cuối
          </Text>
          <Text strong>{new Date(userInfo.lastLogin).toLocaleString()}</Text>
        </div>
      </div>
    </Card>
  );
}

export default BasicInfoCard;
