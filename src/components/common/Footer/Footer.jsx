import React from "react";
import {
  PhoneIcon,
  GlobeAltIcon,
  PlayCircleIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  GiftIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

import imgLogo from "../../../img/Header/Logo.png"; // Adjust the path as necessary

const Footer = () => {
  const policies = [
    "Chính sách thành viên",
    "Chính sách thanh toán",
    "Hướng dẫn mua hàng",
    "Bảo mật thông tin cá nhân",
  ];

  const guides = [
    "Hướng dẫn mua hàng",
    "Hướng dẫn thanh toán",
    "Đăng ký thành viên",
    "Hỗ trợ khách hàng",
    "Câu hỏi thường gặp",
  ];

  const categories = [
    "Chăm sóc sắc đẹp",
    "Thiết bị y tế",
    "Dược phẩm",
    "Chăm sóc sức khỏe",
    "Chăm sóc cá nhân",
    "Sản phẩm tiện lợi",
    "Thực phẩm chức năng",
    "Mẹ và Bé",
  ];

  return (
    <div className="w-full">
      <footer>
        {/* Top Footer */}
        <div className="flex justify-around w-full bg-blue-600 text-white py-2">
          <div>
            <input
              dir="ltr"
              type="email"
              placeholder="Nhập email để nhận thông tin khuyến mãi"
              className="rounded-s-lg px-4 py-2 bg-white text-black w-90 text-base"
            />
            <button
              dir="rtl"
              className="rounded-s-lg px-4 py-2 bg-[#003cbf] text-white font-thin"
            >
              ĐĂNG KÝ
            </button>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-medium">Kết nối với chúng tôi:</p>
            <a href="">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-white hover:opacity-90" />
            </a>{" "}
            {/* Zalo */}
            <a href="">
              <GlobeAltIcon className="w-8 h-8 text-white hover:opacity-90" />
            </a>{" "}
            {/* Google */}
            <a href="">
              <PlayCircleIcon className="w-8 h-8 text-white hover:opacity-90" />
            </a>{" "}
            {/* YouTube */}
            <a href="">
              <PhoneIcon className="w-8 h-8 text-white hover:opacity-90" />{" "}
            </a>
            {/* Facebook placeholder */}
          </div>
        </div>
        {/* Mid Footer */}
        <div className="bg-white text-dark py-10 text-sm">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Logo and Description */}
              <div>
                <a href="" className="mb-4 inline-block">
                  <img
                    className="w-[150px] h-[60px] object-contain"
                    src={imgLogo}
                    alt="Logo-Dola Pharmacy"
                  />
                </a>
                <p className="mb-4">
                  Cửa hàng thực phẩm chức năng Dola Pharmacy là địa chỉ tin cậy
                  để bạn tìm kiếm những sản phẩm chất lượng nhất.
                </p>
                <div className="space-y-2">
                  <p className="flex items-center">
                    <div className="text-[#1b74e7] mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>
                    </div>
                    70 Lữ Gia, Phường 15, Quận 11, TP.HCM
                  </p>
                  <p className="flex items-center">
                    <div className="text-[#1b74e7] mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                        />
                      </svg>
                    </div>
                    1900 6750
                  </p>
                  <p className="flex items-center">
                    <div className="text-[#1b74e7] mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    support@sapo.vn
                  </p>
                </div>
              </div>

              {/* Chính sách (Policies) */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#003cbf]">
                  CHÍNH SÁCH
                </h3>
                <ul className="space-y-2">
                  {policies.map((policy, index) => (
                    <li key={index}>
                      <a href="" className="hover:text-blue-700">
                        {policy}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hướng dẫn (Guides) */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#003cbf]">
                  HƯỚNG DẪN
                </h3>
                <ul className="space-y-2">
                  {guides.map((guide, index) => (
                    <li key={index}>
                      <a href="" className="hover:text-blue-700">
                        {guide}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Danh mục (Categories) and Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#003cbf]">
                  DANH MỤC
                </h3>
                <ul className="space-y-2 mb-6">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <a href="" className="hover:text-blue-700">
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-4">ĐĂNG KÝ NHẬN TIN</h3>
                <p className="text-sm mb-2">MUA ONLINE (08:30 – 20:30)</p>
                <p className="text-base font-semibold mb-2 text-[#003cbf]">
                  190006750
                </p>
                <p className="text-sm mb-2">
                  GÓP Ý & KHIẾU NẠI (08:30 – 20:30)
                </p>
                <p className="text-base font-semibold mb-2 text-[#003cbf]">
                  190006750
                </p>
                <p className="text-sm mb-4">
                  Tất cả các ngày trong tuần (Trừ tết Âm Lịch)
                </p>

                <h3 className="text-lg font-semibold mb-4 text-[#003cbf]">
                  LIÊN KẾT SÀN
                </h3>
                <div className="flex space-x-4">
                  {/* Shopee */}
                  <a href="https://shopee.vn/" className="hover:opacity-75">
                    <ShoppingBagIcon className="w-8 h-8 text-orange-500" />
                  </a>
                  {/* Lazada */}
                  <a href="https://www.lazada.vn/" className="hover:opacity-75">
                    <ShoppingCartIcon className="w-8 h-8 text-purple-500" />
                  </a>
                  {/* Tiki */}
                  <a href="https://tiki.vn/" className="hover:opacity-75">
                    <GiftIcon className="w-8 h-8 text-blue-500" />
                  </a>
                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/"
                    className="hover:opacity-75"
                  >
                    <PlayIcon className="w-8 h-8 text-red-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="bg-blue-600 text-white text-center py-4 font-medium text-sm sm:text-base">
          Bản quyền thuộc về Dola theme. Cung cấp bởi SAPO
        </div>
      </footer>
    </div>
  );
};

export default Footer;
