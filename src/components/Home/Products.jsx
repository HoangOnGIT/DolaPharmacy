import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SingleProduct from '../common/SingleProduct';

const Products = ({ name }) => {
    const [products, setProducts] = useState([]);
    const [productIndex, setProductIndex] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        fetch('http://localhost:3000/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const handleProductNext = () => {
        if (productIndex + itemsPerPage < products.length) {
            setProductIndex(productIndex + 1);
        }
    };

    const handleProductPrev = () => {
        if (productIndex > 0) {
            setProductIndex(productIndex - 1);
        }
    };

    return (
        <div className="mt-6">
            <div className="mb-10">
                <Link to="product">
                    <p className="hover:text-[#003cbf] cursor-pointer w-[300px] font-semibold text-3xl ">
                        {name}
                    </p>
                </Link>
            </div>
            <div className="relative w-full rounded-lg shadow-sm">
                <div className="overflow-hidden bg-blue-600 p-2 rounded-lg">
                    <div
                        className="flex flex-row transition-transform duration-500 ease-in-out gap-2"
                        style={{
                            transform: `translateX(-${productIndex * (100 / itemsPerPage)}%)`,
                        }}
                    >
                        {products.map((product, index) => (
                            <SingleProduct key={product._id} product={product} className="w-screen" />
                        ))}
                    </div>
                </div>
                {productIndex > 0 && (
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-0">
                        <button
                            dir="ltr"
                            onClick={handleProductPrev}
                            className="group hover:bg-blue-500 transition-colors cursor-pointer p-2 rounded-full shadow-md bg-gray-200 py-4 px-1 rounded-s-lg !text-[#0f62f9]"
                        >
                            <svg
                                className="w-6 h-6 text-[#0f62f9] group-hover:text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                    </div>
                )}
                {productIndex + itemsPerPage < products.length && (
                    <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
                        <button
                            dir="rtl"
                            onClick={handleProductNext}
                            className="group hover:bg-blue-500 transition-colors cursor-pointer p-2 rounded-full shadow-md bg-gray-200 py-4 px-1 rounded-s-lg"
                        >
                            <svg
                                className="w-6 h-6 text-gray-600 group-hover:text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            <div className="mt-10 text-center">
                <Link to="/product">
                    <button className="hover:bg-[#003cbf] hover:!text-white cursor-pointer transition-colors duration-300  px-4 py-2 border-2 border-solid border-blue-700 rounded-sm font-lg">
                        Xem tất cả
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Products;