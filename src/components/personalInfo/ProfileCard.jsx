import React from "react";
import { Card, Avatar, Typography, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function ProfileCard({ userInfo }) {
  return (
    <Card
      className="h-full shadow-md border-0 rounded-lg transition-all duration-300 hover:shadow-lg"
      cover={
        <div className="!flex justify-center items-center py-6 bg-gradient-to-r from-blue-500 to-cyan-500">
          <Avatar
            size={100}
            icon={<UserOutlined />}
            className="border-4 border-white"
          />
        </div>
      }
    >
      <div className="text-center">
        <Title level={4} className="mb-0">
          {userInfo.firstName} {userInfo.lastName}
        </Title>
        <Text type="secondary" className="block mb-4">
          {userInfo.email}
        </Text>
        <Tag color="blue" className="px-3 py-1 text-sm">
          {userInfo.role === "admin" ? "Quản trị hệ thống" : "Khách hàng"}
        </Tag>
      </div>
    </Card>
  );
}

export default ProfileCard;
