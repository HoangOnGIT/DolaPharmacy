import React from "react";
import VideoThumbNail from "../components/video/VideoThumbNail";
import {
  Typography,
  Row,
  Col,
  Card,
  Breadcrumb,
  Divider,
  Input,
  Button,
} from "antd";
import {
  VideoCameraOutlined,
  ReadOutlined,
  ThunderboltOutlined,
  MailOutlined,
} from "@ant-design/icons";
import img1 from "../img/Header/imgNews/image1.png";
import img2 from "../img/Header/imgNews/image2.png";
import img3 from "../img/Header/imgNews/image3.png";
import img4 from "../img/Header/imgNews/image4.png";
import img5 from "../img/Header/imgNews/image5.png";
import img6 from "../img/Header/imgNews/image6.png";
import img7 from "../img/Header/imgNews/image7.png";
import img8 from "../img/Header/imgNews/image8.png";
import img9 from "../img/Header/imgNews/image9.png";
const { Title, Text } = Typography;

function Video() {
  const healthVideos = [
    {
      url: "https://picsum.photos/id/237/200/150",
      title: "Hà Nội - Obito ft. VSTRA (rmx) | Remake",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744191734/H%C3%A0_N%E1%BB%99i_-_Obito_ft._VSTRA_rmx_Remake_xlvieb.mp4",
    },
    {
      url: "https://picsum.photos/id/239/200/150",
      title: "Falling behind // thought you wanted to dance - transition",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744194752/falling_behind_thought_you_wanted_to_dance_-_transition_ocnhgw.mp4",
    },
    {
      url: "https://picsum.photos/id/254/200/150",
      title: "Ngọt - LẦN CUỐI (đi bên em xót xa người ơi)",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744191734/H%C3%A0_N%E1%BB%99i_-_Obito_ft._VSTRA_rmx_Remake_xlvieb.mp4",
    },
    {
      url: "https://picsum.photos/id/241/200/150",
      title: "Hà Nội - Obito ft. VSTRA (rmx) | Remake",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744191734/H%C3%A0_N%E1%BB%99i_-_Obito_ft._VSTRA_rmx_Remake_xlvieb.mp4",
    },
    {
      url: "https://picsum.photos/id/653/200/150",
      title: "Hà Nội - Obito ft. VSTRA (rmx) | Remake",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744191734/H%C3%A0_N%E1%BB%99i_-_Obito_ft._VSTRA_rmx_Remake_xlvieb.mp4",
    },
    {
      url: "https://picsum.photos/id/143/200/150",
      title: "Hà Nội - Obito ft. VSTRA (rmx) | Remake",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744191734/H%C3%A0_N%E1%BB%99i_-_Obito_ft._VSTRA_rmx_Remake_xlvieb.mp4",
    },
  ];

  // Function to get current date in DD/MM/YYYY format
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const currentDate = getCurrentDate();

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

  return (
    <div style={{ maxWidth: 1600, margin: "0 auto", padding: "20px 40px" }}>
      <Breadcrumb
        style={{ marginBottom: 20 }}
        items={[{ title: "Trang chủ", href: "/" }, { title: "Video" }]}
      />

      <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
        Video Sức Khỏe
      </Title>

      <Row gutter={24}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <VideoCameraOutlined
                  style={{ marginRight: 10, color: "#fff" }}
                />
                <span style={{ fontSize: 18 }}>Video Nổi Bật</span>
              </div>
            }
            headStyle={{ backgroundColor: "#1890ff", color: "white" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {healthVideos.map((video, index) => (
                <div key={index} style={{ marginBottom: 20 }}>
                  <VideoThumbNail urlObj={video} />
                </div>
              ))}
            </div>
          </Card>
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

export default Video;
