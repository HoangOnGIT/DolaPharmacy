import React from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Divider,
  message,
  Breadcrumb,
} from "antd";
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "antd/dist/reset.css"; // Import Ant Design styles
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default marker icon in leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function Contact() {
  const storePosition = [10.7631, 106.65];

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    message.success("Cảm ơn bạn đã liên hệ với chúng tôi!");
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <Breadcrumb
        style={{ marginBottom: 20 }}
        items={[{ title: "Trang chủ", href: "/" }, { title: "Liên hệ" }]}
      />

      <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
        Liên Hệ
      </Title>

      <Row gutter={24}>
        <Col xs={24} lg={12}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <Card
              title={
                <span style={{ fontSize: 18 }}>Cửa hàng Dola Pharmacy</span>
              }
              headStyle={{ backgroundColor: "#1890ff", color: "white" }}
            >
              <div style={{ display: "flex", marginBottom: 16 }}>
                <EnvironmentOutlined
                  style={{
                    fontSize: 18,
                    color: "#1890ff",
                    marginRight: 10,
                    marginTop: 4,
                  }}
                />
                <div>
                  <Text strong>Địa chỉ</Text>
                  <div>70 Lữ Gia, Phường 15, Quận 11, TPHCM</div>
                </div>
              </div>

              <div style={{ display: "flex", marginBottom: 16 }}>
                <ClockCircleOutlined
                  style={{
                    fontSize: 18,
                    color: "#1890ff",
                    marginRight: 10,
                    marginTop: 4,
                  }}
                />
                <div>
                  <Text strong>Thời gian làm việc</Text>
                  <div>8h - 22h</div>
                  <div>Từ thứ 2 đến chủ nhật</div>
                </div>
              </div>

              <div style={{ display: "flex", marginBottom: 16 }}>
                <PhoneOutlined
                  style={{
                    fontSize: 18,
                    color: "#1890ff",
                    marginRight: 10,
                    marginTop: 4,
                  }}
                />
                <div>
                  <Text strong>Hotline</Text>
                  <div>1900 6750</div>
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <MailOutlined
                  style={{
                    fontSize: 18,
                    color: "#1890ff",
                    marginRight: 10,
                    marginTop: 4,
                  }}
                />
                <div>
                  <Text strong>Email</Text>
                  <div>support@sapo.vn</div>
                </div>
              </div>
            </Card>

            <Card
              title={
                <span style={{ fontSize: 18 }}>Liên hệ với chúng tôi</span>
              }
              headStyle={{ backgroundColor: "#1890ff", color: "white" }}
            >
              <Text style={{ display: "block", marginBottom: 16 }}>
                Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và
                chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể.
              </Text>

              <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Vui lòng nhập họ và tên!" },
                  ]}
                >
                  <Input placeholder="Họ và tên" />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email!" },
                    { type: "email", message: "Email không hợp lệ!" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                  ]}
                >
                  <Input placeholder="Điện thoại" />
                </Form.Item>

                <Form.Item
                  name="message"
                  rules={[
                    { required: true, message: "Vui lòng nhập nội dung!" },
                  ]}
                >
                  <TextArea rows={4} placeholder="Nội dung" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Gửi thông tin
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </Col>

        <Col xs={24} lg={12}>
          <Card bodyStyle={{ padding: 0, height: 600 }}>
            <MapContainer
              center={storePosition}
              zoom={15}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={storePosition}>
                <Popup>
                  <strong>Dola Pharmacy</strong>
                  <br />
                  70 Lữ Gia, Phường 15, Quận 11, TPHCM
                  <br />
                  <a href="tel:19006750">1900 6750</a>
                </Popup>
              </Marker>
            </MapContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
