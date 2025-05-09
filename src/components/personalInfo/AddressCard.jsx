import React from "react";
import { Card, Typography, Tag, Button, Divider, Popconfirm } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

function AddressCard({ address, onDelete, loading }) {
  return (
    <Card
      className="h-full shadow-sm border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md"
      hoverable
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <EnvironmentOutlined className="text-blue-500" />
          <Text strong className="capitalize">
            {address.type}
          </Text>
        </div>
        {address.isPrimary && (
          <Tag color="blue" className="px-2 py-0.5">
            Địa chỉ chính
          </Tag>
        )}
      </div>

      <Divider className="my-2" />

      <Paragraph className="mb-1">
        <Text strong>
          {address.firstName} {address.lastName}
        </Text>
      </Paragraph>
      <Paragraph className="mb-1 text-gray-600">
        {address.street}, {address.ward}, {address.state}
      </Paragraph>
      <Paragraph className="mb-1 text-gray-600">
        {address.city}, {address.postalCode || ""}
        {address.country ? `, ${address.country}` : ""}
      </Paragraph>
      <Paragraph className="mb-3 text-gray-600">
        <strong>SĐT:</strong> {address.phone}
      </Paragraph>

      <div className="flex justify-end">
        <Popconfirm
          title="Xóa địa chỉ này?"
          description="Bạn có chắc chắn muốn xóa địa chỉ này không?"
          onConfirm={() => onDelete(address.id)}
          okText="Xóa"
          cancelText="Hủy"
          okButtonProps={{ danger: true }}
        >
          <Button
            danger
            loading={loading === address.id}
            className="hover:bg-red-50"
          >
            Xóa
          </Button>
        </Popconfirm>
      </div>
    </Card>
  );
}

export default AddressCard;
