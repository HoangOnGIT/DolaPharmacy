import React, { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';

const Search = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [placeholderText, setPlaceholderText] = useState('Tìm kiếm...');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  // Sử dụng useCallback để tránh tạo mới hàm handleSearch không cần thiết
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    if (term) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      ).slice(0, 5); // Giới hạn 5 kết quả
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [products]);

  // Kích hoạt tìm kiếm khi click vào biểu tượng
  const handleIconClick = () => {
    handleSearch(searchTerm);
  };

  // Điều hướng đến trang chi tiết sản phẩm và reset thanh tìm kiếm
  const handleProductClick = useCallback((product) => {
    setSearchTerm(''); // Reset ô input để ẩn thanh tìm kiếm
    setSearchResults([]); // Đảm bảo kết quả tìm kiếm cũng được ẩn
    navigate(`/product-detail/${product.id}`);
  }, [navigate]);

  // Reset thanh tìm kiếm khi click "Xem tất cả"
  const handleViewAllClick = useCallback(() => {
    setSearchTerm(''); // Reset ô input để ẩn thanh tìm kiếm
    setSearchResults([]); // Đảm bảo kết quả tìm kiếm cũng được ẩn
    navigate('/product');
  }, [navigate]);

  useEffect(() => {
    if (!products || products.length === 0) {
      setPlaceholderText('Tìm kiếm...');
      return;
    }

    const currentText = products[index]?.name || 'Tìm kiếm...';
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setPlaceholderText(currentText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setPlaceholderText(currentText.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % products.length);
        }
      }
    }, isDeleting ? 100 : 200);

    return () => clearTimeout(timeout);
  }, [products, index, charIndex, isDeleting]);

  return (
    <div className="relative flex items-center border border-blue-300 rounded-lg p-2 w-[500px] bg-white text-sm">
      <input
        className="flex-grow outline-none ml-2 text-black placeholder:text-gray-600 placeholder:font-normal bg-white"
        style={{ color: 'black', caretColor: 'black' }}
        type="text"
        placeholder={placeholderText}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <MagnifyingGlassIcon
        className="h-8 w-8 text-blue-500 cursor-pointer"
        onClick={handleIconClick}
      />
      {searchResults.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border rounded mt-1 shadow-lg z-50">
          <div className="p-2 text-green-600">Có {searchResults.length} sản phẩm</div>
          {searchResults.map((product) => (
            <div
              key={product.id}
              className="p-2 flex items-center hover:bg-gray-100 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <img src={product.images[0].url} alt={product.name} className="w-12 h-12 mr-2" />
              <div>
                <div className="text-black">{product.name}</div>
                <div className="text-red-500">
                  {product.discountedPrice ? product.discountedPrice.toLocaleString('vi-VN') : 'N/A'} VNĐ
                </div>
              </div>
            </div>
          ))}
          <hr className="border-t border-gray-300 opacity-50 m-2" />
          <div className='w-full flex items-center px-2 pb-2'>
            <button
              className="bg-white border w-full m-4 p-2 border-2 border-blue-600 !text-blue-600 px-6 py-2 rounded hover:bg-blue-600 hover:!text-white transition duration-300 ease-in-out cursor-pointer"
              onClick={handleViewAllClick}
            >
              Xem tất cả
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;