import React from 'react';
import { Link } from 'react-router-dom';

export default function LatestNewsItem({ date, title, imageUrl, slug }) {
  return (
    <Link to={`/news/${slug}`} className="flex items-center p-2 border-b hover:bg-gray-50">
      <div className="w-12 h-12 flex-shrink-0 mr-3">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium line-clamp-2">{title}</h4>
        <div className="text-xs text-gray-500 mt-1">{date}</div>
      </div>
    </Link>
  );
}
