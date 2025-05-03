import { Popover, PopoverButton, PopoverPanel, Transition, Menu, MenuItems, MenuItem } from '@headlessui/react';
import React, { Fragment } from 'react';
import { HiOutlineSearch, HiOutlineChatAlt, HiOutlineBell } from 'react-icons/hi';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import avt from "../../img/Header/avt.jpg"
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const Header = () => {
    const navigate = useNavigate()
    return (
        <div className='bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200'>
            <div className='relative'>
                <HiOutlineSearch fontSize={24} className='text-gray-400 absolute top-1/2 -translate-y-1/2 left-3' />
                <input type="text"
                    placeholder='Search...'
                    className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border boder-gray-300 rounded-sm pl-11 pr-4'
                />
            </div>
            <div className='flex items-center gap-2 mr-2'>
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <PopoverButton className="cursor-pointer p-1.5 rounded-sm flex items-center inline text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100">
                                <HiOutlineChatAlt fontSize={24} />
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <Popover.Panel className="absolute right-0 z-10 mt-6 w-80">
                                        <div className="bg-white rounded-sm shadow-md  px-5 py-2.5 text-left">
                                            <strong className="text-gray-700 font-medium ">
                                                Messages
                                            </strong>
                                            <div className="mt-2 py-1 text-sm "> {/* Thêm class text-left */}
                                                This is messages panel.
                                            </div>
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </PopoverButton>
                        </>
                    )}
                </Popover>
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <PopoverButton className="cursor-pointer p-1.5 rounded-sm flex items-center inline text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100">
                                <HiOutlineBell fontSize={24} />
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <Popover.Panel className="absolute right-0 z-10 mt-6 w-80">
                                        <div className="bg-white rounded-sm shadow-md  px-5 py-2.5 text-left">
                                            <strong className="text-gray-700 font-medium ">
                                                Nofications
                                            </strong>
                                            <div className="mt-2 py-1 text-sm "> {/* Thêm class text-left */}
                                                This is nofications panel.
                                            </div>
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </PopoverButton>
                        </>
                    )}
                </Popover>
                <Menu as="div" className="relative inline-block text-left ">
                    <div>
                        <Menu.Button className="ml-2 flex cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-[#007aff]">
                            <span className='sr-only'>Open user menu</span>
                            <div className='h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center'
                                style={{ backgroundImage: `url(${avt})` }}
                            >
                                <span className='sr-only'>Emily</span>
                            </div>
                        </Menu.Button>
                        <MenuItems anchor="bottom" className="z-10 absolute left-10 mt-2 w-48 rounded-sm shadow-lg p-1 bg-white focus:outline-none">
                            <MenuItem>
                                {({ active }) => (
                                    <button className={classNames(active && 'bg-gray-100', 'text-gray-700 focus:bg-gray-200 w-full text-left cursor-pointer round-sm px-4 py-2')}
                                        onClick={() => navigate("/profile")}>
                                        Your Profile
                                    </button>
                                )}
                            </MenuItem>                            
                            <MenuItem>
                                {({ active }) => (
                                    <button className={classNames(active && 'bg-gray-100', 'text-gray-700 focus:bg-gray-200 w-full text-left cursor-pointer round-sm px-4 py-2')}
                                        onClick={() => navigate("/settings")}>
                                        Settings
                                    </button>
                                )}
                            </MenuItem>                            
                            <MenuItem>
                                {({ active }) => (
                                    <button className={classNames(active && 'bg-gray-100', 'text-gray-700 focus:bg-gray-200 w-full text-left cursor-pointer round-sm px-4 py-2')}
                                        onClick={() => navigate("/logout")}>
                                        Logout
                                    </button>
                                )}
                            </MenuItem>
                        </MenuItems>
                    </div>
                </Menu>
            </div>

        </div>
    );
}

export default Header;
