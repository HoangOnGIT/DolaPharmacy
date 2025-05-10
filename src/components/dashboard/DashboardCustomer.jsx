import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Check, X } from "lucide-react";

const DashboardCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
  });
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
  });
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const arrItemsPerPage = [5, 10, 15, 20];

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Vui lòng đăng nhập để tiếp tục.");
      }

      const response = await fetch(`${baseUrl}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Không thể tải danh sách khách hàng (${response.status})`);
      }
      const data = await response.json();
      // Filter users with role: "customer" and map data
      const customerData = data
        .filter((user) => user.role === "customer")
        .map((user) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth,
          address: user.addresses.length > 0 ? user.addresses[0] : "-",
          createdAt: user.createdAt,
        }));
      setCustomers(customerData);
      setError(null);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError(error.message || "Đã xảy ra lỗi khi tải danh sách khách hàng.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleSetPage = (page) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Không tìm thấy token. Vui lòng đăng nhập lại!");
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newCustomer,
          role: "customer",
          verificationStatus: "pending",
          addresses: [],
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setSuccessMessage("Thêm khách hàng thành công!");
        setNewCustomer({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          dateOfBirth: "",
        });
        setIsAddingCustomer(false);
        fetchCustomers();
        setTimeout(() => {
          setIsSuccess(false);
          setSuccessMessage("");
        }, 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi không xác định");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      setError(`Lỗi khi thêm khách hàng: ${error.message}`);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa khách hàng này không?")) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Không tìm thấy token. Vui lòng đăng nhập lại!");
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsSuccess(true);
        setSuccessMessage(`Đã xóa khách hàng #${id} thành công!`);
        setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== id));
        setTimeout(() => {
          setIsSuccess(false);
          setSuccessMessage("");
        }, 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi không xác định");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      setError(`Lỗi khi xóa khách hàng: ${error.message}`);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Filter and sort customers
  const filteredCustomers = customers
    .filter((customer) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        (customer.name && customer.name.toLowerCase().includes(term)) ||
        (customer.phone && customer.phone.includes(term)) ||
        (customer.email && customer.email.toLowerCase().includes(term))
      );
    })
    .sort((a, b) => {
      switch (filter) {
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredCustomers.length / pagination.itemsPerPage);
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = pagination.currentPage * pagination.itemsPerPage;
  const paginationData = filteredCustomers.slice(startIndex, endIndex);

  return (
    <div className="bg-white px-4 py-3 flex-1">
      {isSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-5 mb-6 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <Check size={20} className="mr-2" />
            <p className="text-lg">{successMessage}</p>
          </div>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-green-700 hover:text-green-800 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-5 mb-6 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <X size={20} className="mr-2" />
            <p className="text-lg">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-700 hover:text-red-800 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl !font-semibold">Quản lý khách hàng</h1>
        <button
          onClick={() => setIsAddingCustomer(!isAddingCustomer)}
          className="bg-blue-500 hover:bg-blue-600 !text-white px-4 py-2 rounded-md flex items-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          {isAddingCustomer ? "Hủy" : "Thêm khách hàng"}
        </button>
      </div>

      {isAddingCustomer && (
        <div className="bg-gray-50 p-4 mb-4 rounded-md border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Thêm khách hàng mới</h2>
          <form onSubmit={handleAddCustomer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ</label>
              <input
                type="text"
                name="firstName"
                value={newCustomer.firstName}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
              <input
                type="text"
                name="lastName"
                value={newCustomer.lastName}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={newCustomer.phone}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={newCustomer.email}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
              <input
                type="date"
                name="dateOfBirth"
                value={newCustomer.dateOfBirth}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button
                type="button"
                onClick={() => setIsAddingCustomer(false)}
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 !text-white rounded-md cursor-pointer"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPagination((prev) => ({ ...prev, currentPage: 1 }));
              }}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sắp xếp theo</option>
            <option value="name_asc">Tên A-Z</option>
            <option value="name_desc">Tên Z-A</option>
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Hiển thị: </label>
          <select
            value={pagination.itemsPerPage}
            className="border rounded-md p-1 text-sm cursor-pointer"
            onChange={(e) =>
              setPagination({
                currentPage: 1,
                itemsPerPage: Number(e.target.value),
              })
            }
          >
            {arrItemsPerPage.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500">khách hàng / trang</span>
        </div>
      </div>

      <div className="border-x border-gray-200 rounded-md mt-3">
        <table className="min-w-full text-sm text-gray-800 bg-white border border-gray-200 shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-100 uppercase text-gray-600 text-xs font-semibold sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left">STT</th>
              <th className="px-4 py-3 text-left">Họ và tên</th>
              <th className="px-4 py-3 text-left">Số điện thoại</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Ngày sinh</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginationData.length > 0 ? (
              paginationData.map((customer, index) => (
                <tr
                  key={customer.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
                >
                  <td className="px-4 py-2 text-gray-500 font-medium">
                    #{startIndex + index + 1}
                  </td>
                  <td className="px-4 py-2 text-blue-600 font-semibold">{customer.name}</td>
                  <td className="px-4 py-2 text-gray-600">{customer.phone}</td>
                  <td className="px-4 py-2 text-gray-600">{customer.email || "-"}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {customer.dateOfBirth
                      ? new Date(customer.dateOfBirth).toLocaleDateString("vi-VN")
                      : "-"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Link
                        to={`/dashboard/customer/${customer.id}`}
                        className="inline-block px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-100 border border-blue-200 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors cursor-pointer"
                      >
                        Xem
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  {searchTerm ? "Không tìm thấy khách hàng phù hợp" : "Chưa có khách hàng nào"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredCustomers.length > 0 && (
        <div className="flex justify-between items-center mt-4 text-sm">
          <div>
            Trang {pagination.currentPage} / {totalPages || 1}
          </div>
          <div className="flex gap-1">
            <button
              className="px-2 py-1 border rounded-md disabled:opacity-50 cursor-pointer"
              onClick={() => handleSetPage(Math.max(pagination.currentPage - 1, 1))}
              disabled={pagination.currentPage === 1}
            >
              Trước
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (pagination.currentPage <= 3) {
                pageNum = i + 1;
              } else if (pagination.currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = pagination.currentPage - 2 + i;
              }
              return (
                <button
                  key={i}
                  className={`px-2 py-1 border rounded-md cursor-pointer ${
                    pagination.currentPage === pageNum ? "bg-blue-500 !text-white" : ""
                  }`}
                  onClick={() => handleSetPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              className="px-2 py-1 border rounded-md disabled:opacity-50 cursor-pointer"
              onClick={() => handleSetPage(Math.min(pagination.currentPage + 1, totalPages))}
              disabled={pagination.currentPage === totalPages || totalPages === 0}
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCustomer;