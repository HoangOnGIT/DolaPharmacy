import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Search = ({ categories }) => {
  const [placeholderText, setPlaceholderText] = useState('');
  const [index, setIndex] = useState(0); // Chỉ số của chuỗi hiện tại
  const [charIndex, setCharIndex] = useState(0); // Chỉ số ký tự hiện tại
  const [isDeleting, setIsDeleting] = useState(false); // Trạng thái xóa ký tự

  useEffect(() => {
    // Kiểm tra nếu categories không tồn tại hoặc rỗng
    if (!categories || categories.length === 0) {
      setPlaceholderText('Tìm kiếm...');
      return;
    }

    // Lấy chuỗi name từ categories[index]
    const currentText = categories[index]?.name || ''; // Truy cập name, nếu không có thì dùng chuỗi rỗng
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Hiện dần từng ký tự
        setPlaceholderText(currentText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1000); // Dừng 1 giây trước khi xóa
        }
      } else {
        // Xóa dần từng ký tự
        setPlaceholderText(currentText.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false); // Chuyển sang chuỗi tiếp theo khi đã xóa hết
          setIndex((prevIndex) => (prevIndex + 1) % categories.length); // Chuyển sang chuỗi tiếp theo
        }
      }
    }, isDeleting ? 100 : 200); // Tốc độ xóa nhanh hơn tốc độ hiện

    return () => clearTimeout(timeout);
  }, [categories, index, charIndex, isDeleting]);

  return (
    <div className='flex items-center border rounded-xl p-2 w-140 bg-white text-xs'>
      <input
        className='flex-grow outline-none ml-2 text-black'
        type="text"
        placeholder={placeholderText}
      />
      <MagnifyingGlassIcon className='h-8 w-8 text-blue-500 cursor-pointer' />
    </div>
  );
};

export default Search;