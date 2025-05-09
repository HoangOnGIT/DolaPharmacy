import React from "react";
import img1 from "../../img/Header/imgNews/image1.png";
import img2 from "../../img/Header/imgNews/image2.png";
import img3 from "../../img/Header/imgNews/image3.png";
import img4 from "../../img/Header/imgNews/image4.png";
import img5 from "../../img/Header/imgNews/image5.png";
import img6 from "../../img/Header/imgNews/image6.png";
import img7 from "../../img/Header/imgNews/image7.png";
import img8 from "../../img/Header/imgNews/image8.png";
import img9 from "../../img/Header/imgNews/image9.png";
import { Link } from "react-router-dom";

const News = () => {
  const content = [
    {
      img: img2,
      header:
        "Bà bầu uống nước ép rau má được không? Rau má có tác dụng gì cho bà bầu?",
      title:
        "Bà bầu uống nước ép rau má được không? Rau má có tác dụng gì cho bà bầu",
      desc: "Rau má từ lâu đã nổi tiếng với nhiều công dụng như giải nhiệt, đẹp da, cải...",
    },
    {
      img: img3,
      header: "Soda sữa hột gà có tác dụng gì cho sức khỏe?",
      title: "Soda sữa hột gà có tác dụng gì cho sức khỏe?",
      desc: "Soda sữa hột gà có tác dụng gì? Cách pha chế và những ai không nên dùng...",
    },
    {
      img: img4,
      header:
        "Uống sắt đi ngoài màu đen có nguy hiểm không? Cách phòng ngừa tình trạng thiếu sắt",
      title:
        "Uống sắt đi ngoài màu đen có nguy hiểm không? Cách phòng ngừa tình trạng thiếu sắt",
      desc: "Uống sắt đi ngoài màu đen liệu có gây ảnh hưởng xấu gì đến sức khỏe hay...",
    },
    {
      img: img5,
      header:
        "Thai 13 tuần uống nước dừa được không? Lợi ích của nước dừa với mẹ bầu",
      title:
        "Thai 13 tuần uống nước dừa được không? Lợi ích của nước dừa với mẹ bầu",
      desc: "Nước dừa là thức uống rất phổ biến ở Việt Nam, có thể dễ dàng tìm mua và...",
    },
    {
      img: img6,
      header:
        "Chú ý cách sử dụng muối tắm để đạt hiệu quả và an toàn cho sức khỏe",
      title:
        "Chú ý cách sử dụng muối tắm để đạt hiệu quả và an toàn cho sức khỏe",
      desc: "Muối tắm là sản phẩm được làm từ các loại muối khoáng và muối biển nguyên...",
    },
    {
      img: img7,
      header:
        "Tinh dầu bưởi đem lại lợi ích gì cho da và tóc? Cách làm tinh dầu bưởi đơn giản",
      title:
        "Tinh dầu bưởi đem lại lợi ích gì cho da và tóc? Cách làm tinh dầu bưởi đơn giản",
      desc: "Rau má từ lâu đã nổi tiếng với nhiều công dụng như giải nhiệt, đẹp da, cải...",
    },
    {
      img: img8,
      header:
        "Tắm vỏ bưởi mang lại những lợi ích gì? Gợi ý cách tắm vỏ bưởi đơn giản",
      title:
        "Tắm vỏ bưởi mang lại những lợi ích gì? Gợi ý cách tắm vỏ bưởi đơn giản",
      desc: "Trong thế giới hiện đại với vô vàn những sản phẩm hóa chất chăm sóc da ngày...",
    },
    {
      img: img9,
      header: "Vỏ sầu riêng có tác dụng gì cho mục đích chăm sóc sức khỏe?",
      title: "Vỏ sầu riêng có tác dụng gì cho mục đích chăm sóc sức khỏe?",
      desc: "Trải qua hàng ngàn năm, con người đã học cách tận dụng các thành phần từ...",
    },
  ];

  return (
    <div className="flex my-10">
      <div className="w-[67%]">
        <div>
          <Link to="product">
            <p className="hover:text-[#003cbf] cursor-pointer w-[300px] font-semibold text-3xl ">
              Góc dinh dưỡng
            </p>
          </Link>
        </div>
        <div className="flex">
          <div className="w-[50%]">
            <div>
              <a href="#" className="block h-full w-full">
                <img
                  src={img1}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              </a>
            </div>
            <h3 className="my-2 text-xl font-semibold text-gray-800 hover:text-blue-600 transition duration-300">
              <a
                href=""
                title="Trẻ uống kẽm có bị táo bón không? Cần lưu ý gì khi bổ sung kẽm cho bé"
              >
                Trẻ uống kẽm có bị táo bón không? Cần...
              </a>
            </h3>
            <p className="text-sm text-blue-500 mt-1">Ngày đăng: 18/07/2023</p>
            <p className="text-gray-700 text-sm mt-2 leading-relaxed">
              Tại Việt Nam, tỷ lệ trẻ em bị thiếu kẽm lên đến 40% khiến bé chậm
              lớn, biếng ăn , thiếu sức đề kháng. Mặc dù vậy, việc bổ sung kẽm
              cho bé thông qua các loại thực phẩm chức năng,...
            </p>
          </div>
          <div className="w-[50%] ml-8">
            {content.slice(0, 4).map((item, index) => (
              <div key={index} className="flex mb-8">
                <div className="w-[30%]">
                  <div>
                    <a href="#" className="block h-full w-full">
                      <img
                        src={item.img}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </a>
                  </div>
                </div>
                <div className="w-[70%] ml-2">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition duration-300">
                      <a href="" title={item.title}>
                        {item.header}
                      </a>
                    </h3>
                    <p className="text-gray-700 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <a
            className="hover:bg-[#003cbf] hover:!text-white cursor-pointer transition-colors duration-300  px-4 py-2 border-2 border-solid border-blue-700 rounded-sm font-lg"
            href="/news"
          >
            Xem tất cả
          </a>
        </div>
      </div>
      <div className="w-[32%]">
        <div>
          <Link to="product">
            <p className="hover:text-[#003cbf] cursor-pointer w-[300px] font-semibold text-3xl ">
              Góc khỏe đẹp
            </p>
          </Link>
        </div>
        <div className="w-[100%] ml-8">
          {content.slice(4, 8).map((item, index) => (
            <div key={index} className="flex mb-8">
              <div className="w-[30%]">
                <div>
                  <a href="#" className="block h-full w-full">
                    <img
                      src={item.img}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </a>
                </div>
              </div>
              <div className="w-[70%] ml-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition duration-300">
                    <a href="" title={item.title}>
                      {item.header}
                    </a>
                  </h3>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <a
            className="hover:bg-[#003cbf] hover:!text-white cursor-pointer transition-colors duration-300  px-4 py-2 border-2 border-solid border-blue-700 rounded-sm font-lg"
            href="/news"
          >
            Xem tất cả
          </a>
        </div>
      </div>
    </div>
  );
};

export default News;
