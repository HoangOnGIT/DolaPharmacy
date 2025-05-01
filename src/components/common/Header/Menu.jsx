import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation

const Menu = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { title: "Trang chủ", path: "/homepage" },
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
      { title: "Tin thị trường", path: "/news/market" },
      { title: "Blog sức khỏe", path: "/news/health-blog" },
      { title: "Thông cáo báo chí", path: "/news/press" },
    ],
  };

  // Set active index based on current path
  React.useEffect(() => {
    const currentIndex = menuItems.findIndex(
      (item) =>
        location.pathname === item.path ||
        location.pathname.startsWith(item.path + "/")
    );
    if (currentIndex >= 0) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]);

  return (
    <div className="relative">
      <ul className="flex flex-wrap items-center gap-4 text-sm font-semibold relative z-10">
        {menuItems.map((item, index) => {
          const hasSubMenu = subMenus[item.title];

          return (
            <div key={index} className="relative group my-2">
              <li
                onClick={() => setActiveIndex(index)}
                className={`
                    cursor-pointer px-4 py-3 
                    transition-all duration-300 ease-in-out 
                    hover:bg-white hover:text-green-600 hover:rounded-xl hover:shadow-md
                    ${
                      activeIndex === index
                        ? "bg-white text-green-600 rounded-xl shadow-md"
                        : "rounded-lg"
                    }
                `}
              >
                <Link to={item.path} className="flex items-center text-base">
                  {item.title}
                  {hasSubMenu && <ChevronDownIcon className="w-4 h-4 ml-1" />}
                </Link>
              </li>

              {hasSubMenu && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-xl p-4 
                    opacity-0 transform -translate-y-4 scale-95
                    group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 
                    transition-all duration-300 ease-out z-50
                "
                >
                  <ul className="space-y-2 text-gray-700">
                    {hasSubMenu.map((sub, i) => (
                      <li key={i}>
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
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
