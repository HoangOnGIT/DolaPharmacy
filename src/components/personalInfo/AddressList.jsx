import React from "react";
import { Card, Typography, Button, Divider, Empty, Row, Col } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import AddressCard from "./AddressCard";

const { Title } = Typography;

function AddressList({
  addresses,
  onAddAddress,
  onDeleteAddress,
  deletingAddress,
}) {
  return (
    <Card className="mt-6 shadow-md border-0 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <Title className="flex items-center gap-2 text-blue-700 mb-0">
          <EnvironmentOutlined /> Địa Chỉ
        </Title>
        <Button
          type="primary"
          className="bg-green-600 hover:bg-green-700 flex items-center"
          size="middle"
          onClick={onAddAddress}
          icon={<EnvironmentOutlined />}
        >
          Thêm địa chỉ
        </Button>
      </div>
      <Divider className="my-3" />

      {addresses && addresses.length > 0 ? (
        <Row gutter={[16, 16]}>
          {addresses.map((address) => (
            <Col xs={24} md={12} lg={8} key={address.id}>
              <AddressCard
                address={address}
                onDelete={onDeleteAddress}
                loading={deletingAddress}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          description="Bạn chưa có địa chỉ nào"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          className="my-8"
        >
          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-600"
            onClick={onAddAddress}
          >
            Thêm địa chỉ ngay
          </Button>
        </Empty>
      )}
    </Card>
  );
}

export default AddressList;
