import React from "react";
import img from "../../img/Header/BannerHealth5.png";
import img1 from "../../img/Header/imgDescription/shield.png";
import img2 from "../../img/Header/imgDescription/member.png";
import img3 from "../../img/Header/imgDescription/support.png";
import img4 from "../../img/Header/imgDescription/discount.png";

const Description = () => {
  return (
    <div className="flex flex-row gap-10">
      <div className="w-[40%]">
        <div className="h-full w-full overflow-hidden">
          <a href="#" className="block h-full w-full">
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </a>
        </div>
      </div>
      <div className="w-[60%] ">
        <div className="mb-10">
          <p className="font-semibold text-3xl text-[#1b74e7]">
            Giới thiệu về Dola Pharmacy
          </p>
          <div className="mt-4 mb-4">
            <p className="text-base leading-[1.8]">
              Dola Pharmacy là một nhà thuốc hàng đầu, cung cấp cho khách hàng
              những dịch vụ chăm sóc sức khỏe chất lượng, chuyên nghiệp, và đáng
              tin cậy nhất. Với nhiều năm kinh nghiệm trong ngành dược phẩm,
              chúng tôi tự tin là địa điểm mà bạn có thể tin tưởng tìm kiếm sự
              hỗ trợ về sức khỏe và tim mua các loại thuốc cần thiết.
            </p>
          </div>
          <div className="mt-4">
            <p className="text-base leading-[1.8]">
              Tại Dola Pharmacy, chúng tôi cam kết luôn mang đến cho khách hàng
              sự phục vụ tận tâm và thân thiện. Đội ngũ nhân viên chuyên gia của
              chúng tôi có kiến thức sâu rộng về ngành dược phẩm và luôn sẵn
              lòng tư vấn giúp đỡ khách hàng. Bên cạnh đó, chúng tôi cũng luôn
              cung cấp thông tin chi tiết, minh bạch về các loại thuốc và sản
              phẩm mà chúng tôi cung cấp, giúp khách hàng hiểu rõ và lựa chọn
              được những sản phẩm phù hợp nhất cho nhu cầu cụ thể của mình.
            </p>
          </div>
        </div>
        <div>
          <p className="font-semibold text-3xl text-[#1b74e7]">
            Tại sao chọn chúng tôi
          </p>
          <div className="flex flex-row gap-10">
            <div className="w-[50%] mt-8">
              <div className="flex flex-row gap-2 mb-13">
                <div className="w-[20%] w-[50px] h-[50px] bg-[#1b74e7] rounded-full flex items-center justify-center">
                  <img className="w-[30px] h-[30px]" src={img1} alt="#" />
                </div>
                <div className="w-[80%] ml-2">
                  <p className="font-semibold text-lg">An toàn</p>
                  <p>
                    Chúng tôi cam kết mang đến cho khách hàng những sản phẩm an
                    toàn, được kiểm định và có giấy phép rõ ràng.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-2 mb-6">
                <div className="w-[20%] w-[50px] h-[50px] bg-[#1b74e7] rounded-full flex items-center justify-center">
                  <img className="w-[30px] h-[30px]" src={img3} alt="#" />
                </div>
                <div className="w-[80%] ml-2">
                  <p className="font-semibold text-lg">Đồng hành và hỗ trợ</p>
                  <p>
                    Chúng tôi đồng hành và hỗ trợ bạn trong suốt quá trình sử
                    dụng sản phẩm, cung cấp thông tin và trả lời mọi thắc mắc
                    của khách hàng.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[50%] mt-8">
              <div className="flex flex-row gap-2 mb-6">
                <div className="w-[20%] w-[50px] h-[50px] bg-[#1b74e7] rounded-full flex items-center justify-center">
                  <img className="w-[30px] h-[30px]" src={img2} alt="#" />
                </div>
                <div className="w-[80%] ml-2">
                  <p className="font-semibold text-lg">
                    Đội ngũ giàu kinh nghiệm
                  </p>
                  <p>
                    Đội ngũ chuyên gia dinh dưỡng giàu kinh nghiệm của chúng tôi
                    sẽ tư vấn và hỗ trợ bạn chọn lựa những sản phẩm phù hợp với
                    nhu cầu của mình.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-2 mb-6">
                <div className="w-[20%] w-[50px] h-[50px] bg-[#1b74e7] rounded-full flex items-center justify-center">
                  <img className="w-[30px] h-[30px]" src={img4} alt="#" />
                </div>
                <div className="w-[80%] ml-2">
                  <p className="font-semibold text-lg">Ưu đãi và giảm giá</p>
                  <p>
                    Dola Pharmacy còn có nhiều chương trình giảm giá và ưu đãi
                    đặc biệt cho khách hàng thân thiết.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
