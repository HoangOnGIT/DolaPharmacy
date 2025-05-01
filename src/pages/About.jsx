import React from "react";
import BreadCrumb from "../components/common/BreadCrumb";

function About() {
  return (
    <div className="flex  justify-center">

      <div className="mx-auto ">
        <BreadCrumb title="Giới thiệu" />

        <div className="w-[80%] mx-auto"><h1 className="text-2xl font-bold mb-4">Giới thiệu</h1>
          <p className="mb-4">
            Dola Pharmacy - Điểm đến tin cậy cho sức khỏe của bạn!
          </p>
          <p className="mb-4">
            Dola Pharmacy, là một nhà thuốc hàng đầu, cung cấp cho khách hàng
            những dịch vụ chăm sóc sức khỏe chất lượng, chuyên nghiệp, và đáng tin
            cậy nhất. Với hơn 10 năm kinh nghiệm trong ngành dược phẩm, chúng tôi
            tự hào là địa điểm mà bạn có thể tin tưởng tìm kiếm sự hỗ trợ về sức
            khỏe và tìm mua các loại thuốc cần thiết.
          </p>
          <p className="mb-4">
            Tại Dola Pharmacy, chúng tôi cam kết luôn mang đến khách hàng sự phục
            vụ tận tâm và thân thiện. Đội ngũ nhân viên chuyên gia của chúng tôi
            có kiến thức sâu rộng về ngành dược phẩm và luôn sẵn sàng tư vấn và
            giúp đỡ khách hàng. Bên cạnh đó, chúng tôi cũng cung cấp thông tin chi
            tiết, minh bạch về các loại thuốc và sản phẩm mà chúng tôi cung cấp,
            giúp khách hàng hiểu rõ và lựa chọn được sản phẩm phù hợp nhất cho nhu
            cầu sức khỏe cá nhân.
          </p>
          <p className="mb-4">
            Với một đội ngũ nhân viên chuyên nghiệp, Dola Pharmacy hiện cũng cung
            cấp các loại thuốc thông thường mà bạn có thể đáp ứng được mọi nhu cầu
            khác nhau của khách hàng. Chúng tôi có sẵn các loại thuốc chữa bệnh,
            thực phẩm bổ sung sức khỏe, thực phẩm chức năng, vitamin và các sản
            phẩm chăm sóc sắc đẹp. Bên cạnh đó, chúng tôi cũng có các sản phẩm đặc
            biệt như thực phẩm dinh dưỡng và chăm sóc sức khỏe tổng quát.
          </p>
          <p className="mb-4">
            Dola Pharmacy cũng cam kết với đội ngũ nhân viên của mình rằng sẽ luôn
            cập nhật và nâng cao trình độ chuyên môn, để có thể đáp ứng tốt nhất
            mọi nhu cầu và mong muốn từ phía khách hàng. Chúng tôi không ngừng nỗ
            lực để mang đến những nhà thuốc của mình để đáp ứng cho mọi khách hàng
            trên khắp toàn quốc.
          </p>
          <p>
            Hãy ghé thăm Dola Pharmacy ngay hôm nay để tận hưởng dịch vụ chăm sóc
            sức khỏe hàng đầu. Chúng tôi luôn hân hạnh được phục vụ bạn và đồng
            hành cùng bạn trên hành trình chăm sóc sức khỏe.
          </p></div>
      </div>
    </div>
  );
}

export default About;
