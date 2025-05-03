import React from "react";
import { Form, Input, Button, message } from "antd";
import { SendOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import FAQSection from "../components/FAQ/FAQSection";

const { TextArea } = Input;

function QnA() {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    message.success("Câu hỏi của bạn đã được gửi thành công!");
    //api

    form.resetFields();
  };

  const questionsData = [
    {
      id: "account",
      title: "Hỏi đáp về tài khoản",
      questions: [
        {
          id: 1,
          question: "Làm thế nào để tải trò thành thành viên của Dola?",
          answer:
            "Quý khách vui lòng nhấn vào nút 'Đăng ký' ở thanh menu trên cùng của màn hình (Đối với Desktop) hoặc là gạt trái màn hình, chọn biểu tượng Menu rồi chọn 'Đăng ký' (Đối với Mobile)",
        },
        {
          id: 2,
          question: "Tại sao tôi không thể đăng nhập vào tài khoản của tôi?",
          answer:
            'Quý khách vui lòng kiểm tra lại xem, gõ hoặc nhấn Caps Lock/ IN HOA trong quá trình điền thông tin đăng nhập thanh viên, trường hợp không thể đăng nhập thêm cùng quá khách vui lòng chọn mục "Quên mật khẩu" ngay dưới ô mật khẩu và nhập email đã đăng ký.',
        },
        {
          id: 3,
          question:
            "Tôi có thể sử dụng chung tài khoản với người khác được không?",
          answer:
            "Không, mỗi tài khoản chỉ được sử dụng bởi một người dùng duy nhất.",
        },
        {
          id: 4,
          question: "Tại sao tôi nên đăng ký thành viên Dola?",
          answer:
            "Đăng ký thành viên Dola giúp bạn theo dõi đơn hàng, tích lũy điểm thưởng và nhận các ưu đãi đặc biệt.",
        },
        {
          id: 5,
          question:
            "Dola có chương trình ưu đãi nào hấp dẫn dành cho khách hàng thân thiết?",
          answer:
            "Dola có nhiều chương trình ưu đãi cho khách hàng thân thiết như tích điểm đổi quà, giảm giá đặc biệt và quà tặng sinh nhật.",
        },
      ],
    },
    {
      id: "order",
      title: "Hỏi đáp về đặt hàng",
      questions: [
        {
          id: 1,
          question: "Tôi có thể đặt hàng bằng những hình thức nào?",
          answer:
            "Quý khách có thể mua hàng tại Dola bằng những hình thức sau:\n" +
            "- Đặt hàng trực tiếp tại website Dola\n" +
            "- Đặt hàng trực tiếp và tư vấn qua Hotline 1900-6700\n" +
            "- Đặt hàng trực tuyến trên các sàn thương mại điện tử\n" +
            "- Mua hàng trực tiếp tại các hệ thống cửa hàng\n" +
            "- Dola luôn khuyên khách quý khách nên đặt hàng và đặt hàng online để được hưởng các chính sách ưu đãi dành riêng cho đối nền.",
        },
        {
          id: 2,
          question:
            "Tôi còn hỏ trợ mua hàng, làm cách nào để liên hệ với tư vấn viên?",
          answer:
            "Quý khách có thể liên hệ hotline 1900-6700 để được tư vấn trực tiếp.",
        },
        {
          id: 3,
          question: "Dola có giới hạn về số lượng sản phẩm khi đặt hàng không?",
          answer: "Không, Dola không giới hạn số lượng sản phẩm khi đặt hàng.",
        },
        {
          id: 4,
          question: "Tôi muốn xem lại lịch sử đơn hàng đã mua?",
          answer:
            "Quý khách có thể xem lịch sử đơn hàng bằng cách đăng nhập vào tài khoản và vào mục Đơn hàng của tôi.",
        },
        {
          id: 5,
          question: "Tôi cần làm gì để thay đổi hoặc hủy bỏ đơn hàng đã đặt?",
          answer:
            "Để thay đổi hoặc hủy đơn hàng, quý khách vui lòng liên hệ hotline 1900-6700 trong vòng 30 phút sau khi đặt hàng.",
        },
        {
          id: 6,
          question:
            "Tôi muốn khiếu nại/ đổi trả hàng, quy trình thực hiện như thế nào?",
          answer:
            "Quý khách vui lòng liên hệ hotline 1900-6700 để được hướng dẫn quy trình khiếu nại/đổi trả hàng.",
        },
      ],
    },
    {
      id: "payment",
      title: "Hỏi đáp về thanh toán",
      questions: [
        {
          id: 1,
          question: "Tôi có thể thanh toán đơn hàng bằng những hình thức nào?",
          answer:
            "Quý khách có thể thanh toán cho Dola bằng những hình thức sau:\n" +
            "1. Thanh toán trực tiếp (thu COD)\n" +
            "2. Chuyển khoản trước khoản hàng có thể chọn chuyển khoản trước vào tài khoản của Dola.",
        },
      ],
    },
    {
      id: "shipping",
      title: "Hỏi đáp về giao hàng",
      questions: [
        {
          id: 1,
          question: "Tôi không ở Hồ Chí Minh, Dola có thể trợ giao hàng không?",
          answer:
            "Dola áp dụng giao hàng trên toàn quốc cho tất cả giá trị đơn hàng. Phí vận chuyển và thời gian giao hàng sẽ thay đổi tùy thuộc vào giá trị đơn hàng và tùng khu vực cụ thể.",
        },
        {
          id: 2,
          question: "Tôi có được hỗ trợ phí vận chuyển không?",
          answer:
            "Dola hỗ trợ phí vận chuyển cho đơn hàng có giá trị từ 300.000đ trở lên.",
        },
        {
          id: 3,
          question:
            "Bao lâu thì tôi sẽ nhận được sản phẩm sau khi hoàn tất đặt hàng?",
          answer:
            "Thời gian giao hàng từ 1-3 ngày đối với khu vực TP.HCM và 3-5 ngày đối với các tỉnh thành khác.",
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Hỏi đáp và hỗ trợ
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* FAQ Sections */}
        <div className="flex-1 bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center mb-6 border-b border-gray-200 pb-4">
            <div className="bg-blue-100 rounded-full p-2 mr-3">
              <QuestionCircleOutlined className="text-blue-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 !mb-0">
              Câu hỏi thường gặp
            </h2>
          </div>

          <div className="space-y-6">
            {questionsData.map((section) => (
              <FAQSection key={section.id} section={section} />
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full h-fit lg:w-96 bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-6 border-b border-gray-200 pb-4">
            <div className="bg-blue-100 rounded-full p-2 mr-3">
              <SendOutlined className="text-blue-600 text-xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 !mb-0">
              Gửi câu hỏi mới
            </h2>
          </div>

          <p className="text-gray-600 mb-6 text-sm">
            Nếu bạn có thắc mắc chưa được giải đáp, hãy gửi yêu cầu cho chúng
            tôi. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
          </p>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-4"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input
                placeholder="Họ và tên"
                size="large"
                className="rounded-md hover:border-blue-400 focus:border-blue-500 shadow-sm"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                placeholder="Email"
                size="large"
                className="rounded-md hover:border-blue-400 focus:border-blue-500 shadow-sm"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input
                placeholder="Điện thoại"
                size="large"
                className="rounded-md hover:border-blue-400 focus:border-blue-500 shadow-sm"
              />
            </Form.Item>

            <Form.Item
              name="content"
              rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
            >
              <TextArea
                placeholder="Nội dung câu hỏi"
                autoSize={{ minRows: 4, maxRows: 6 }}
                size="large"
                className="rounded-md hover:border-blue-400 focus:border-blue-500 resize-none shadow-sm"
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<SendOutlined />}
                className="bg-blue-600 hover:bg-blue-700 w-full h-12 rounded-md shadow-sm hover:shadow transition-all duration-300"
              >
                Gửi câu hỏi
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default QnA;
