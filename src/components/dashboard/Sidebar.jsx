import React from 'react';
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from "./navigation";
import { IoMedkit } from "react-icons/io5";
import classNames from 'classnames';
import { useAuth } from "../../contexts/AuthContext"; // ✅ Thêm dòng này

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ Sử dụng logout từ context

  const linkClasses = "flex items-center gap-2 font-medium px-3 py-3 hover:bg-blue-700 hover:no-underline rounded-sm text-lg text-white";

  function SidebarLink({ item }) {
    const normalizedPath = item.path.startsWith('/') ? item.path : `/dashboard/${item.path}`;
    const exactMatch = pathname === normalizedPath;
    const isSubPath = pathname.startsWith(normalizedPath + '/') && item.path !== '/';
    const allLinks = [...DASHBOARD_SIDEBAR_LINKS, ...DASHBOARD_SIDEBAR_BOTTOM_LINKS];

    const isActive = exactMatch || (isSubPath && !allLinks.some(otherItem => {
      const otherNormalizedPath = otherItem.path.startsWith('/') ? otherItem.path : `/dashboard/${otherItem.path}`;
      return pathname === otherNormalizedPath && otherNormalizedPath !== normalizedPath;
    }));

    return (
      <Link
        to={normalizedPath}
        className={classNames(
          isActive ? "bg-blue-700 font-semibold" : "",
          linkClasses
        )}
      >
        <span className='text-xl'>{item.icon}</span>
        {item.label}
      </Link>
    );
  }

  const handleLogout = () => {
    if (window.confirm("Bạn có muốn thoát không?")) {
      logout(); // ✅ Gọi logout từ context để cập nhật toàn bộ app
      navigate('/login');
    }
  };

  return (
    <div className='flex flex-col w-60 text-white h-full' style={{ background: 'linear-gradient(180deg, #7fadff 0%, #0f62f9 100%)' }}>
      <div className='flex items-center gap-2 px-4 py-4'>
        <IoMedkit fontSize={32} className="text-green-300" />
        <span className='text-white text-xl font-bold'>Dola Pharmacy</span>
      </div>
      <div className='flex-1 py-4 flex flex-col gap-0.5'>
        {DASHBOARD_SIDEBAR_LINKS.map((item, index) => (
          <div key={index}>
            <SidebarLink item={item} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-blue-800">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div className={classNames('cursor-pointer text-red font-medium text-lg', linkClasses)} onClick={handleLogout}>
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
