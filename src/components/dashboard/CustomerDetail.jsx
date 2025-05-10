import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RefreshCw, Check, X } from "lucide-react";

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchCustomerData();
  }, [id, baseUrl]);

  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Vui lòng đăng nhập để tiếp tục.");
      }

      const response = await fetch(`${baseUrl}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Không thể tải thông tin khách hàng (${response.status})`);
      }
      const userData = await response.json();
      // Map user data to customer format with formatted address string
      setCustomer({
        id: userData.id,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        phone: userData.phone,
        dateOfBirth: userData.dateOfBirth,
        address: userData.addresses?.length > 0
          ? `${userData.addresses[0].street}, ${userData.addresses[0].city}${userData.addresses[0].state ? ", " + userData.addresses[0].state : ""}, ${userData.addresses[0].postalCode}, ${userData.addresses[0].country}`
          : "-",
        createdAt: userData.createdAt,
        verificationStatus: userData.verificationStatus,
      });
    } catch (err) {
      console.error("Error fetching customer data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "-";
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getVerificationBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "verified":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "unverified":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p className="font-medium">Lỗi khi tải dữ liệu</p>
        <p>{error}</p>
        <Link
          to="/dashboard/customer"
          className="inline-block mt-3 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 cursor-pointer"
        >
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
        <p>Không tìm thấy thông tin khách hàng.</p>
        <Link
          to="/dashboard/customer"
          className="inline-block mt-3 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 cursor-pointer"
        >
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 flex-1">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard/customer"
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Quay lại
          </Link>
          <h1 className="text-2xl font-semibold">Thông tin khách hàng</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchCustomerData}
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 !text-white rounded-md cursor-pointer"
          >
            <RefreshCw size={20} className="mr-2" />
            Làm mới
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center text-blue-600 text-2xl font-bold">
                  {customer.name?.charAt(0).toUpperCase() || "K"}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{customer.name}</h2>
                  <div className="flex items-center mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getVerificationBadgeClass(
                        customer.verificationStatus
                      )}`}
                    >
                      {customer.verificationStatus || "Không xác định"}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-500">Mã KH: {customer.id}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="text-base font-medium text-gray-800">{customer.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-base font-medium text-gray-800">{customer.email || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ngày sinh</p>
                  <p className="text-base font-medium text-gray-800">
                    {formatDate(customer.dateOfBirth)} ({calculateAge(customer.dateOfBirth)})
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Địa chỉ</p>
                  <p className="text-base font-medium text-gray-800">{customer.address || "-"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Thống kê</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Ngày tham gia</p>
                  <p className="text-base font-medium text-gray-800">
                    {formatDate(customer.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;