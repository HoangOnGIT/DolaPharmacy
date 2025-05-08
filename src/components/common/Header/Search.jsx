import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Search = ({ categories }) => {
  const [placeholderText, setPlaceholderText] = useState('Tìm kiếm...');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Nếu categories không hợp lệ, giữ placeholder mặc định
    if (!categories || categories.length === 0) {
      setPlaceholderText('Tìm kiếm...');
      return;
    }

    // Đảm bảo currentText không bao giờ là undefined
    const currentText = categories[index]?.name || 'Tìm kiếm...';
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
          setIndex((prevIndex) => (prevIndex + 1) % categories.length);
        }
      }
    }, isDeleting ? 100 : 200);

    return () => clearTimeout(timeout);
  }, [categories, index, charIndex, isDeleting]);

  return (
    <div className="flex items-center border rounded-xl p-2 w-[500px] bg-white text-sm">
      <input
        className="flex-grow outline-none ml-2 text-black placeholder:text-gray-500 placeholder:font-normal"
        type="text"
        placeholder={placeholderText}
      />
      <MagnifyingGlassIcon className="h-8 w-8 text-blue-500 cursor-pointer" />
    </div>
  );
};

export default Search;