import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TableDashboard = ({ category, filter, choose }) => {
  const [data, setData] = useState([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(baseUrl + "/api/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
  });

  const arrItemsPerPage = [10, 15, 20];

  const handleSetPage = (page) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  // Filter lọc sản phẩm theo từng tiêu chí
  const filteredData = data
    .filter((item) => {
      if (!category) return true;
      return item.categoryName === category;
    })
    .sort((a, b) => {
      switch (filter) {
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        case "price_asc":
          return a.cost - b.cost;
        case "price_desc":
          return b.cost - a.cost;
        case "quantity_asc":
          return (a.stock?.available ?? 0) - (b.stock?.available ?? 0);
        case "quantity_desc":
          return (b.stock?.available ?? 0) - (a.stock?.available ?? 0);
        default:
          return 0;
      }
    });
  // Hàm xác nhận xóa sản phẩm
  const handleComfirmDelte = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không ?"))
      handleDelete(id);
  };
  // Hàm xóa sản phẩm
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Không tìm thấy token. Vui lòng đăng nhập lại!");
    }
    try {
      const response = await fetch(`${BASE_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(
          `Lỗi khi xóa sản phẩm: ${response.status} - ${
            errorData.message || "Lỗi không xác định"
          }`
        );
        return;
      }

      alert("Sản phẩm đã được xóa thành công!");
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Đã xảy ra lỗi khi xóa sản phẩm. Vui lòng thử lại sau.");
    }
  };

  const totalPages = Math.ceil(filteredData.length / pagination.itemsPerPage);
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = pagination.currentPage * pagination.itemsPerPage;
  const paginationData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="bg-white px-4 py-3 flex-1">
      <div className="flex justify-between">
        <strong>Table Product</strong>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Hiển thị: </label>
          <select
            value={pagination.itemsPerPage}
            className="border rounded-sm p-1 text-sm cursor-pointer"
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
          <span className="text-sm text-gray-500">sản phẩm / trang</span>
        </div>
      </div>

      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="min-w-full text-sm text-gray-800 bg-white border border-gray-200 shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-100 uppercase text-gray-600 text-xs font-semibold sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left">STT</th>
              <th className="px-4 py-3 text-left">Tên</th>
              <th className="px-4 py-3 text-left">Danh mục</th>
              <th className="px-4 py-3 text-left">Giảm giá</th>
              <th className="px-4 py-3 text-left">Giá</th>
              <th className="px-4 py-3 text-left">Số lượng</th>
              <th className="px-4 py-3 text-center">Hình ảnh</th>
              <th className="px-4 py-3 text-center">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {paginationData.map((item, index) => {
              const primaryImage =
                item.images?.find((img) => img.isPrimary) || item.images?.[0];
              return (
                <tr
                  key={item.id}
                  className={
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50 hover:bg-gray-100"
                  }
                >
                  <td className="px-4 py-2 text-gray-500 font-medium">
                    #{startIndex + index + 1}
                  </td>
                  <td className="px-4 py-2 text-blue-600 font-semibold">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {item.categoryName}
                  </td>
                  <td className="px-4 py-2 text-red-500 font-semibold">
                    {item.discount?.value ?? 0}%
                  </td>
                  <td className="px-4 py-2 text-emerald-600 font-medium">
                    {item.cost.toLocaleString()} VNĐ
                  </td>
                  <td className="px-4 py-2 text-indigo-500">
                    {item.stock?.available ?? 0}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <img
                      src={
                        primaryImage?.url || "https://via.placeholder.com/50"
                      }
                      alt={primaryImage?.alt || "Hình ảnh sản phẩm"}
                      className="inline-block w-10 h-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    {choose === 0 ? (
                      <Link
                        to={`product/${item.id}`}
                        className="inline-block px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 border border-blue-200 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                      >
                        Xem
                      </Link>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          to={`${item.id}`}
                          className="cursor-pointer inline-block px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-100 border border-blue-200 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                        >
                          Xem
                        </Link>
                        <Link
                          to={`update/${item.id}`}
                          className=" cursor-pointer inline-block px-3 py-1.5 text-sm font-medium text-green-600 bg-green-100 border border-green-200 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors"
                        >
                          Cập nhật
                        </Link>
                        <button
                          onClick={() => handleComfirmDelte(item.id)}
                          className="cursor-pointer inline-block px-3 py-1.5 text-sm font-medium text-red-600 bg-red-100 border border-red-200 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors"
                        >
                          Xóa
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <div>
          Trang {pagination.currentPage} / {totalPages}
        </div>
        <div className="flex gap-1">
          <button
            className="px-2 py-1 border rounded disabled:opacity-50 cursor-pointer"
            onClick={() =>
              handleSetPage(Math.max(pagination.currentPage - 1, 1))
            }
            disabled={pagination.currentPage === 1}
          >
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-2 py-1 border rounded cursor-pointer ${
                pagination.currentPage === i + 1
                  ? "bg-blue-500 !text-white"
                  : ""
              }`}
              onClick={() => handleSetPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-2 py-1 border rounded disabled:opacity-50 cursor-pointer"
            onClick={() =>
              handleSetPage(Math.min(pagination.currentPage + 1, totalPages))
            }
            disabled={pagination.currentPage === totalPages}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableDashboard;
