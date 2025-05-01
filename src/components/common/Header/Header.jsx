import React, { useState, useEffect, useRef, useMemo, use } from "react";
import imgBanner from "../../../img/Header/Banner.png";
import imgLogo from "../../../img/Header/Logo.png";
import "./Header.css";
import { PhoneIcon } from "@heroicons/react/20/solid";
import Search from "./Search";
import Modal from "./Modal";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import UserInfo from "./UserInfo";
import { Badge } from "antd";
import { useCart } from "../../../contexts/CartContext";
import { useFav } from "../../../contexts/FavouriteContext";
import { HeartOutlined } from "@ant-design/icons";
import CartButton from "./CartButton";

const Header = () => {
  const textList = [
    "Ưu đãi lớn dành cho thành viên mới",
    "Chào mừng bạn đến với cửa hàng Dola Pharmacy!",
    "Rất nhiều ưu đãi và chương trình khuyến mãi đang chờ đợi bạn",
  ];

  const [category, setCategory] = useState([]);
  const [currentText, setCurrentText] = useState(textList[0]);
  const [showEffect, setShowEffect] = useState(false);
  const indexRef = useRef(0);
  const memoizedText = useMemo(() => currentText, [currentText]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { cart } = useCart();
  const { favList } = useFav();
  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setCategory(data);
        }
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % textList.length;
      setCurrentText(textList[indexRef.current]);
      setShowEffect(true);
      setTimeout(() => setShowEffect(false), 3000);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [textList]);

  const nav = useNavigate();

  function handleClickCart() {
    nav("/cart");
  }

  function handleClickFav() {
    nav("/fav");
  }

  function handleClickMap() {
    nav("/map");
  }

  const { user, isAuthenticated, loading, error, login, logout } = useAuth();

  return (
    <>
      <div className="w-full">
        {/* Banner Top */}
        <div className="banner-top bg-[#80e0e2]">
          <div className="container mx-auto w-4/5">
            <a href="">
              <img src={imgBanner} alt="Banner-Dola Pharmacy" />
            </a>
          </div>
        </div>

        {/* Header chính */}
        <div className="header h-46 bg-gradient-to-b from-[#7fadff] to-[#0f62f9] text-white w-full">
          {/* Contact Header */}
          <div className="container mx-auto w-4/5">
            {/* Contact Information */}
            <div className="w-full">
              <div className="flex justify-between items-center text-base font-semibold">
                <div>
                  <p className={`my-2 ${showEffect ? "fade-in-out" : ""}`}>
                    {memoizedText}
                  </p>
                </div>

                {isAuthenticated ? (
                  <UserInfo user={user} />
                ) : (
                  <div className="my-1 flex items-center">
                    <a className="mx-1 hover:text-blue-800" href="/register">
                      Đăng ký |
                    </a>
                    <a className="mx-1 hover:text-blue-800" href="/login  ">
                      Đăng nhập |
                    </a>
                    <p className="mx-1 flex items-center">
                      Hotline đặt hàng:
                      <button className="flex items-center bg-blue-800 text-white px-2.5 py-1 rounded-full text-base hover:bg-white hover:text-blue-800 ml-2 cursor-pointer">
                        <PhoneIcon className="mr-2 h-3 w-3" />
                        1900 6750
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Category Header */}
            <div className="flex items-center my-1 justify-between">
              {/* Logo */}
              <a href="" className="mr-10">
                <img
                  className="w-[200px] align-middle border-none max-w-full h-auto"
                  src={imgLogo}
                  alt="Logo-Dola Pharmacy"
                />
              </a>
              {/* Category */}
              <button
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="flex items-center bg-white px-6 py-3 text-xl text-black rounded-lg font-medium cursor-pointer hover:bg-blue-800 hover:text-white mr-10"
              >
                <div className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Danh mục
              </button>
              {/* Search */}
              <Search categories={category} />

              <div className="flex items-center">
                <a
                  className="mx-1 hover:text-blue-800"
                  href=""
                  onClick={() => handleClickMap()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-9"
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
                </a>

                <a
                  className="mx-1 hover:text-blue-800"
                  href=""
                  onClick={() => handleClickFav()}
                >
                  <Badge
                    count={favList.items ? favList.items.length : 0}
                    showZero={true}
                  >
                    <HeartOutlined style={{ fontSize: "32px" }} />
                  </Badge>
                </a>

                <a className="mx-1 hover:text-blue-800" href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-9"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                </a>
                <Badge
                  count={cart.items ? cart.items.length : 0}
                  showZero={true}
                >
                  <CartButton />
                </Badge>
              </div>
            </div>

            <Menu />
          </div>
        </div>

        {/*Breadcrumb*/}
        <div className="container mx-auto w-4/5">
          <div className="h-10 justify-center items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12h18m-9 9l9-9-9-9"
              />
            </svg>
          </div>
        </div>

        {/* Modal */}
        <Modal
          categories={category}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
};

export default Header;
