import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  Row,
  Col,
  Button,
  Divider,
  Avatar,
  Tag,
  Space,
  Breadcrumb,
} from "antd";
import {
  ClockCircleOutlined,
  UserOutlined,
  TagOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

// Import images (using the same as in News.jsx)
import img1 from "../img/Header/imgNews/image1.png";
import img2 from "../img/Header/imgNews/image2.png";
import img3 from "../img/Header/imgNews/image3.png";
import img4 from "../img/Header/imgNews/image4.png";
import img5 from "../img/Header/imgNews/image5.png";
import img6 from "../img/Header/imgNews/image6.png";
import img7 from "../img/Header/imgNews/image7.png";
import img8 from "../img/Header/imgNews/image8.png";
import img9 from "../img/Header/imgNews/image9.png";

const { Title, Text, Paragraph } = Typography;

// Mock data for detailed news
const newsDetails = {
  "tre-em-sau-tiem-vac-xin": {
    title: "Trẻ em sau tiêm vắc xin bao lâu thì sốt?",
    date: "20/06/2023",
    author: "Dola Pharmacy",
    content: `
      <p>Khi tiêm vắc xin cho trẻ em, một trong những phản ứng phụ phổ biến mà phụ huynh thường gặp phải là con sốt, khiến bé khó chịu, quấy khóc. Tuy vậy, sốt sau tiêm vắc xin là một phản ứng bình thường, thể hiện cơ thể đang đáp ứng với vắc xin.</p>
      
      <h3>Bao lâu sau khi tiêm vắc xin thì trẻ sốt?</h3>
      
      <p>Tùy thuộc vào loại vắc xin, trẻ có thể sốt sau khi tiêm từ vài giờ đến 1-2 ngày. Thông thường, các trường hợp sốt sau tiêm thường xuất hiện trong vòng 24 giờ đầu tiên và có thể kéo dài 1-2 ngày.</p>
      
      <p>Đối với một số loại vắc xin như:</p>
      <ul>
        <li><strong>Vắc xin sởi, quai bị, rubella (MMR):</strong> Trẻ có thể sốt sau 5-12 ngày tiêm.</li>
        <li><strong>Vắc xin 5 trong 1, 6 trong 1:</strong> Trẻ có thể sốt sau 3-6 giờ tiêm.</li>
        <li><strong>Vắc xin thủy đậu:</strong> Trẻ có thể sốt sau 7-21 ngày tiêm.</li>
      </ul>
      
      <h3>Mức độ sốt sau tiêm vắc xin ở trẻ</h3>
      
      <p>Hầu hết các trường hợp, trẻ chỉ sốt nhẹ (dưới 38.5°C) và sẽ tự khỏi sau 1-2 ngày mà không cần điều trị. Tuy nhiên, một số trường hợp trẻ có thể sốt cao hơn (trên 38.5°C) và cần được theo dõi cẩn thận.</p>
      
      <h3>Cách xử trí khi trẻ sốt sau tiêm vắc xin</h3>
      
      <p>Khi trẻ sốt sau tiêm vắc xin, cha mẹ có thể áp dụng các biện pháp sau:</p>
      <ol>
        <li>Cho trẻ uống nhiều nước để tránh mất nước.</li>
        <li>Mặc quần áo thoáng mát cho trẻ.</li>
        <li>Có thể dùng thuốc hạ sốt như paracetamol với liều lượng phù hợp với cân nặng và độ tuổi của trẻ nếu trẻ sốt trên 38.5°C.</li>
        <li>Không nên tắm cho trẻ ngay khi trẻ đang sốt cao.</li>
      </ol>
      
      <p>Nếu trẻ sốt cao trên 39°C, sốt kéo dài quá 48 giờ, hoặc có các biểu hiện bất thường khác như co giật, li bì, bỏ bú, nôn trớ nhiều... cần đưa trẻ đến cơ sở y tế ngay để được thăm khám và xử trí kịp thời.</p>
    `,
    imageUrl: img1,
    tags: ["Vắc xin", "Sức khỏe trẻ em", "Tiêm chủng"],
    relatedNews: [
      "co-can-xet-nghiem-truoc-khi-di-tiem-hpv",
      "truoc-va-sau-khi-tiem-vac-xin",
      "tham-khao-cac-loai-thuoc-tri-lac-dong-tien",
    ],
  },
  "co-can-xet-nghiem-truoc-khi-di-tiem-hpv": {
    title: "Có cần xét nghiệm trước khi đi tiêm HPV hay không?",
    date: "18/06/2023",
    author: "Dola Pharmacy",
    content: `
      <p>Vắc xin HPV đã được công nhận là biện pháp hiệu quả để ngăn ngừa các bệnh liên quan đến virus HPV, nhưng nhiều người vẫn băn khoăn liệu có cần phải tiến hành xét nghiệm trước khi tiêm vắc xin này hay không.</p>
      
      <h3>Xét nghiệm HPV là gì?</h3>
      
      <p>Xét nghiệm HPV là phương pháp nhằm phát hiện sự hiện diện của virus HPV trong cơ thể, đặc biệt là các typ HPV nguy cơ cao có khả năng gây ung thư. Các xét nghiệm phổ biến bao gồm:</p>
      <ul>
        <li>Xét nghiệm tế bào học cổ tử cung (Pap smear)</li>
        <li>Xét nghiệm DNA HPV</li>
        <li>Xét nghiệm đồng thời Pap và HPV DNA (Co-test)</li>
      </ul>
      
      <h3>Có cần xét nghiệm trước khi tiêm vắc xin HPV không?</h3>
      
      <p>Theo hướng dẫn của Tổ chức Y tế Thế giới (WHO) và các tổ chức y tế uy tín khác, <strong>không cần thiết</strong> phải xét nghiệm HPV trước khi tiêm vắc xin. Lý do là:</p>
      
      <ol>
        <li>Vắc xin HPV có hiệu quả cao nhất khi được tiêm trước khi tiếp xúc với virus, thường là trước khi có quan hệ tình dục.</li>
        <li>Ngay cả khi đã nhiễm một số typ HPV, vắc xin vẫn có thể bảo vệ chống lại các typ HPV khác mà vaccine có khả năng phòng ngừa.</li>
        <li>Không có bằng chứng cho thấy việc tiêm vắc xin HPV ở những người đã nhiễm HPV sẽ gây hại.</li>
      </ol>
      
      <h3>Ai nên tiêm vắc xin HPV?</h3>
      
      <p>Vắc xin HPV được khuyến cáo tiêm cho:</p>
      <ul>
        <li>Trẻ em và thanh thiếu niên từ 9-14 tuổi (cả nam và nữ)</li>
        <li>Phụ nữ từ 15-26 tuổi</li>
        <li>Nam giới từ 15-21 tuổi</li>
        <li>Người trưởng thành đến 45 tuổi có thể tiêm sau khi tham khảo ý kiến bác sĩ</li>
      </ul>
      
      <p>Tóm lại, không cần thiết phải xét nghiệm HPV trước khi tiêm vắc xin. Tuy nhiên, việc khám sức khỏe tổng quát và tham khảo ý kiến bác sĩ trước khi tiêm vẫn là điều nên làm để đảm bảo an toàn và hiệu quả.</p>
    `,
    imageUrl: img2,
    tags: ["HPV", "Vắc xin", "Tiêm chủng"],
    relatedNews: [
      "tre-em-sau-tiem-vac-xin",
      "truoc-va-sau-khi-tiem-vac-xin",
      "nguoi-bi-u-huyet-giap-co-uong-duoc-collagen",
    ],
  },
  "truoc-va-sau-khi-tiem-vac-xin": {
    title: "Trước và sau khi tiêm vắc xin có ăn gì, nên ăn gì?",
    date: "15/06/2023",
    author: "Dola Pharmacy",
    content: `<p>Nội dung chi tiết về chế độ ăn uống trước và sau khi tiêm vắc xin...</p>`,
    imageUrl: img3,
    tags: ["Vắc xin", "Dinh dưỡng", "Sức khỏe"],
    relatedNews: [
      "tre-em-sau-tiem-vac-xin",
      "co-can-xet-nghiem-truoc-khi-di-tiem-hpv",
    ],
  },
  "tham-khao-cac-loai-thuoc-tri-lac-dong-tien": {
    title: "Tham khảo các loại thuốc trị lạc đồng tiền hiệu quả",
    date: "12/06/2023",
    author: "Dola Pharmacy",
    content: `<p>Thông tin về các loại thuốc điều trị lạc đồng tiền...</p>`,
    imageUrl: img4,
    tags: ["Thuốc", "Lạc đồng tiền", "Da liễu"],
    relatedNews: ["nguoi-bi-u-huyet-giap-co-uong-duoc-collagen"],
  },
  "nguoi-bi-u-huyet-giap-co-uong-duoc-collagen": {
    title: "Người bị u huyết giáp có uống được collagen không?",
    date: "10/06/2023",
    author: "Dola Pharmacy",
    content: `<p>Chi tiết về việc sử dụng collagen cho người bị u huyết giáp...</p>`,
    imageUrl: img5,
    tags: ["Collagen", "U huyết giáp", "Thực phẩm chức năng"],
    relatedNews: ["tham-khao-cac-loai-thuoc-tri-lac-dong-tien"],
  },
};

// Function to get related news data
const getRelatedNews = (relatedSlugs) => {
  const allNews = [
    {
      id: 1,
      date: "20/06/2023",
      title: "Trẻ em sau tiêm vắc xin bao lâu thì sốt?",
      imageUrl: img1,
      slug: "tre-em-sau-tiem-vac-xin",
    },
    {
      id: 2,
      date: "18/06/2023",
      title: "Có cần xét nghiệm trước khi đi tiêm HPV hay không?",
      imageUrl: img2,
      slug: "co-can-xet-nghiem-truoc-khi-di-tiem-hpv",
    },
    {
      id: 3,
      date: "15/06/2023",
      title: "Trước và sau khi tiêm vắc xin có ăn gì, nên ăn gì?",
      imageUrl: img3,
      slug: "truoc-va-sau-khi-tiem-vac-xin",
    },
    {
      id: 4,
      date: "12/06/2023",
      title: "Tham khảo các loại thuốc trị lạc đồng tiền hiệu quả",
      imageUrl: img4,
      slug: "tham-khao-cac-loai-thuoc-tri-lac-dong-tien",
    },
    {
      id: 5,
      date: "10/06/2023",
      title: "Người bị u huyết giáp có uống được collagen không?",
      imageUrl: img5,
      slug: "nguoi-bi-u-huyet-giap-co-uong-duoc-collagen",
    },
  ];

  return allNews.filter((news) => relatedSlugs.includes(news.slug));
};

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch news data
    if (slug && newsDetails[slug]) {
      setNewsData(newsDetails[slug]);
      setRelatedNews(getRelatedNews(newsDetails[slug].relatedNews));
      setLoading(false);
    } else {
      // Navigate to 404 page if news not found
      navigate("/404");
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Title level={3}>Đang tải...</Title>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <Breadcrumb
        style={{ marginBottom: 20 }}
        items={[
          { title: "Trang chủ", href: "/" },
          { title: "Tin tức", href: "/news" },
          { title: newsData.title },
        ]}
      />

      <Row gutter={24}>
        <Col xs={24} lg={16}>
          <Card>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/news")}
              style={{ marginBottom: 16 }}
            >
              Quay lại danh sách tin
            </Button>

            <div style={{ marginBottom: 24 }}>
              <Title level={2} style={{ marginBottom: 16 }}>
                {newsData.title}
              </Title>

              <Space style={{ marginBottom: 16 }}>
                <Space>
                  <ClockCircleOutlined style={{ color: "#1890ff" }} />
                  <Text type="secondary">{newsData.date}</Text>
                </Space>

                <Space>
                  <UserOutlined style={{ color: "#1890ff" }} />
                  <Text type="secondary">{newsData.author}</Text>
                </Space>
              </Space>

              <div>
                <img
                  src={newsData.imageUrl}
                  alt={newsData.title}
                  style={{
                    width: "100%",
                    maxHeight: 400,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginBottom: 20,
                  }}
                />
              </div>

              <div
                className="news-content"
                dangerouslySetInnerHTML={{ __html: newsData.content }}
                style={{
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "#333",
                }}
              />

              <Divider />

              <div>
                <Space align="center">
                  <TagOutlined style={{ color: "#1890ff" }} />
                  <Text type="secondary">Tags:</Text>
                  {newsData.tags.map((tag) => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </Space>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: 18, color: "white" }}>
                  Tin liên quan
                </span>
              </div>
            }
            headStyle={{ backgroundColor: "#1890ff", color: "white" }}
          >
            {relatedNews.map((item, index) => (
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
                {index < relatedNews.length - 1 && (
                  <Divider style={{ margin: "0" }} />
                )}
              </React.Fragment>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
