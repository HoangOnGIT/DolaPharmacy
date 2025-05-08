import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Tabs, Divider, message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

function UserCrediential({ loginPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState(loginPage ? "login" : "register");
  const { login, register, error, loading } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [registerForm] = Form.useForm();

  // Add a state to handle animation
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabChange = (key) => {
    if (key !== activeTab) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveTab(key);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleSubmit = async (values) => {
    const result = await login(values.email, values.password);
    if (!result.success) {
      message.error(result.error || "Đăng nhập thất bại");
    } else {
      message.success("Đăng nhập thành công!");
      // Chuyển hướng đến /dashboard nếu là admin, hoặc /homepage nếu không
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (storedUser.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/homepage");
      }
    }
  };

  const handleRegister = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu không khớp!");
      return;
    }

    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };

    const result = await register(userData);
    if (!result.success) {
      message.error(result.error || "Đăng ký thất bại");
    } else {
      message.success("Đăng ký thành công!");
      navigate("/");
    }
  };

  // Handlers for social login
  const handleGoogleLogin = () => {
    message.info("Tính năng đang được phát triển");
  };

  const handleFacebookLogin = () => {
    message.info("Tính năng đang được phát triển");
  };

  const items = [
    {
      key: "login",
      label: "Đăng nhập",
      children: (
        <div
          className={`transition-opacity duration-300 ease-in-out ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Đăng nhập
          </h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Mật khẩu"
                size="large"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </Form.Item>

            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}

            <Divider plain>Hoặc đăng nhập với</Divider>

            <div className="grid grid-cols-2 gap-3">
              <Button
                icon={<GoogleOutlined />}
                onClick={handleGoogleLogin}
                size="large"
                className="flex items-center justify-center"
              >
                Google
              </Button>
              <Button
                icon={<FacebookOutlined />}
                onClick={handleFacebookLogin}
                size="large"
                className="flex items-center justify-center"
              >
                Facebook
              </Button>
            </div>

            <div className="mt-4 text-center">
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Quên mật khẩu?
              </a>
            </div>
          </Form>
        </div>
      ),
    },
    {
      key: "register",
      label: "Đăng ký",
      children: (
        <div
          className={`transition-opacity duration-300 ease-in-out ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Đăng ký tài khoản
          </h2>
          <Form
            form={registerForm}
            layout="vertical"
            onFinish={handleRegister}
            scrollToFirstError
          >
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="firstName"
                label="Họ"
                rules={[{ required: true, message: "Vui lòng nhập họ" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Họ"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Tên"
                rules={[{ required: true, message: "Vui lòng nhập tên" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Tên"
                  size="large"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
                size="large"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Xác nhận mật khẩu"
                size="large"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center py-10 pt-40 bg-gray-50 transition-all duration-300">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={items}
          centered
        />

        <div className="mt-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-blue-100 p-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-800"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-xs text-gray-600">
              Cam kết bảo mật thông tin tài khoản
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCrediential;
