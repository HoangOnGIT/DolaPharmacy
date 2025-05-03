import React from 'react';
import { Dialog } from '@headlessui/react';

const TableProductModal = ({ isOpen, onClose, mode, productData, onSubmit }) => {
  const isView = mode === 'view';
  const isEdit = mode === 'edit';
  const isCreate = mode === 'create';

  const [formData, setFormData] = React.useState(productData || {});

  React.useEffect(() => {
    setFormData(productData || {});
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4 bg-black bg-opacity-30">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
          <Dialog.Title className="text-lg font-bold mb-4">
            {isView ? 'Xem chi tiết sản phẩm' : isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </Dialog.Title>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Tên sản phẩm</label>
              <input
                type="text"
                name="name"
                className="border rounded px-2 py-1 w-full"
                value={formData.name || ''}
                onChange={handleChange}
                disabled={isView}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Giá</label>
              <input
                type="number"
                name="cost"
                className="border rounded px-2 py-1 w-full"
                value={formData.cost || ''}
                onChange={handleChange}
                disabled={isView}
              />
            </div>
            {/* Thêm các trường khác nếu cần */}
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-1 border rounded text-gray-600 hover:bg-gray-100">Đóng</button>
            {!isView && (
              <button onClick={handleSubmit} className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                {isEdit ? 'Cập nhật' : 'Thêm'}
              </button>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TableProductModal;
