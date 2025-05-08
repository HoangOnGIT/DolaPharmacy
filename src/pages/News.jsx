import React from "react";
import NewsItem from "../components/news/NewsItem";
import LatestNewsItem from "../components/news/LatestNewsItem";
import {
  Typography,
  Card,
  Row,
  Col,
  Input,
  Button,
  Divider,
  Breadcrumb,
} from "antd";
import { ThunderboltOutlined, MailOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Import Ant Design styles

import img1 from "../img/Header/imgNews/image1.png";
import img2 from "../img/Header/imgNews/image2.png";
import img3 from "../img/Header/imgNews/image3.png";
import img4 from "../img/Header/imgNews/image4.png";
import img5 from "../img/Header/imgNews/image5.png";
import img6 from "../img/Header/imgNews/image6.png";
import img7 from "../img/Header/imgNews/image7.png";
import img8 from "../img/Header/imgNews/image8.png";
import img9 from "../img/Header/imgNews/image9.png";

// Function to get current date in DD/MM/YYYY format
const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};

const currentDate = getCurrentDate();

const newsData = [
  {
    id: 1,
    date: currentDate,
    title: "Trẻ em sau tiêm vắc xin bao lâu thì sốt?",
    excerpt:
      "Khi tiêm vắc xin cho trẻ em, một trong những phản ứng phụ phổ biến mà phụ huynh thường gặp phải là con sốt, khiến bé khó chịu, quấy khóc. Tuy vậy...",
    imageUrl: img1,
    slug: "tre-em-sau-tiem-vac-xin",
  },
  {
    id: 2,
    date: currentDate,
    title: "Có cần xét nghiệm trước khi đi tiêm HPV hay không?",
    excerpt:
      "Ác xin HPV đã được công nhận là biện pháp dụng phòng đối với ngăn ngừa các bệnh liên quan đến virus HPV, nhưng liệu có cần phải tiến hành xét...",
    imageUrl: img2,
    slug: "co-can-xet-nghiem-truoc-khi-di-tiem-hpv",
  },
  {
    id: 3,
    date: currentDate,
    title: "Trước và sau khi tiêm vắc xin có ăn gì, nên ăn gì?",
    excerpt:
      "Nhiều người băn khoăn không biết cách thức và sau khi tiêm vắc xin có được ăn trứng hay trái chuối trong trong trạng văn hỏi trả lời minh ách với thông thường như...",
    imageUrl: img3,
    slug: "truoc-va-sau-khi-tiem-vac-xin",
  },
  {
    id: 4,
    date: currentDate,
    title: "Tham khảo các loại thuốc trị lạc đồng tiền hiệu quả",
    excerpt:
      "Trong bài viết này, chúng ta sẽ cùng tìm hiểu bệnh lạc đồng tiền và các loại thuốc trị trị lạc đồng tiền hiệu quả, giúp làm tối ưu quá...",
    imageUrl: img4,
    slug: "tham-khao-cac-loai-thuoc-tri-lac-dong-tien",
  },
  {
    id: 5,
    date: currentDate,
    title: "Người bị ư huyết giáp có uống được collagen không?",
    excerpt:
      "Người bị ư huyết giáp có uống được collagen không? Đây đang là vấn đề băn khoăn của rất nhiều chị em phụ nữ, đặc biệt là những người yêu...",
    imageUrl: img5,
    slug: "nguoi-bi-u-huyet-giap-co-uong-duoc-collagen",
  },
];

const latestNews = [
  {
    id: 1,
    date: currentDate,
    title: "Trẻ em sau tiêm vắc xin bao lâu thì sốt?",
    imageUrl: img6,
    slug: "tre-em-sau-tiem-vac-xin",
  },
  {
    id: 2,
    date: currentDate,
    title: "Có cần xét nghiệm trước khi đi tiêm HPV hay không?",
    imageUrl: img7,
    slug: "co-can-xet-nghiem-truoc-khi-di-tiem-hpv",
  },
  {
    id: 3,
    date: currentDate,
    title: "Trước và sau khi tiêm vắc xin có ăn gì, nên ăn gì?",
    imageUrl: img8,
    slug: "truoc-va-sau-khi-tiem-vac-xin",
  },
  {
    id: 4,
    date: currentDate,
    title: "Tham khảo các loại thuốc trị lạc đồng tiền hiệu quả",
    imageUrl: img9,
    slug: "tham-khao-cac-loai-thuoc-tri-lac-dong-tien",
  },
  {
    id: 5,
    date: currentDate,
    title: "Người bị ư huyết giáp có uống được collagen không?",
    imageUrl: img5,
    slug: "nguoi-bi-u-huyet-giap-co-uong-duoc-collagen",
  },
];

const { Title, Text } = Typography;

export default function News() {
  return (
    <div style={{ maxWidth: "80%", margin: "0 auto", padding: "20px" }}>
      <Breadcrumb
        style={{ marginBottom: 20 }}
        items={[{ title: "Trang chủ", href: "/" }, { title: "Tin tức" }]}
      />

      <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
        Tin Tức Y Tế
      </Title>

      <Row gutter={24}>
        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]}>
            {newsData.map((news) => (
              <Col xs={24} sm={12} md={8} key={news.id}>
                <Card
                  hoverable
                  className="h-full"
                  bodyStyle={{ padding: 0 }}
                  cover={
                    <div className="overflow-hidden" style={{ height: 200 }}>
                      <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  }
                >
                  <div style={{ padding: 16 }}>
                    <Text
                      type="secondary"
                      style={{ display: "block", marginBottom: 8 }}
                    >
                      {news.date}
                    </Text>
                    <Title level={4} style={{ marginTop: 0, marginBottom: 12 }}>
                      {news.title}
                    </Title>
                    <Text style={{ display: "block", marginBottom: 16 }}>
                      {news.excerpt}
                    </Text>
                    <Button type="primary" href={`/news/${news.slug}`}>
                      Đọc thêm
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <ThunderboltOutlined
                  style={{ color: "white", marginRight: 8 }}
                />
                <span style={{ fontSize: 18, color: "white" }}>
                  Tin mới nhất
                </span>
              </div>
            }
            headStyle={{ backgroundColor: "#1890ff", color: "white" }}
            style={{ marginBottom: 20 }}
          >
            {latestNews.map((item, index) => (
              <React.Fragment key={item.id}>
                <div style={{ display: "flex", padding: "12px 0" }}>
                  <div
                    style={{
                      flexShrink: 0,
                      marginRight: 12,
                      width: 80,
                      height: 80,
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  </div>
                  <div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {item.date}
                    </Text>
                    <Title level={5} style={{ margin: "4px 0", fontSize: 14 }}>
                      <a href={`/news/${item.slug}`}>{item.title}</a>
                    </Title>
                  </div>
                </div>
                {index < latestNews.length - 1 && (
                  <Divider style={{ margin: "0" }} />
                )}
              </React.Fragment>
            ))}
          </Card>

          <Card
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <MailOutlined style={{ color: "white", marginRight: 8 }} />
                <span style={{ fontSize: 18, color: "white" }}>
                  Nhận tin tức mới nhất
                </span>
              </div>
            }
            headStyle={{ backgroundColor: "#1890ff", color: "white" }}
          >
            <Text style={{ display: "block", marginBottom: 16 }}>
              Đăng ký nhận bản tin để cập nhật thông tin y tế mới nhất
            </Text>
            <Input.Group compact style={{ display: "flex" }}>
              <Input style={{ flexGrow: 1 }} placeholder="Email của bạn" />
              <Button type="primary">Đăng ký</Button>
            </Input.Group>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
