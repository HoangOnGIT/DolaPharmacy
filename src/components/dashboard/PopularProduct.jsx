import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PopularProduct = () => {
    const [data, setData] = useState([]);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetch(baseUrl+"/api/products")
            .then(res => res.json())
            .then(data => {
                setData(data.slice(0, 8));
            });
    }, []);

    return (
        <div className='bg-white px-4 py-3  border border-gray-200 w-[20rem] shadow-sm'>
            <div className="flex items-center gap-2 mb-4">
                <strong className="text-base text-gray-800">Sản phẩm phổ biến</strong>
            </div>

            <div className='flex flex-col gap-3'>
                {data.map(item => {
                    const primaryImage = item.images?.find(img => img.isPrimary) || item.images?.[0];
                    return (
                        <Link
                            key={item.id}
                            to={`/product/${item.id}`}
                            className='flex items-center justify-between gap-2 hover:bg-gray-50 transition rounded-lg p-2'
                        >
                            {/* Hình ảnh */}
                            <div className='w-12 h-12 min-w-12 bg-gray-200 rounded-md overflow-hidden'>
                                <img
                                    className='w-full h-full object-cover'
                                    src={primaryImage?.url || 'https://via.placeholder.com/50'}
                                    alt={primaryImage?.alt || 'Hình ảnh sản phẩm'}
                                />
                            </div>

                            {/* Tên + kho */}
                            <div className='flex flex-col justify-between flex-1 min-w-0'>
                                <p
                                    className="text-sm text-gray-800 font-medium leading-5 line-clamp-2"
                                    title={item.name}
                                >
                                    {item.name}
                                </p>
                                <span
                                    className={`text-xs font-medium ${item.stock?.available === 0
                                        ? 'text-orange-500'
                                        : 'text-green-600'
                                        }`}
                                >
                                    {item.stock?.available > 0
                                        ? `${item.stock?.available} in stock`
                                        : 'Out of stock'}
                                </span>
                            </div>

                            {/* Giá */}
                            <div className='text-sm font-semibold text-blue-500 whitespace-nowrap pl-2'>
                                {item.cost.toLocaleString()} ₫
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default PopularProduct;
