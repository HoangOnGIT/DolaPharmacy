import React, { useEffect, useState, useMemo  } from 'react';
const Modal = ({ categories, isModalOpen, setIsModalOpen }) => {
    const [listProduct, setListProduct] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetch(baseUrl+"/api/products")
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setListProduct(data);
                }
            });
    }, []);
    

    useEffect(() => {
        if (isModalOpen && categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0]);
        }
    }, [isModalOpen, categories, selectedCategory]);
    

    const handleOpen = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts = useMemo(() => {
        if (!selectedCategory) return [];
        return listProduct.filter(product => product.categoryName === selectedCategory.name);
      }, [listProduct, selectedCategory]);
      

    // 🛑 Không mở thì không render
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg p-4 w-[1000px] h-[600px] overflow-hidden">
                <div className="flex h-full">
                    {/* Sidebar */}
                    <div className="w-1/3 border-r pr-4 overflow-y-auto">
                        <ul>
                            <li>
                                <button onClick={() => setIsModalOpen(false)} className='cursor-pointer text-red-500 hover:opacity-70'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </button>
                            </li>
                            {categories.map(item => (
                                <li
                                    key={item.id}
                                    onClick={() => handleOpen(item)}
                                    className={`bg-[#1b74e7] py-2 px-4 mx-2 my-3 cursor-pointer rounded-lg font-medium ${selectedCategory?.id === item.id ? "bg-[#5dac46]" : "hover:bg-[#5dac46] hover:bg-opacity-50"}`}
                                >
                                    <p className='text-white flex justify-between items-center'>
                                        {item.name}
                                        <div className='h-4 w-4 flex justify-center items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </div>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Product list */}
                    <div className="w-2/3 pl-4 overflow-y-auto">
                        <div className="grid grid-cols-4 gap-4 pr-2">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <a href="#" key={product.id}>
                                        <div className="h-32 w-full flex flex-col items-center justify-between border rounded-lg p-2 hover:shadow-[0_4px_10px_rgba(59,130,246,0.5)] transition-shadow duration-300">
                                            <img
                                                src={product.image || "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/08/anh-con-meo-cute.jpg"}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <p className="text-xs text-center mt-2 break-words line-clamp-2">
                                                {product.name}
                                            </p>
                                        </div>
                                    </a>
                                ))
                            ) : (
                                <p className="col-span-4 text-center text-gray-500">
                                    Không có sản phẩm trong danh mục này
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;