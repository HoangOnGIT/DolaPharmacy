import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye, Edit, Search, RefreshCw, FileText, Filter, Check, X, Truck, Package, Clock, ShoppingBag, Calendar, Phone, Mail, MapPin, CreditCard, User } from 'lucide-react';

const DashboardOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [exportOptions, setExportOptions] = useState({
    startDate: '',
    endDate: '',
    status: 'all'
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrderIdToDelete, setSelectedOrderIdToDelete] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Status mapping
  const statusMapping = {
    all: 'Tất cả',
    pending: 'Chờ xử lý',
    processing: 'Đang xử lý',
    shipped: 'Đang giao hàng',
    delivered: 'Đã giao hàng',
    cancelled: 'Đã hủy'
  };

  // Status colors and dots
  const statusColors = {
    pending: { bg: "bg-yellow-400", text: "text-yellow-800" },
    processing: { bg: "bg-blue-400", text: "text-blue-800" },
    shipped: { bg: "bg-purple-400", text: "text-purple-800" },
    delivered: { bg: "bg-green-400", text: "text-green-800" },
    cancelled: { bg: "bg-red-400", text: "text-red-800" }
  };

  // Fetch orders from API with token from localStorage
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error('Vui lòng đăng nhập để tiếp tục.');
      }

      const response = await axios.get('http://localhost:3000/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err.response ? err.response.data : err.message);
      setError(err.response?.status === 401 ? 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.' : 'Không thể tải dữ liệu đơn hàng. Vui lòng kiểm tra kết nối hoặc API.');
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error('Vui lòng đăng nhập để tiếp tục.');
      }

      const url = `http://localhost:3000/api/orders/${orderId}`; // Có thể thay bằng endpoint đúng (ví dụ: /api/orders/{orderId}/status)
      console.log('Requesting:', url);
      const response = await axios.patch(url, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus, updatedAt: Date.now() } : order
      ));

      setIsSuccess(true);
      setSuccessMessage(`Đã cập nhật trạng thái đơn hàng #${orderId} thành công!`);
      setTimeout(() => {
        setIsSuccess(false);
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error updating order status:', err.response ? err.response.data : err.message);
      setError(err.response?.status === 404 ? 'Endpoint không tìm thấy. Vui lòng kiểm tra với backend.' : 'Không thể cập nhật trạng thái đơn hàng. Vui lòng thử lại.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };
  // Delete order
  const deleteOrder = async (orderId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error('Vui lòng đăng nhập để tiếp tục.');
      }

      await axios.delete(`${baseUrl}/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders(orders.filter(order => order.id !== orderId));
      setIsSuccess(true);
      setSuccessMessage(`Đã xóa đơn hàng #${orderId} thành công!`);
      setTimeout(() => {
        setIsSuccess(false);
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error deleting order:', err.response ? err.response.data : err.message);
      setError(err.response?.status === 401 ? 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.' : 'Không thể xóa đơn hàng. Vui lòng thử lại.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  // Export orders (placeholder)
  const exportToExcel = async (options) => {
    try {
      setLoading(true);
      console.log('Exporting orders with options:', options);
      setIsSuccess(true);
      setSuccessMessage('Đã xuất dữ liệu đơn hàng thành công!');
      setTimeout(() => {
        setIsSuccess(false);
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error exporting orders:', err);
      setError('Không thể xuất dữ liệu đơn hàng. Vui lòng thử lại.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
      setIsExportModalOpen(false);
    }
  };

  // Load orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = activeTab === 'all' || order.status === activeTab;
    const matchesSearch =
      !searchQuery ||
      order.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone?.includes(searchQuery) ||
      order.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id?.toString().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(amount)
      .replace(/\s₫$/, ' ₫');
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };

  // Format datetime
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  // Status badge component with dot
  const StatusBadge = ({ status }) => {
    const statusStyle = statusColors[status] || { bg: "bg-gray-400", text: "text-gray-800" };
    return (
      <span className={`inline-flex items-center px-4 py-2 rounded-full text-xl font-medium ${statusStyle.bg} ${statusStyle.text}`}>
        <span className="w-2 h-2 rounded-full mr-2"></span>
        {statusMapping[status] || status}
      </span>
    );
  };

  // Status dropdown menu
  const StatusDropdownMenu = () => {
    if (!isStatusDropdownOpen) return null;
    return (
      <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 border border-gray-200">
        <div className="py-2">
          {Object.entries(statusMapping).map(([key, value]) => (
            <button
              key={key}
              className="w-full text-left px-8 py-4 text-xl text-gray-700 hover:bg-gray-100 flex items-center gap-3"
              onClick={() => {
                setActiveTab(key);
                setIsStatusDropdownOpen(false);
              }}
            >
              {key !== 'all' && <span className={`w-2 h-2 rounded-full mr-3 ${statusColors[key]?.bg || 'bg-gray-400'}`}></span>}
              {value}
              {activeTab === key && <Check size={24} className="ml-auto text-green-500" />}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Status modal
  const StatusModal = () => {
    const [selectedStatus, setSelectedStatus] = useState(selectedOrder?.status || 'pending');
    const statuses = [
      { value: "pending", label: "Chờ xử lý" },
      { value: "processing", label: "Đang xử lý" },
      { value: "shipped", label: "Đang giao hàng" },
      { value: "delivered", label: "Đã giao hàng" },
      { value: "cancelled", label: "Đã hủy" }
    ];

    if (!isStatusModalOpen || !selectedOrder) return null;

    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        <div className="bg-white p-10 rounded-lg shadow-lg w-11/12 max-w-3xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-medium">Cập nhật trạng thái đơn hàng #{selectedOrder.id}</h3>
            <button onClick={() => setIsStatusModalOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={28} />
            </button>
          </div>

          <div className="mb-10">
            <label className="block text-xl font-medium text-gray-700 mb-4">Trạng thái</label>
            <div className="grid grid-cols-1 gap-4">
              {statuses.map(status => (
                <div
                  key={status.value}
                  className={`border rounded-md p-6 cursor-pointer flex items-center ${selectedStatus === status.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  onClick={() => setSelectedStatus(status.value)}
                >
                  <div className="flex items-center flex-1">
                    <span className={`w-3 h-3 rounded-full mr-4 ${statusColors[status.value]?.bg || 'bg-gray-400'}`}></span>
                    <span className="text-xl">{status.label}</span>
                  </div>
                  {selectedStatus === status.value && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check size={20} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsStatusModalOpen(false)}
              className="py-4 px-8 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 text-xl"
            >
              Hủy
            </button>
            <button
              onClick={() => {
                updateOrderStatus(selectedOrder.id, selectedStatus);
                setIsStatusModalOpen(false);
              }}
              className="py-4 px-8 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-4 text-xl"
            >
              <Check size={24} />
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Delete modal
  const DeleteModal = () => {
    if (!isDeleteModalOpen || !selectedOrderIdToDelete) return null;

    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        <div className="bg-white p-10 rounded-lg shadow-lg w-11/12 max-w-3xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-medium text-red-600">Xác nhận xóa đơn hàng</h3>
            <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={28} />
            </button>
          </div>

          <div className="mb-10">
            <p className="text-2xl text-gray-700">Bạn có chắc chắn muốn xóa đơn hàng #{selectedOrderIdToDelete}?</p>
            <p className="text-xl text-gray-500 mt-4">Hành động này không thể hoàn tác.</p>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="py-4 px-8 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 text-xl"
            >
              Hủy
            </button>
            <button
              onClick={() => deleteOrder(selectedOrderIdToDelete)}
              className="py-4 px-8 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-4 text-xl"
            >
              <X size={24} />
              Xóa đơn hàng
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Export modal
  const ExportModal = () => {
    if (!isExportModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        <div className="bg-white p-10 rounded-lg shadow-lg w-11/12 max-w-3xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-medium">Xuất dữ liệu đơn hàng</h3>
            <button onClick={() => setIsExportModalOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={28} />
            </button>
          </div>

          <div className="space-y-6 mb-10">
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-3">Từ ngày</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md py-4 px-6 text-xl"
                value={exportOptions.startDate}
                onChange={(e) => setExportOptions({ ...exportOptions, startDate: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-700 mb-3">Đến ngày</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md py-4 px-6 text-xl"
                value={exportOptions.endDate}
                onChange={(e) => setExportOptions({ ...exportOptions, endDate: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-700 mb-3">Trạng thái</label>
              <select
                className="w-full border border-gray-300 rounded-md py-4 px-6 text-xl"
                value={exportOptions.status}
                onChange={(e) => setExportOptions({ ...exportOptions, status: e.target.value })}
              >
                {Object.entries(statusMapping).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsExportModalOpen(false)}
              className="py-4 px-8 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 text-xl"
            >
              Hủy
            </button>
            <button
              onClick={() => exportToExcel(exportOptions)}
              className="py-4 px-8 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-4 text-xl"
            >
              <FileText size={24} />
              Xuất Excel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Order details modal
  const OrderDetailsModal = () => {
    if (!isDetailsModalOpen || !selectedOrder) return null;

    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 overflow-auto py-10">
        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-6xl max-h-full overflow-y-auto">
          <div className="sticky top-0 bg-white p-8 border-b border-gray-200 flex justify-between items-center z-10">
            <div className="flex items-center gap-4">
              <h3 className="text-3xl font-medium">Chi tiết đơn hàng</h3>
              <StatusBadge status={selectedOrder.status} />
            </div>
            <button onClick={() => setIsDetailsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={28} />
            </button>
          </div>

          <div className="p-8">
            <div className="bg-blue-50 p-8 rounded-lg mb-8">
              <div className="flex flex-wrap justify-between items-center gap-6">
                <div>
                  <div className="text-xl text-gray-500">Mã đơn hàng</div>
                  <div className="text-3xl font-semibold">#{selectedOrder.id}</div>
                </div>
                <div>
                  <div className="text-xl text-gray-500">Tổng tiền</div>
                  <div className="text-3xl font-semibold text-blue-600">{formatCurrency(selectedOrder.total)}</div>
                </div>
                <div>
                  <div className="text-xl text-gray-500">Ngày đặt</div>
                  <div className="text-xl font-medium">{formatDateTime(selectedOrder.createdAt)}</div>
                </div>
                <div>
                  <div className="text-xl text-gray-500">Trạng thái</div>
                  <StatusBadge status={selectedOrder.status} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                  <h4 className="text-2xl font-medium flex items-center gap-4">
                    <User size={24} className="text-blue-600" />
                    Thông tin khách hàng
                  </h4>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <User size={24} className="mt-1 text-gray-400" />
                    <div>
                      <div className="text-2xl font-medium">{selectedOrder.fullName}</div>
                      <div className="text-xl text-gray-500">{selectedOrder.userId || 'Khách vãng lai'}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone size={24} className="mt-1 text-gray-400" />
                    <div>
                      <div className="text-2xl text-gray-600">{selectedOrder.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail size={24} className="mt-1 text-gray-400" />
                    <div>
                      <div className="text-2xl text-gray-600">{selectedOrder.email}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin size={24} className="mt-1 text-gray-400" />
                    <div>
                      <div className="text-2xl text-gray-600">
                        {selectedOrder.address}, {selectedOrder.ward}, {selectedOrder.district}, {selectedOrder.province}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                  <h4 className="text-2xl font-medium flex items-center gap-4">
                    <Package size={24} className="text-blue-600" />
                    Thông tin giao hàng
                  </h4>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <Calendar size={24} className="mt-1 text-gray-400" />
                    <div>
                      <div className="text-xl text-gray-500">Ngày giao hàng</div>
                      <div className="text-2xl text-gray-600">{formatDate(selectedOrder.deliveryDate)}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock size={24} className="mt-1 text-gray-400" />
                    <div>
                      <div className="text-xl text-gray-500">Khung giờ giao</div>
                      <div className="text-2xl text-gray-600">{selectedOrder.deliveryTime}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CreditCard size={24} className="mt-1 text-gray-400" />
                    <div>
                      <div className="text-xl text-gray-500">Phương thức thanh toán</div>
                      <div className="text-2xl text-gray-600">
                        {selectedOrder.paymentMethod === 'transfer' ? 'Chuyển khoản' : 'Tiền mặt'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock size={24} className="mt-1 text-gray-400" />
                    <div>
                      <div className="text-xl text-gray-500">Cập nhật lần cuối</div>
                      <div className="text-2xl text-gray-600">{formatDateTime(selectedOrder.updatedAt)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gray-50 p-6 rounded-t-lg border border-gray-200">
                <h4 className="text-2xl font-medium flex items-center gap-4">
                  <ShoppingBag size={24} className="text-blue-600" />
                  Sản phẩm đã đặt
                </h4>
              </div>
              <div className="border border-gray-200 border-t-0 rounded-b-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-8 py-8 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                        <th className="px-8 py-8 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">Loại</th>
                        <th className="px-8 py-8 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">Đơn giá</th>
                        <th className="px-8 py-8 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                        <th className="px-8 py-8 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-8 py-8">
                            <div className="flex items-center">
                              {item.images && item.images[0] && (
                                <img
                                  src={item.images.find(img => img.isPrimary)?.url || item.images[0].url}
                                  alt={item.name}
                                  className="h-20 w-20 object-cover rounded-md mr-4 border border-gray-200"
                                />
                              )}
                              <div>
                                <div className="text-2xl font-medium text-gray-800">{item.name}</div>
                                <div className="text-xl text-gray-500">SKU: {item.variant?.sku || 'N/A'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-8 text-2xl text-gray-600">{item.variant?.name || '-'}</td>
                          <td className="px-8 py-8">
                            <div className="text-2xl font-medium text-gray-800">{formatCurrency(item.salePrice)}</div>
                            {item.basePrice > item.salePrice && (
                              <div className="text-xl text-gray-500 line-through">{formatCurrency(item.basePrice)}</div>
                            )}
                          </td>
                          <td className="px-8 py-8 text-2xl text-gray-600 font-medium">{item.quantity}</td>
                          <td className="px-8 py-8 text-2xl font-medium text-blue-600">{formatCurrency(item.salePrice * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50 font-medium">
                        <td colSpan="4" className="px-8 py-8 text-right text-2xl">Tổng cộng:</td>
                        <td className="px-8 py-8 text-blue-600 font-bold text-2xl">{formatCurrency(selectedOrder.total)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedOrderIdToDelete(selectedOrder.id);
                  setIsDeleteModalOpen(true);
                }}
                className="py-4 px-8 border border-red-300 text-red-600 rounded-md hover:bg-red-50 flex items-center gap-4 text-xl"
              >
                <X size={24} /> Xóa đơn hàng
              </button>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="py-4 px-8 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-4 text-xl"
              >
                <X size={24} /> Đóng
              </button>
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setIsStatusModalOpen(true);
                }}
                className="py-4 px-8 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-4 text-xl"
              >
                <Edit size={24} /> Cập nhật trạng thái
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full max-w-full mx-auto p-8 sm:p-10">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-4">
              <Package className="h-10 w-10 text-blue-600" />
              Quản lý đơn hàng
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="py-4 px-8 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-gray-700 flex items-center gap-4 text-xl"
              >
                <FileText size={24} /> Xuất Excel
              </button>

              <button
                onClick={fetchOrders}
                className="py-4 px-8 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-4 text-xl"
              >
                <RefreshCw size={24} /> Làm mới
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-center">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
                <Search size={28} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, số điện thoại, email hoặc mã đơn hàng..."
                className="w-full pl-14 pr-6 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative">
              <button
                className="flex items-center gap-4 px-8 py-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50 w-full md:w-auto justify-center text-xl"
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              >
                <Filter size={24} />
                <span>Trạng thái: {statusMapping[activeTab]}</span>
                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <StatusDropdownMenu />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          {Object.entries(statusMapping).map(([key, value]) => {
            if (key === 'all') return null;
            const count = orders.filter(order => order.status === key).length;
            const statusStyle = statusColors[key] || { bg: "bg-gray-400", text: "text-gray-800" };
            return (
              <div
                key={key}
                className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${activeTab === key ? 'border-blue-500' : `border-${key === 'pending' ? 'yellow' : key === 'processing' ? 'blue' : key === 'shipped' ? 'purple' : key === 'delivered' ? 'green' : 'red'}-400`
                  } cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => setActiveTab(key)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xl text-gray-500 mb-2">{value}</div>
                    <div className="text-3xl font-bold">{count}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full ${statusStyle.bg}`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {isSuccess && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 mb-8 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <Check size={24} className="mr-3" />
              <p className="text-2xl">{successMessage}</p>
            </div>
            <button onClick={() => setIsSuccess(false)} className="text-green-700 hover:text-green-800">
              <X size={24} />
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 mb-8 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <X size={24} className="mr-3" />
              <p className="text-2xl">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-red-700 hover:text-red-800">
              <X size={24} />
            </button>
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-40">
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              <span className="text-2xl">Đang xử lý...</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-8 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
                  <th className="px-8 py-8 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                  <th className="px-8 py-8 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">Ngày đặt</th>
                  <th className="px-8 py-8 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">Ngày giao</th>
                  <th className="px-8 py-8 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                  <th className="px-8 py-8 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-8 py-8 text-right text-xl font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!loading && filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-8 py-8 text-blue-600 font-medium text-2xl">#{order.id}</td>
                      <td className="px-8 py-8">
                        <div>
                          <p className="text-2xl font-medium text-gray-800">{order.fullName}</p>
                          <p className="text-xl text-gray-500 flex items-center gap-2">
                            <Phone size={20} />
                            {order.phone}
                          </p>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-2xl text-gray-600">{formatDate(order.createdAt)}</td>
                      <td className="px-8 py-8 text-2xl text-gray-600">{formatDate(order.deliveryDate)}</td>
                      <td className="px-8 py-8 text-2xl font-medium text-blue-600">{formatCurrency(order.total)}</td>
                      <td className="px-8 py-8">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex justify-end gap-4">
                          <button
                            className="p-4 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsDetailsModalOpen(true);
                            }}
                            title="Xem chi tiết"
                          >
                            <Eye size={24} />
                          </button>
                          <button
                            className="p-4 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsStatusModalOpen(true);
                            }}
                            title="Cập nhật trạng thái"
                          >
                            <Edit size={24} />
                          </button>
                          <button
                            className="p-4 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            onClick={() => {
                              setSelectedOrderIdToDelete(order.id);
                              setIsDeleteModalOpen(true);
                            }}
                            title="Xóa đơn hàng"
                          >
                            <X size={24} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-8 py-10 text-center text-gray-500">
                      {loading ? (
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mr-3"></div>
                          <span className="text-2xl">Đang tải dữ liệu...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Package size={48} className="text-gray-300 mb-3" />
                          <p className="text-2xl">Không tìm thấy đơn hàng nào.</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredOrders.length > 0 && (
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-xl text-gray-500">
                Hiển thị {filteredOrders.length} trong số {orders.length} đơn hàng
              </div>
              <div className="flex items-center gap-4">
                <button className="px-6 py-3 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xl">
                  Trước
                </button>
                <span className="px-6 py-3 bg-blue-100 text-blue-600 font-medium rounded-md text-xl">1</span>
                <button className="px-6 py-3 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xl">
                  Sau
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <StatusModal />
      <OrderDetailsModal />
      <ExportModal />
      <DeleteModal />
    </div>
  );
};

export default DashboardOrder;