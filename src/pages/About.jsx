import { Breadcrumb } from "antd";
import React from "react";

function About() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-400 py-10 text-white shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg tracking-tight">
            Giới thiệu
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto font-medium drop-shadow">
            Dola Pharmacy - Điểm đến tin cậy cho sức khỏe của bạn!
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl shadow-xl p-10 mb-4 border-l-8 border-blue-400 hover:scale-[1.015] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-blue-700 mb-4 border-b-2 border-blue-100 pb-2">
              Sứ mệnh của chúng tôi
            </h2>
            <p className="text-lg mb-2 text-gray-700 leading-relaxed">
              Dola Pharmacy, là một nhà thuốc hàng đầu, cung cấp cho khách hàng
              những dịch vụ chăm sóc sức khỏe chất lượng, chuyên nghiệp, và đáng
              tin cậy nhất. Với hơn 10 năm kinh nghiệm trong ngành dược phẩm,
              chúng tôi tự hào là địa điểm mà bạn có thể tin tưởng tìm kiếm sự
              hỗ trợ về sức khỏe và tìm mua các loại thuốc cần thiết.
            </p>
          </div>

          {/* Service Commitment */}
          <div className="bg-white rounded-2xl shadow-xl p-10 mb-4 border-l-8 border-cyan-400 hover:scale-[1.015] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-cyan-700 mb-4 border-b-2 border-cyan-100 pb-2">
              Cam kết dịch vụ
            </h2>
            <p className="text-lg mb-2 text-gray-700 leading-relaxed">
              Tại Dola Pharmacy, chúng tôi cam kết luôn mang đến khách hàng sự
              phục vụ tận tâm và thân thiện. Đội ngũ nhân viên chuyên gia của
              chúng tôi có kiến thức sâu rộng về ngành dược phẩm và luôn sẵn
              sàng tư vấn và giúp đỡ khách hàng. Bên cạnh đó, chúng tôi cũng
              cung cấp thông tin chi tiết, minh bạch về các loại thuốc và sản
              phẩm mà chúng tôi cung cấp, giúp khách hàng hiểu rõ và lựa chọn
              được sản phẩm phù hợp nhất cho nhu cầu sức khỏe cá nhân.
            </p>
          </div>

          {/* Products & Services */}
          <div className="bg-white rounded-2xl shadow-xl p-10 mb-4 border-l-8 border-blue-300 hover:scale-[1.015] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-blue-600 mb-4 border-b-2 border-blue-100 pb-2">
              Sản phẩm & Dịch vụ
            </h2>
            <p className="text-lg mb-2 text-gray-700 leading-relaxed">
              Với một đội ngũ nhân viên chuyên nghiệp, Dola Pharmacy hiện cũng
              cung cấp các loại thuốc thông thường mà bạn có thể đáp ứng được
              mọi nhu cầu khác nhau của khách hàng. Chúng tôi có sẵn các loại
              thuốc chữa bệnh, thực phẩm bổ sung sức khỏe, thực phẩm chức năng,
              vitamin và các sản phẩm chăm sóc sắc đẹp. Bên cạnh đó, chúng tôi
              cũng có các sản phẩm đặc biệt như thực phẩm dinh dưỡng và chăm sóc
              sức khỏe tổng quát.
            </p>
          </div>

          {/* Our Commitment */}
          <div className="bg-white rounded-2xl shadow-xl p-10 mb-4 border-l-8 border-cyan-300 hover:scale-[1.015] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-cyan-600 mb-4 border-b-2 border-cyan-100 pb-2">
              Cam kết chất lượng
            </h2>
            <p className="text-lg mb-2 text-gray-700 leading-relaxed">
              Dola Pharmacy cũng cam kết với đội ngũ nhân viên của mình rằng sẽ
              luôn cập nhật và nâng cao trình độ chuyên môn, để có thể đáp ứng
              tốt nhất mọi nhu cầu và mong muốn từ phía khách hàng. Chúng tôi
              không ngừng nỗ lực để mang đến những nhà thuốc của mình để đáp ứng
              cho mọi khách hàng trên khắp toàn quốc.
            </p>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl border border-blue-200 p-10 text-center shadow-lg">
            <p className="text-2xl font-semibold text-blue-800 mb-6">
              Hãy ghé thăm Dola Pharmacy ngay hôm nay để tận hưởng dịch vụ chăm
              sóc sức khỏe hàng đầu. Chúng tôi luôn hân hạnh được phục vụ bạn và
              đồng hành cùng bạn trên hành trình chăm sóc sức khỏe.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 !text-white font-bold py-4 px-12 rounded-full transition-all duration-300 shadow-xl text-xl tracking-wide hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200">
              Liên hệ ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
