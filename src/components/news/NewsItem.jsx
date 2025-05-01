import React from 'react';
import { Link } from 'react-router-dom';

export default function NewsItem({ date, title, excerpt, imageUrl, slug }) {
  return (
    <div className="news-item bg-white rounded-lg shadow-md overflow-hidden relative">
      <div className="date-badge absolute top-0 left-0 bg-blue-600 text-white px-2 py-0.5 text-xs m-2 rounded">
        {date}
      </div>
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{excerpt}</p>
        <Link 
          to={`/news/${slug}`} 
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
        >
          Đọc tiếp
        </Link>
      </div>
    </div>
  );
}
