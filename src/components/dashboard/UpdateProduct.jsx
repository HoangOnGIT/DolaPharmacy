"use client"

import { useState, useRef, useEffect } from "react"
import { FiPlus, FiTrash2, FiArrowLeft, FiImage } from "react-icons/fi"
import { Editor } from "@tinymce/tinymce-react"
import { useNavigate, useParams } from "react-router-dom"

export default function UpdateProduct() {
  const navigate = useNavigate()
  const { id } = useParams()
  const editorRef = useRef(null)
  const [activeTab, setActiveTab] = useState("general")
  const [variants, setVariants] = useState([])
  const [images, setImages] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [brands, setBrands] = useState([])
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    brand: "",
    category: "",
    categoryName: "",
    subCategory: "",
    basePrice: 0,
    salePrice: 0,
    cost: 0,
    discount: { type: "percentage", value: 0, maxDiscountAmount: 0 },
    stock: { total: 0, lowStockThreshold: 0 },
    priceRange: "",
    origin: "",
    manufacturerName: "",
    weight: "",
    targeted: "",
    supplierId: "",
    status: "active",
    isFeatured: false,
    isPopular: false,
    description: "",
    ingredients: "",
    dosage: "",
    warnings: "",
    requiresPrescription: false,
  })

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          alert("Không tìm thấy token. Vui lòng đăng nhập lại")
          navigate("/login")
          return
        }

        // Fetch categories
        const categoriesResponse = await fetch(`${baseUrl}/api/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!categoriesResponse.ok) throw new Error("Không thể tải danh mục")
        const categoriesData = await categoriesResponse.json()
        setCategories(categoriesData)

        // Fetch suppliers
        const suppliersResponse = await fetch(`${baseUrl}/api/suppliers`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!suppliersResponse.ok) throw new Error("Không thể tải nhà cung cấp")
        const suppliersData = await suppliersResponse.json()
        setSuppliers(suppliersData)

        // Fetch brands
        const brandsResponse = await fetch(`${baseUrl}/api/brands`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!brandsResponse.ok) throw new Error("Không thể tải thương hiệu")
        const brandsData = await brandsResponse.json()
        // Transform the array of strings into array of objects with id and name
        const formattedBrands = brandsData.map((brandName, index) => ({
          id: index.toString(),
          name: brandName,
        }))
        setBrands(formattedBrands)

        // Fetch product
        const productResponse = await fetch(`${baseUrl}/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!productResponse.ok) throw new Error("Không thể tải thông tin sản phẩm")
        const product = await productResponse.json()

        setFormData({
          name: product.name || "",
          sku: product.sku || "",
          brand: product.brand || "",
          category: product.category || "",
          categoryName: product.categoryName || "",
          subCategory: product.subCategory || "",
          basePrice: product.basePrice || 0,
          salePrice: product.salePrice || 0,
          cost: product.cost || 0,
          discount: product.discount || { type: "percentage", value: 0, maxDiscountAmount: 0 },
          stock: product.stock || { total: 0, lowStockThreshold: 0 },
          priceRange: product.priceRange || "",
          origin: product.origin || "",
          manufacturerName: product.manufacturerName || "",
          weight: product.weight || "",
          targeted: product.targeted || "",
          supplierId: product.supplierId || "",
          status: product.status || "active",
          isFeatured: product.isFeatured || false,
          isPopular: product.isPopular || false,
          description: product.description || "",
          ingredients: product.ingredients || "",
          dosage: product.dosage || "",
          warnings: product.warnings || "",
          requiresPrescription: product.requiresPrescription || false,
        })
        setVariants(product.variants || [])
        setImages(product.images || [])
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error)
        alert("Không thể tải thông tin. Vui lòng thử lại.")
        navigate("/dashboard")
      } finally {
        setIsLoading(false)
      }
    }

    fetchInitialData()
  }, [id, navigate, baseUrl])

  const handleCancel = () => {
    window.history.back()
  }

  const addVariant = () => {
    setVariants([...variants, { id: crypto.randomUUID(), name: "", sku: "", price: 0, stock: 0 }])
  }

  const removeVariant = (id) => {
    setVariants(variants.filter((v) => v.id !== id))
  }

  const updateVariant = (id, field, value) => {
    setVariants(variants.map((v) => (v.id === id ? { ...v, [field]: value } : v)))
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setIsUploading(true)
    const cloudName = "dysjwopcc"
    const uploadPreset = "Dola-Pharmacy"

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", uploadPreset)

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(`Lỗi khi tải ảnh lên Cloudinary: ${errorData.message || "Không xác định"}`)
        }

        const data = await response.json()
        return {
          id: crypto.randomUUID(),
          url: data.secure_url,
          alt: `Product image ${images.length + 1}`,
          isPrimary: images.length === 0,
          sortOrder: images.length,
        }
      } catch (error) {
        console.error("Lỗi khi tải ảnh:", error)
        return null
      }
    })

    try {
      const results = await Promise.all(uploadPromises)
      const uploadedImages = results.filter((img) => img !== null)

      if (uploadedImages.length === 0) {
        alert("Không thể tải bất kỳ ảnh nào lên Cloudinary. Vui lòng thử lại.")
      } else if (uploadedImages.length < files.length) {
        alert("Một số ảnh không thể tải lên. Vui lòng kiểm tra lại.")
      }

      setImages((prevImages) => [
        ...prevImages,
        ...uploadedImages.map((img, index) => ({
          ...img,
          sortOrder: prevImages.length + index,
          isPrimary: prevImages.length === 0 && index === 0,
        })),
      ])
    } catch (error) {
      console.error("Lỗi tổng thể khi tải ảnh:", error)
      alert("Đã xảy ra lỗi khi tải ảnh. Vui lòng thử lại.")
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = (id) => {
    setImages(images.filter((img) => img.id !== id))
  }

  const setPrimaryImage = (id) => {
    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === id ? { ...img, isPrimary: true } : { ...img, isPrimary: false }
      )
    )
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (name === "category") {
      const selectedCategory = categories.find((cat) => cat.id === value)
      setFormData((prev) => ({
        ...prev,
        category: value,
        categoryName: selectedCategory ? selectedCategory.name : "",
      }))
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    if (!token) {
      alert("Không tìm thấy token. Vui lòng đăng nhập lại")
      navigate("/login")
      return
    }

    const product = {
      ...formData,
      variants: variants.map((v) => ({
        id: v.id,
        name: v.name,
        sku: v.sku,
        price: Number(v.price),
        stock: Number(v.stock),
      })),
      images: images.map((img) => ({
        url: img.url,
        alt: img.alt,
        isPrimary: img.isPrimary,
        sortOrder: img.sortOrder,
      })),
    }

    try {
      const response = await fetch(`${baseUrl}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      })

      if (!response.ok) {
        const errorData = await response.json()
        alert(`Lỗi khi cập nhật sản phẩm: ${response.status} - ${errorData.message || "Lỗi không xác định"}`)
        return
      }

      alert("Sản phẩm đã được cập nhật thành công!")
      navigate("/dashboard")
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error)
      alert("Đã xảy ra lỗi khi cập, Vui lòng thử lại sau.")
    }
  }

  if (isLoading) {
    return <div className="p-6">Đang tải thông tin sản phẩm...</div>
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <button onClick={handleCancel} className="p-2 rounded-full hover:bg-gray-100">
            <FiArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl !font-bold">Cập nhật sản phẩm</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Tên sản phẩm
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Nhập tên sản phẩm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sku" className="block text-sm font-medium mb-1">
                      Mã SKU
                    </label>
                    <input
                      id="sku"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Mã SKU"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="brand" className="block text-sm font-medium mb-1">
                      Thương hiệu
                    </label>
                    <select
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                    >
                      <option value="">Chọn thương hiệu</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.name} className="text-gray-800">
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">
                      Danh mục
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                      required
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id} className="text-gray-800">
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="subCategory" className="block text-sm font-medium mb-1">
                      Danh mục phụ
                    </label>
                    <input
                      id="subCategory"
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Danh mục phụ"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="border-b mb-4">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className={`pb-2 px-1 ${activeTab === "general" ? "border-b-2 border-blue-500 font-medium" : ""}`}
                    onClick={() => setActiveTab("general")}
                  >
                    Thông tin chung
                  </button>
                  <button
                    type="button"
                    className={`pb-2 px-1 ${activeTab === "variants" ? "border-b-2 border-blue-500 font-medium" : ""}`}
                    onClick={() => setActiveTab("variants")}
                  >
                    Biến thể
                  </button>
                  <button
                    type="button"
                    className={`pb-2 px-1 ${activeTab === "description" ? "border-b-2 border-blue-500 font-medium" : ""}`}
                    onClick={() => setActiveTab("description")}
                  >
                    Mô tả
                  </button>
                  <button
                    type="button"
                    className={`pb-2 px-1 ${activeTab === "medical" ? "border-b-2 border-blue-500 font-medium" : ""}`}
                    onClick={() => setActiveTab("medical")}
                  >
                    Thông tin y tế
                  </button>
                </div>
              </div>

              <div style={{ display: activeTab === "general" ? "block" : "none" }}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="basePrice" className="block text-sm font-medium mb-1">
                        Giá gốc (VNĐ)
                      </label>
                      <input
                        id="basePrice"
                        name="basePrice"
                        type="number"
                        value={formData.basePrice}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        min="0"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="salePrice" className="block text-sm font-medium mb-1">
                        Giá bán (VNĐ)
                      </label>
                      <input
                        id="salePrice"
                        name="salePrice"
                        type="number"
                        value={formData.salePrice}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        min="0"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cost" className="block text-sm font-medium mb-1">
                        Giá vốn (VNĐ)
                      </label>
                      <input
                        id="cost"
                        name="cost"
                        type="number"
                        value={formData.cost}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="discountType" className="block text-sm font-medium mb-1">
                        Loại giảm giá
                      </label>
                      <select
                        id="discountType"
                        name="discount.type"
                        value={formData.discount.type}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                      >
                        <option value="percentage" className="text-gray-800">
                          Phần trăm (%)
                        </option>
                        <option value="fixed" className="text-gray-800">
                          Số tiền cố định
                        </option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="discountValue" className="block text-sm font-medium mb-1">
                        Giá trị giảm
                      </label>
                      <input
                        id="discountValue"
                        name="discount.value"
                        type="number"
                        value={formData.discount.value}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        min="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="maxDiscountAmount" className="block text-sm font-medium mb-1">
                        Giảm giá tối đa (VNĐ)
                      </label>
                      <input
                        id="maxDiscountAmount"
                        name="discount.maxDiscountAmount"
                        type="number"
                        value={formData.discount.maxDiscountAmount}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="stockTotal" className="block text-sm font-medium mb-1">
                        Tổng số lượng
                      </label>
                      <input
                        id="stockTotal"
                        name="stock.total"
                        type="number"
                        value={formData.stock.total}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        min="0"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lowStockThreshold" className="block text-sm font-medium mb-1">
                        Ngưỡng cảnh báo hết hàng
                      </label>
                      <input
                        id="lowStockThreshold"
                        name="stock.lowStockThreshold"
                        type="number"
                        value={formData.stock.lowStockThreshold}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        min="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="priceRange" className="block text-sm font-medium mb-1">
                        Phân khúc giá
                      </label>
                      <select
                        id="priceRange"
                        name="priceRange"
                        value={formData.priceRange}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                      >
                        <option value="Dưới 1 triệu" className="text-gray-800">
                          Dưới 1 triệu
                        </option>
                        <option value="1-5 triệu" className="text-gray-800">
                          1-5 triệu
                        </option>
                        <option value="5-10 triệu" className="text-gray-800">
                          5-10 triệu
                        </option>
                        <option value="10-20 triệu" className="text-gray-800">
                          10-20 triệu
                        </option>
                        <option value="20-50 triệu" className="text-gray-800">
                          20-50 triệu
                        </option>
                        <option value="Trên 50 triệu" className="text-gray-800">
                          Trên 50 triệu
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="origin" className="block text-sm font-medium mb-1">
                        Xuất xứ
                      </label>
                      <input
                        id="origin"
                        name="origin"
                        value={formData.origin}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Xuất xứ sản phẩm"
                      />
                    </div>
                    <div>
                      <label htmlFor="manufacturerName" className="block text-sm font-medium mb-1">
                        Nhà sản xuất
                      </label>
                      <input
                        id="manufacturerName"
                        name="manufacturerName"
                        value={formData.manufacturerName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Tên nhà sản xuất"
                      />
                    </div>
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium mb-1">
                        Trọng lượng
                      </label>
                      <select
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                      >
                        <option value="Dưới 100g" className="text-gray-800">
                          Dưới 100g
                        </option>
                        <option value="100g-500g" className="text-gray-800">
                          100g-500g
                        </option>
                        <option value="500g-1kg" className="text-gray-800">
                          500g-1kg
                        </option>
                        <option value="1kg-2kg" className="text-gray-800">
                          1kg-2kg
                        </option>
                        <option value="Trên 2kg" className="text-gray-800">
                          Trên 2kg
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="targeted" className="block text-sm font-medium mb-1">
                        Đối tượng
                      </label>
                      <select
                        id="targeted"
                        name="targeted"
                        value={formData.targeted}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                      >
                        <option value="Nam" className="text-gray-800">
                          Nam
                        </option>
                        <option value="Nữ" className="text-gray-800">
                          Nữ
                        </option>
                        <option value="Trẻ em" className="text-gray-800">
                          Trẻ em
                        </option>
                        <option value="Người cao tuổi" className="text-gray-800">
                          Người cao tuổi
                        </option>
                        <option value="Mọi đối tượng" className="text-gray-800">
                          Mọi đối tượng
                        </option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="supplierId" className="block text-sm font-medium mb-1">
                        Nhà cung cấp
                      </label>
                      <select
                        id="supplierId"
                        name="supplierId"
                        value={formData.supplierId}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                      >
                        <option value="">Chọn nhà cung cấp</option>
                        {suppliers.map((supplier) => (
                          <option key={supplier.id} value={supplier.id} className="text-gray-800">
                            {supplier.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium mb-1">
                        Trạng thái
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                      >
                        <option value="active" className="text-gray-800">
                          Đang bán
                        </option>
                        <option value="draft" className="text-gray-800">
                          Nháp
                        </option>
                        <option value="inactive" className="text-gray-800">
                          Ngừng bán
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: activeTab === "variants" ? "block" : "none" }}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Biến thể sản phẩm</h3>
                    <button
                      type="button"
                      onClick={addVariant}
                      className="px-3 py-1.5 border border-gray-300 rounded-md flex items-center text-sm"
                    >
                      <FiPlus className="h-4 w-4 mr-2" />
                      Thêm biến thể
                    </button>
                  </div>

                  <div className="border rounded-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tên biến thể
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            SKU
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Giá (VNĐ)
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Số lượng
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[80px]"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {variants.map((variant) => (
                          <tr key={variant.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
                                value={variant.name}
                                onChange={(e) => updateVariant(variant.id, "name", e.target.value)}
                                placeholder="Tên biến thể"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
                                value={variant.sku}
                                onChange={(e) => updateVariant(variant.id, "sku", e.target.value)}
                                placeholder="SKU"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="number"
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
                                value={variant.price}
                                onChange={(e) => updateVariant(variant.id, "price", e.target.value)}
                                min="0"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="number"
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
                                value={variant.stock}
                                onChange={(e) => updateVariant(variant.id, "stock", e.target.value)}
                                min="0"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => removeVariant(variant.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <FiTrash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div style={{ display: activeTab === "description" ? "block" : "none" }}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Mô tả sản phẩm
                    </label>
                    <div className="border rounded-md">
                      <Editor
                        apiKey="95zzat4zdhk63cbyepm9apkvb89bqply9apvsjwh88a454sw"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        value={formData.description}
                        onEditorChange={(content) => setFormData((prev) => ({ ...prev, description: content }))}
                        init={{
                          height: 400,
                          menubar: true,
                          plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                          ],
                          toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; color: #333333; }",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: activeTab === "medical" ? "block" : "none" }}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="ingredients" className="block text-sm font-medium mb-1">
                      Thành phần
                    </label>
                    <textarea
                      id="ingredients"
                      name="ingredients"
                      value={formData.ingredients}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Nhập thành phần sản phẩm"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label htmlFor="dosage" className="block text-sm font-medium mb-1">
                      Liều dùng
                    </label>
                    <textarea
                      id="dosage"
                      name="dosage"
                      value={formData.dosage}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Nhập liều dùng khuyến nghị"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label htmlFor="warnings" className="block text-sm font-medium mb-1">
                      Cảnh báo
                    </label>
                    <textarea
                      id="warnings"
                      name="warnings"
                      value={formData.warnings}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Nhập cảnh báo và chống chỉ định"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="requiresPrescription"
                      name="requiresPrescription"
                      checked={formData.requiresPrescription}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="requiresPrescription" className="text-sm font-medium text-gray-700">
                      Yêu cầu đơn thuốc
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Trạng thái sản phẩm</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="status-sidebar" className="block text-sm font-medium cursor-pointer">
                    Trạng thái
                  </label>
                  <select
                    id="status-sidebar"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-[180px] px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                  >
                    <option value="active" className="text-gray-800">
                      Đang bán
                    </option>
                    <option value="draft" className="text-gray-800">
                      Nháp
                    </option>
                    <option value="inactive" className="text-gray-800">
                      Ngừng bán
                    </option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <label htmlFor="isFeatured" className="block text-sm font-medium cursor-pointer">
                    Sản phẩm nổi bật
                  </label>
                  <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label htmlFor="isPopular" className="block text-sm font-medium cursor-pointer">
                    Sản phẩm phổ biến
                  </label>
                  <input
                    type="checkbox"
                    id="isPopular"
                    name="isPopular"
                    checked={formData.isPopular}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Hình ảnh sản phẩm</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative border rounded-md overflow-hidden">
                      <img src={image.url || "/placeholder.svg"} alt={image.alt} className="w-full h-32 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeImage(image.id)}
                            className="h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                          >
                            <FiTrash2 className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPrimaryImage(image.id)}
                          className={`w-full mt-auto py-1 bg-gray-200 text-gray-800 text-sm rounded-md ${image.isPrimary ? "cursor-not-allowed" : "cursor-pointer"}`}
                          disabled={image.isPrimary}
                        >
                          {image.isPrimary ? "Ảnh chính" : "Đặt làm ảnh chính"}
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="border border-dashed rounded-md flex items-center justify-center h-32">
                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center p-4">
                      {isUploading ? (
                        <span className="text-sm text-gray-500">Đang tải ảnh...</span>
                      ) : (
                        <>
                          <FiImage className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500 text-center">Tải lên hình ảnh</span>
                        </>
                      )}
                      <input
                        id="image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Tối đa 5 hình ảnh. Định dạng: JPG, PNG hoặc GIF.</p>
                  <p>Ảnh đầu tiên sẽ được sử dụng làm ảnh chính.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Hủy
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 !text-white rounded-md hover:bg-blue-700 !ml-2 cursor-pointer">
            Cập nhật sản phẩm
          </button>
        </div>
      </form>
    </div>
  )
}