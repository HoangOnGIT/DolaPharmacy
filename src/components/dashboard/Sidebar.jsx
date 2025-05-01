import React from 'react';
import { FcBullish } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom"
import { DASHBOARD_SIDEBAR_LINKS } from "./navigation"
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS } from "./navigation"
import { MdLocalPharmacy } from 'react-icons/md';
import { IoMedkit } from "react-icons/io5";

import classNames from 'classnames';

const Sidebar = () => {
    const linkClasses = "flex items-center gap-2 font-medium px-3 py-3 hover:bg-blue-700 hover:no-underline active:bg-blue-600 rounded-sm text-lg text-white" 

    function SidebarLink({ item }) {
        const pathName = useLocation()

        return (
            <Link to={item.path} className={classNames(pathName === item.path ? "font-semibold" : "", linkClasses)}> 
                <span className='text-xl'>{item.icon}</span>
                {item.label}
            </Link>
        )
    }

    return (
        <div className='flex flex-col w-60 text-white h-full' style={{ background: 'linear-gradient(180deg, #7fadff 0%, #0f62f9 100%)' }}>
            <div className='flex items-center gap-2 px-4 py-4'> 
                <IoMedkit  fontSize={32} className="text-green-300" /> 
                <span className='text-white text-xl font-bold'>Dola Pharmacy</span> 
            </div>
            <div className='flex-1 py-4 flex flex-col gap-0.5'>
                {DASHBOARD_SIDEBAR_LINKS.map((item, index) => (
                    <div key={index}>
                        <SidebarLink key={index} item={item} />
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-blue-800">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
                <div className={classNames('cursor-pointer text-red font-medium text-lg', linkClasses)}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
        </div>
    );
}

export default Sidebar;