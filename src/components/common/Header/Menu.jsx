import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const menuItems = [
    { title: "Trang chủ", path: "/" },
    { title: "Giới thiệu", path: "/about" },
    { title: "Sản phẩm", path: "/product" },
    { title: "Sản phẩm khuyến mãi", path: "/promotion" },
    { title: "Tin tức", path: "/news" },
    { title: "Video", path: "/video" },
    { title: "Câu hỏi thường gặp", path: "/faq" },
    { title: "Liên hệ", path: "/contact" },
  ];
  
  const subMenus = {
    "Sản phẩm": [
      { title: "Dược phẩm", path: "/product" },
      { title: "Chăm sóc sức khỏe", path: "/product" },
      { title: "Chăm sóc cá nhân", path: "/product" },
      { title: "Sản phẩm tiện lợi", path: "/product" },
    ],
    "Tin tức": [
      { title: "Tin thị trường", path: "/news" },
      { title: "Blog sức khỏe", path: "/news" },
      { title: "Thông cáo báo chí", path: "/news" },
    ],
  };
  
  useEffect(() => {
    const currentIndex = menuItems.findIndex(
      (item) =>
        location.pathname === item.path ||
        location.pathname.startsWith(item.path + "/")
    );
    if (currentIndex >= 0) setActiveIndex(currentIndex);
  }, [location.pathname]);
  
  return (
    <div className="relative my-4">
      <ul className="flex flex-wrap items-center gap-4 text-sm font-semibold relative z-10">
        {menuItems.map((item, index) => {
          const hasSubMenu = !!subMenus[item.title];
          return (
            <li
              key={index}
              className={`
                relative cursor-pointer px-4 py-3
                transition-all duration-300 ease-in-out
                hover:bg-white hover:text-green-600 hover:rounded-xl hover:shadow-md
                ${activeIndex === index
                  ? "bg-white text-green-600 rounded-xl shadow-md"
                  : "rounded-lg"}
              `}
              onClick={() => setActiveIndex(index)}
            >
              <div className="group">
                <Link to={item.path} className="flex items-center text-base">
                  {item.title}
                  {hasSubMenu && (
                    <ChevronDownIcon className="w-4 h-4 text-white-500 ml-1" />
                  )}
                </Link>
                
                {hasSubMenu && (
                  <>
                    {/* This is the invisible connector that bridges the gap */}
                    <div className="absolute left-0 w-full h-2 top-full"></div>
                    
                    <div className="
                      absolute left-0 w-64 bg-white shadow-lg rounded-xl p-4
                      opacity-0 invisible 
                      group-hover:opacity-100 group-hover:visible
                      transition-all duration-300 ease-out z-50
                      mt-2 top-[calc(100%+8px)]
                    ">
                      <ul className="space-y-2 text-gray-700">
                        {subMenus[item.title].map((sub, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={sub.path}
                              className="hover:text-green-600 transition-colors duration-200 block py-1"
                            >
                              {sub.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;