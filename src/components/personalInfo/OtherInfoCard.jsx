import React from "react";
import { Card, Typography, Divider, Row, Col } from "antd";
import { HistoryOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function OtherInfoCard({ userInfo }) {
  return (
    <Card className="mt-6 shadow-md border-0 rounded-lg">
      <Title className="flex items-center gap-2 text-blue-700 mb-4">
        <HistoryOutlined /> Thông Tin Khác
      </Title>
      <Divider className="my-3" />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <div className="bg-gray-50 p-3 rounded-md">
            <Text type="secondary" className="block">
              Ngày Tạo Tài Khoản
            </Text>
            <Text strong>{new Date(userInfo.createdAt).toLocaleString()}</Text>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="bg-gray-50 p-3 rounded-md">
            <Text type="secondary" className="block">
              Cập Nhật Gần Nhất
            </Text>
            <Text strong>{new Date(userInfo.updatedAt).toLocaleString()}</Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default OtherInfoCard;
