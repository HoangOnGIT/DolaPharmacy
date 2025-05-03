import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!response.ok) throw new Error("Không tìm thấy sản phẩm");
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.images?.find(img => img.isPrimary)?.url || data.images?.[0]?.url || "https://via.placeholder.com/500");
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-blue-700 animate-pulse">Đang tải...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-red-500">Sản phẩm không tồn tại</div>
      </div>
    );
  }

  const primaryImage = product.images?.find(img => img.isPrimary);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleEditImageClick = () => {
    setIsEditingImage(true);
    alert("Tính năng thay đổi ảnh sẽ được tích hợp sau!");
    setIsEditingImage(false);
  };

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước đó trong lịch sử duyệt web
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-md rounded-lg p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-blue-700 mb-6">
            Chi tiết sản phẩm: <span className="text-green-600">{product.name}</span>
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Image Section */}
          <div className="lg:col-span-1 bg-white rounded-md shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-3">
              Hình ảnh
            </h2>
            <div className="relative rounded-md overflow-hidden cursor-pointer" onClick={handleEditImageClick}>
              <img
                src={selectedImage}
                alt={primaryImage?.alt || "Hình ảnh sản phẩm"}
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-3 right-3 bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                {primaryImage?.isPrimary ? "Chính" : "Phụ"}
              </div>
              <div className="absolute bottom-3 right-3 bg-gray-300 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-400">
                <FiEdit className="inline-block mr-1" size={16} /> Thay đổi
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.images?.map((img) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt={img.alt}
                  className="w-20 h-20 object-cover rounded-md border border-gray-300 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleImageClick(img.url)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-3">
                Thông tin cơ bản
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-lg text-gray-600"><strong className="text-blue-800">Mã SKU:</strong> <span className="font-semibold">{product.sku}</span></p>
                  <p className="text-lg text-gray-600"><strong className="text-blue-800">Danh mục:</strong> <span className="font-semibold text-indigo-600">{product.categoryName}</span></p>
                  <p className="text-lg text-gray-600"><strong className="text-blue-800">Thương hiệu:</strong> <span className="font-semibold">{product.brand}</span></p>
                  <p className="text-lg text-gray-600"><strong className="text-blue-800">Xuất xứ:</strong> <span className="font-semibold">{product.origin}</span></p>
                </div>
                <div>
                  <p className="text-lg text-gray-600"><strong className="text-blue-800">Trọng lượng:</strong> <span className="font-semibold">{product.weight}</span></p>
                  <p className="text-lg text-gray-600"><strong className="text-blue-800">Đối tượng:</strong> <span className="font-semibold">{product.targeted}</span></p>
                  <p className="text-lg text-gray-600"><strong className="text-blue-800">Trạng thái:</strong> <span className={`font-semibold ${product.status === 'Còn hàng' ? 'text-green-600' : 'text-red-600'}`}>{product.status}</span></p>
                  <p className="text-lg text-gray-600"><strong className="text-blue-800">Yêu cầu đơn thuốc:</strong> <span className="font-semibold">{product.requiresPrescription ? "Có" : "Không"}</span></p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-3">
                Giá cả
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <p className="text-lg text-gray-600"><strong className="text-blue-800">Giá gốc:</strong> <span className="font-semibold text-orange-600">{product.basePrice?.toLocaleString()} VNĐ</span></p>
                <p className="text-lg text-gray-600"><strong className="text-blue-800">Giá bán:</strong> <span className="font-semibold text-purple-600">{product.salePrice?.toLocaleString()} VNĐ</span></p>
                <p className="text-lg text-gray-600"><strong className="text-blue-800">Giá vốn:</strong> <span className="font-semibold">{product.cost?.toLocaleString()} VNĐ</span></p>
                <p className="text-lg text-gray-600"><strong className="text-blue-800">Giảm giá:</strong> <span className="font-semibold text-teal-600">{product.discount?.value ?? 0}%</span> (Tối đa <span className="font-semibold">{product.discount?.maxDiscountAmount?.toLocaleString()} VNĐ</span>)</p>
                <p className="text-lg text-green-600 font-semibold"><strong className="text-blue-800">Giá sau giảm:</strong> <span className="font-semibold text-green-700">{product.discountedPrice?.toLocaleString()} VNĐ</span></p>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-3">
                Kho hàng
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <p className="text-lg text-gray-600"><strong className="text-blue-800">Tổng số lượng:</strong> <span className="font-semibold">{product.stock?.total ?? 0}</span></p>
                <p className="text-lg text-gray-600"><strong className="text-blue-800">Số lượng sẵn có:</strong> <span className="font-semibold text-blue-600">{product.stock?.available ?? 0}</span></p>
                <p className="text-lg text-gray-600"><strong className="text-blue-800">Số lượng đã đặt:</strong> <span className="font-semibold">{product.stock?.reserved ?? 0}</span></p>
                <p className="text-lg text-gray-600"><strong className="text-blue-800">Ngưỡng cảnh báo:</strong> <span className={`font-semibold ${product.stock?.lowStockThreshold > 0 && product.stock?.available <= product.stock?.lowStockThreshold ? 'text-yellow-600' : ''}`}>{product.stock?.lowStockThreshold ?? 0}</span></p>
                <p className="text-lg text-gray-600"><strong className="text-blue-800">Lần nhập kho cuối:</strong> <span className="font-semibold">{product.stock?.lastRestocked ? new Date(product.stock.lastRestocked).toLocaleDateString() : 'N/A'}</span></p>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-3">
                Mô tả và thông tin y tế
              </h2>
              <div className="space-y-4">
                <div className="prose max-w-none text-lg" dangerouslySetInnerHTML={{ __html: product.description }} />
                <p className="text-lg text-gray-600"><strong className="text-blue-800">Thành phần:</strong> <span className="font-semibold">{product.ingredients || 'N/A'}</span></p>
                <p className="text-lg text-gray-600"><strong className="text-blue-800">Liều dùng:</strong> <span className="font-semibold">{product.dosage || 'N/A'}</span></p>
                <p className="text-lg text-red-600"><strong className="text-blue-800">Cảnh báo:</strong> <span className="font-semibold">{product.warnings || 'N/A'}</span></p>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-3">
                Thống kê
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <p className="text-lg text-gray-600"><strong className="text-blue-800">Đánh giá trung bình:</strong> <span className="font-semibold text-yellow-500">{product.averageRating?.toFixed(1) ?? 0}</span></p>
                <p className="text-lg text-gray-600"><strong className="text-blue-800">Số đánh giá:</strong> <span className="font-semibold">{product.reviewCount ?? 0}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-10 space-x-6">
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium text-lg"
          >
            Về trang trước
          </button>
          <Link
            to={`/product/${product.id}/edit`}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-lg"
          >
            Chỉnh sửa
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;