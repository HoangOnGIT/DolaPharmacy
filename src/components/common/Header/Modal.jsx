"use client"

import { useEffect, useState, useMemo } from "react"
import { FaTimes, FaChevronRight } from "react-icons/fa"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { Link } from "react-router-dom"

const Modal = ({ categories, isModalOpen, setIsModalOpen }) => {
    const [listProduct, setListProduct] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(`${baseUrl}/api/products`)
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
                const data = await response.json()
                setListProduct(data)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [baseUrl])

    useEffect(() => {
        if (isModalOpen && categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0])
        }
    }, [isModalOpen, categories, selectedCategory])

    const handleOpen = (category) => setSelectedCategory(category)

    const filteredProducts = useMemo(() => {
        if (!selectedCategory) return []
        return listProduct
            .filter(
                (product) =>
                    product.categoryName &&
                    selectedCategory.name &&
                    product.categoryName.trim().toLowerCase() === selectedCategory.name.trim().toLowerCase()
            )
            .slice(0, 8) // Limit to 8 products per category
    }, [listProduct, selectedCategory])

    if (!isModalOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-[1000px] h-[80vh] max-h-[600px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-500 to-teal-500 text-white">
                        <h2 className="text-lg font-semibold">Chọn sản phẩm</h2>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="rounded-full p-1 hover:bg-white/20 transition-colors cursor-pointer"
                            aria-label="Đóng"
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 h-full overflow-hidden">
                        {/* Sidebar */}
                        <div className="w-1/3 border-r overflow-y-auto bg-white">
                            <div className="py-2">
                                {categories.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleOpen(item)}
                                        className={`w-full text-left py-3 px-4 my-1 transition-all  duration-200 cursor-pointer rounded-r-lg ${selectedCategory?.id === item.id
                                            ? "bg-teal-500 text-white !text-white"
                                            : "bg-white hover:bg-sky-100 text-gray-700 "
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{item.name}</span>
                                            <FaChevronRight
                                                className={`w-4 h-4 transition-colors ${selectedCategory?.id === item.id ? "text-white" : "text-gray-400"
                                                    }`}
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product list */}
                        <div className="w-2/3 overflow-y-auto p-4">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <AiOutlineLoading3Quarters className="w-8 h-8 text-sky-500 animate-spin mb-2" />
                                    <p className="text-gray-500">Đang tải sản phẩm...</p>
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                                    <div className="bg-red-50 text-red-500 p-4 rounded-lg">
                                        <p className="font-medium mb-1">Lỗi khi tải sản phẩm</p>
                                        <p className="text-sm">{error}</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-md font-medium mb-4 text-sky-600">{selectedCategory?.name || "Sản phẩm"}</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {filteredProducts.length > 0 ? (
                                            filteredProducts.map((product) => (
                                                <a href="#" key={product.id} className="group">
                                                    <div className="flex flex-col items-center justify-between border rounded-lg p-3 h-full bg-white hover:shadow-lg hover:border-sky-400 transition-all duration-200">
                                                        <Link 
                                                            to={`product-detail/${product.id}`}
                                                            onClick={() => setIsModalOpen(false)}
                                                        >
                                                            <div className="relative w-full pb-[100%] mb-2 overflow-hidden rounded-md bg-gray-100">
                                                                <img
                                                                    src={
                                                                        product.images && product.images[0]?.url
                                                                            ? product.images[0].url
                                                                            : "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/08/anh-con-meo-cute.jpg"
                                                                    }
                                                                    alt={product.name}
                                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                />
                                                            </div>
                                                            <p className="text-xs text-center w-full break-words line-clamp-2 text-gray-800 group-hover:text-teal-600 transition-colors ">
                                                                {product.name}
                                                            </p>
                                                        </Link>
                                                    </div>
                                                </a>
                                            ))
                                        ) : (
                                            <div className="col-span-full flex items-center justify-center h-40 bg-sky-50 rounded-lg">
                                                <p className="text-gray-500 text-center">Không có sản phẩm trong danh mục này</p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal