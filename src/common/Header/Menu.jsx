import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'; // Import icon trỏ xuống

const Menu = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const menuItems = [
        "Trang chủ",
        "Giới thiệu",
        "Sản phẩm",
        "Sản phẩm khuyến mãi",
        "Tin tức",
        "Video",
        "Câu hỏi thường gặp",
        "Liên hệ"
    ];

    const subMenus = {
        "Sản phẩm": [
            "Dược phẩm",
            "Chăm sóc sức khỏe",
            "Chăm sóc cá nhân",
            "Sản phẩm tiện lợi"
        ],
        "Tin tức": [
            "Tin thị trường",
            "Blog sức khỏe",
            "Thông cáo báo chí"
        ]
    };

    return (
        <div className="relative">
            <ul className="flex flex-wrap items-center gap-4 text-sm font-semibold relative z-10">
                {menuItems.map((item, index) => {
                    const hasSubMenu = subMenus[item];

                    return (
                        <div key={index} className="relative group my-2">
                            <li
                                onClick={() => setActiveIndex(index)}
                                className={`
                                    cursor-pointer px-4 py-3 
                                    transition-all duration-300 ease-in-out 
                                    hover:bg-white hover:text-green-600 hover:rounded-xl hover:shadow-md
                                    ${activeIndex === index ? 'bg-white text-green-600 rounded-xl shadow-md' : 'rounded-lg'}
                                `}
                            >
                                <a href="#" className="flex items-center text-base">
                                    {item}
                                    {hasSubMenu && <ChevronDownIcon className="w-4 h-4 text-white-500" />} {/* Icon trỏ xuống */}
                                </a>
                            </li>

                            {hasSubMenu && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-xl p-4 
                                    opacity-0 transform -translate-y-4 scale-95
                                    group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 
                                    transition-all duration-300 ease-out z-50
                                ">
                                    <ul className="space-y-2 text-gray-700">
                                        {hasSubMenu.map((sub, i) => (
                                            <li key={i}>
                                                <a href="#" className="hover:text-green-600 transition-colors duration-200">{sub}</a>
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
