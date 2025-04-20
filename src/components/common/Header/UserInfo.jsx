import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { PhoneIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

function UserInfo({ user }) {
  const [userCurr, setUserCurr] = useState({});
  const { logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("User object:", user);
    if (!user || !user.id) {
      console.error("User or user.id is undefined");
      return;
    }
    fetch(`http://localhost:3000/api/users/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserCurr(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  function handleUserInfo() {
    navigate("/profile");
  }

  return (
    <div className="flex space-x-1 justify-center items-center">
      <button
        className="hover:cursor-pointer  hover:text-blue-700"
        onClick={() => handleUserInfo()}
      >
        Tài khoản
      </button>
      <span>|</span>
      <button
        className="hover:cursor-pointer hover:text-blue-700"
        onClick={() => logout()}
      >
        Đăng xuất
      </button>
      <span>|</span>
      <p className="flex items-center">
        Hotline đặt hàng:
        <button className="flex items-center bg-blue-800 text-white px-2.5 py-1 rounded-full text-base hover:bg-white hover:text-blue-800 ml-2 cursor-pointer">
          <PhoneIcon className="mr-2 h-3 w-3" />
          1900 6750
        </button>
      </p>
    </div>
  );
}

export default UserInfo;
