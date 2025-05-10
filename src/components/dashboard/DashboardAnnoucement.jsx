import React, { useState, useEffect } from 'react';
import { Bell, Calendar, PlusCircle, Search, Edit, Trash2, ChevronDown, Filter, Clock, X } from 'lucide-react';

const DashboardAnnoucement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', date: '', priority: 'medium', status: 'active' });
  const itemsPerPage = 3;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token');

  // Fetch announcements from API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/announcements`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Không thể tải dữ liệu thông báo (${response.status})`);
        }
        const data = await response.json();
        setAnnouncements(data);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu thông báo:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on new search
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter and sort announcements
  const filteredAnnouncements = announcements
    .filter(a => 
      (activeTab === 'all' || a.status === activeTab) &&
      (a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.content.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'priority-desc') return getPriorityValue(b.priority) - getPriorityValue(a.priority);
      if (sortBy === 'priority-asc') return getPriorityValue(a.priority) - getPriorityValue(b.priority);
      return 0;
    });

  const getPriorityValue = (priority) => {
    const priorityMap = { high: 3, medium: 2, low: 1 };
    return priorityMap[priority.toLowerCase()] || 0;
  };

  // Pagination
  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const paginatedAnnouncements = filteredAnnouncements.slice(startIndex, endIndex);

  // Handle actions
  const handleDelete = async (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa thông báo với ID: ${id}?`)) {
      try {
        const response = await fetch(`${baseUrl}/api/announcements/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Xóa thông báo thất bại');
        }
        setAnnouncements(announcements.filter(a => a.id !== id));
        alert('Thông báo đã được xóa thành công');
      } catch (err) {
        console.error("Lỗi khi xóa thông báo:", err);
        alert(err.message);
      }
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/announcements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Thêm thông báo thất bại');
      }
      const newAnnouncement = await response.json();
      setAnnouncements([...announcements, newAnnouncement]);
      setIsAddModalOpen(false);
      setFormData({ title: '', content: '', date: '', priority: 'medium', status: 'active' });
      alert('Thông báo đã được thêm thành công');
    } catch (err) {
      console.error("Lỗi khi thêm thông báo:", err);
      alert(err.message);
    }
  };

  const handleEdit = (announcement) => {
    setSelectedAnnouncement(announcement);
    setFormData({ ...announcement });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/announcements/${selectedAnnouncement.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Cập nhật thông báo thất bại');
      }
      const updatedAnnouncement = await response.json();
      setAnnouncements(announcements.map(a => a.id === selectedAnnouncement.id ? updatedAnnouncement : a));
      setIsEditModalOpen(false);
      setSelectedAnnouncement(null);
      setFormData({ title: '', content: '', date: '', priority: 'medium', status: 'active' });
      alert('Thông báo đã được cập nhật thành công');
    } catch (err) {
      console.error("Lỗi khi cập nhật thông báo:", err);
      alert(err.message);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p className="font-medium">Lỗi khi tải dữ liệu</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Nội dung chính */}
      <main className="max-w-full mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Bảng Điều Khiển Thông Báo</h2>
          <button onClick={() => setIsAddModalOpen(true)} className="bg-green-600 hover:bg-green-700 !text-white px-6 py-3 rounded-lg flex items-center text-lg">
            <PlusCircle size={20} className="mr-3" />
            Thông Báo Mới
          </button>
        </div>

        {/* Thẻ thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-base">Tổng Số Thông Báo</p>
                <p className="text-3xl font-bold text-gray-800">{announcements.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Bell size={24} className="text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">+{Math.floor(Math.random() * 5)} từ tuần trước</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-base">Thông Báo Hoạt Động</p>
                <p className="text-3xl font-bold text-gray-800">{announcements.filter(a => a.status === 'active').length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock size={24} className="text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">+{Math.floor(Math.random() * 3)} từ tuần trước</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-base">Sắp Tới</p>
                <p className="text-3xl font-bold text-gray-800">{announcements.filter(a => a.status === 'upcoming').length}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Calendar size={24} className="text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">Không thay đổi từ tuần trước</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-base">Ưu Tiên Cao</p>
                <p className="text-3xl font-bold text-gray-800">{announcements.filter(a => a.priority === 'high').length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Bell size={24} className="text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">+{Math.floor(Math.random() * 2)} từ tuần trước</p>
          </div>
        </div>

        {/* Danh sách thông báo */}
        <div className="bg-white rounded-lg shadow-lg">
          {/* Bộ lọc và tìm kiếm */}
          <div className="p-6 border-b flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex space-x-2 bg-gray-100 rounded-lg p-2 w-full md:w-auto">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-6 py-3 rounded-md text-lg ${activeTab === 'all' ? 'bg-white shadow-md font-medium' : 'text-gray-600'}`}
              >
                Tất Cả
              </button>
              <button 
                onClick={() => setActiveTab('active')}
                className={`px-6 py-3 rounded-md text-lg ${activeTab === 'active' ? 'bg-white shadow-md font-medium' : 'text-gray-600'}`}
              >
                Hoạt Động
              </button>
              <button 
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 rounded-md text-lg ${activeTab === 'upcoming' ? 'bg-white shadow-md font-medium' : 'text-gray-600'}`}
              >
                Sắp Tới
              </button>
            </div>

            <div className="flex w-full md:w-auto space-x-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Tìm kiếm thông báo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-6 py-3 border rounded-lg w-full text-lg"
                />
                <Search size={20} className="absolute left-4 top-3 text-gray-400" />
              </div>
              <button className="flex items-center !mr-2 space-x-2 border rounded-lg px-6 py-3 bg-white hover:bg-gray-50 text-lg">
                <Filter size={20} />
                <span>Lọc</span>
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-6 py-3 bg-white hover:bg-gray-50 text-lg"
              >
                <option value="date-desc">Ngày (Mới Nhất)</option>
                <option value="date-asc">Ngày (Cũ Nhất)</option>
                <option value="priority-desc">Ưu Tiên (Cao đến Thấp)</option>
                <option value="priority-asc">Ưu Tiên (Thấp đến Cao)</option>
              </select>
            </div>
          </div>

          {/* Tiêu đề bảng */}
          <div className="hidden md:grid grid-cols-12 gap-6 p-6 border-b bg-gray-50 font-semibold text-gray-600 text-lg">
            <div className="col-span-5">Thông Báo</div>
            <div className="col-span-3">Ngày</div>
            <div className="col-span-2">Ưu Tiên</div>
            <div className="col-span-2">Hành Động</div>
          </div>

          {/* Nội dung bảng */}
          <div className="divide-y">
            {paginatedAnnouncements.length > 0 ? (
              paginatedAnnouncements.map(announcement => (
                <div key={announcement.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 p-6 hover:bg-gray-50">
                  <div className="col-span-1 md:col-span-5">
                    <h3 className="font-semibold text-xl text-gray-800">{announcement.title}</h3>
                    <p className="text-gray-600 text-base mt-2">{announcement.content}</p>
                    <div className="md:hidden flex items-center mt-4">
                      <span className="text-sm bg-gray-100 px-3 py-2 rounded mr-2">{announcement.date}</span>
                      <span className={`text-sm px-3 py-2 rounded ${
                        announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                        announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:block col-span-3 text-gray-600 text-lg">{announcement.date}</div>
                  <div className="hidden md:block col-span-2">
                    <span className={`text-sm px-3 py-2 rounded ${
                      announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                      announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                    </span>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex justify-end md:justify-start items-center space-x-4">
                    <button onClick={() => handleEdit(announcement)} className="p-2 rounded-full hover:bg-gray-100">
                      <Edit size={20} className="text-gray-600" />
                    </button>
                    <button onClick={() => handleDelete(announcement.id)} className="p-2 rounded-full hover:bg-gray-100">
                      <Trash2 size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 text-lg">
                Không tìm thấy thông báo trong danh mục này.
              </div>
            )}
          </div>

          {/* Phân trang */}
          <div className="p-6 border-t flex justify-between items-center">
            <p className="text-base text-gray-600">Đang hiển thị {paginatedAnnouncements.length} trong {filteredAnnouncements.length} thông báo</p>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50 text-lg disabled:opacity-50"
              >
                Trước
              </button>
              <button className="px-4 py-2 border rounded-md bg-green-600 !text-white !mx-2">{currentPage}</button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50 text-lg disabled:opacity-50"
              >
                Tiếp
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Nút hành động nhanh */}
      <div className="fixed bottom-8 right-8">
        <button onClick={() => setIsAddModalOpen(true)} className="bg-green-600 hover:bg-green-700 !text-white p-5 rounded-full shadow-lg">
          <PlusCircle size={28} />
        </button>
      </div>

      {/* Modal Thêm Thông Báo */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Thêm Thông Báo Mới</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAdd}>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Ngày</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Ưu tiên</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="high">Cao</option>
                  <option value="medium">Trung bình</option>
                  <option value="low">Thấp</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="active">Hoạt động</option>
                  <option value="upcoming">Sắp tới</option>
                  <option value="past">Quá khứ</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-green-600 !text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Chỉnh Sửa Thông Báo */}
      {isEditModalOpen && selectedAnnouncement && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Chỉnh Sửa Thông Báo</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Ngày</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Ưu tiên</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="high">Cao</option>
                  <option value="medium">Trung bình</option>
                  <option value="low">Thấp</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Hoạt động</option>
                  <option value="upcoming">Sắp tới</option>
                  <option value="past">Quá khứ</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 !text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAnnoucement;