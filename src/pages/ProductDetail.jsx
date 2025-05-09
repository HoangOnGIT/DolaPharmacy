import React, { useEffect, useState } from "react";
import ProductImageGallery from "../components/product/ProductImageGallery";
import { notification } from "antd";
import queryString from "query-string";
import { useParams } from "react-router-dom";
import { useFav } from "../contexts/FavouriteContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { Breadcrumb } from "antd";

// Import new components
import InfoCard from "../components/productDetail/InfoCard";
import SuggestionField from "../components/productDetail/SuggestionField";
import ProductDetailsModal from "../components/productDetail/ProductDetailsModal";
import ProductInformation from "../components/productDetail/ProductInformation";
import ProductActions from "../components/productDetail/ProductActions";
import ProductSidebar from "../components/productDetail/ProductSidebar";
import ProductDescription from "../components/productDetail/ProductDescription";

function ProductDetail() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { toggleFavourite } = useFav();
  const { addToCartWithDetail } = useCart();
  const [product, setProduct] = useState({});
  const [suggest, setSuggestion] = useState([]);
  const [samePricing, setSamePricing] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [toggle, setToggle] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [fav, setFav] = useState(false);
  const [activeVariant, setActiveVariant] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageArr = product.images
    ? product.images.map((image) => image.url)
    : [];

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((e) => console.log(e))
      .finally(() => {});
  }, [id]);

  useEffect(() => {
    if (user && isAuthenticated) {
      fetch(`${BASE_URL}/api/favourites?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0].items) {
            const exist = data[0].items.find((item) => {
              console.log("list id: ", item.id);
              console.log("product id: ", id);
              return item.id === id;
            });
            if (exist) {
              setFav(true);
            }
          }
        })
        .catch((e) => console.log(e))
        .finally(() => {});
    }
  }, [id]);

  useEffect(() => {
    if (product.category && product.priceRange) {
      const categoryParam = queryString.stringify({
        category: product.category,
      });

      fetch(`${BASE_URL}/api/products?${categoryParam}`)
        .then((res) => res.json())
        .then((data) => setSuggestion(data));

      const pricingParam = queryString.stringify({
        category: product.category,
        priceRange: product.priceRange,
      });

      fetch(`${BASE_URL}/api/products?${pricingParam}`)
        .then((res) => res.json())
        .then((data) => setSamePricing(data));
    }
  }, [product.category, product.priceRange]);

  const infoCardData = [
    {
      title: "Miễn phí vận chuyển",
      content: "Cho tất cả đơn hàng trong nội thành Hồ Chí Minh",
      iconPath:
        "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
    },
    {
      title: "Thanh toán an toàn",
      content: "Bảo mật thông tin khách hàng",
      iconPath:
        "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    },
    {
      title: "Hỗ trợ 24/7",
      content: "Tư vấn trực tuyến mọi lúc",
      iconPath:
        "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
    },
    {
      title: "Đổi trả dễ dàng",
      content: "30 ngày đổi trả miễn phí",
      iconPath:
        "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    },
  ];

  function increase() {
    setQuantity((prev) => prev + 1);
  }

  function decrease(n) {
    if (n > 1) {
      setQuantity((prev) => prev - 1);
    }
  }

  function handleFav() {
    if (!product || !product.name) {
      alert("Invalid item passed to handleAddToCart:", item);
      return;
    }

    toggleFavourite(product);
    setFav(!fav);
  }

  function handleAddToCart(item) {
    if (!item || !item.name) {
      alert("Không thể thêm vào giỏ hàng!");
      return;
    }

    if (item.status === "inactive") {
      api.warning({
        message: "Sản phẩm không hoạt động",
        duration: 2,
      });
      return;
    }

    console.log(!product.variants.length == 0);

    if (!product.variants.length == 0) {
      if (!activeVariant) {
        api.warning({
          message: "Vui lòng chọn loại sản phẩm",
          duration: 2,
        });
        return;
      }
    }

    const updatedItem = {
      ...item,
      quantity: quantity,
      variant: product.variants.find((vari) => activeVariant === vari.name),
    };

    console.log(updatedItem);
    addToCartWithDetail(updatedItem);

    api.success({
      message: "Thêm giỏ hàng thành công",
      description: `${item.name} được thêm vào giỏ hàng thành công!`,
      duration: 2,
    });
  }

  function handleClickVari(vari) {
    setActiveVariant(vari.name);
  }

  function renderProductStatus(status) {
    if (!status) return <span className="text-gray-500">Đang cập nhật</span>;

    switch (status.toLowerCase()) {
      case "in_stock":
        return <span className="text-green-600 font-medium">Còn hàng</span>;
      case "out_of_stock":
        return <span className="text-red-600 font-medium">Hết hàng</span>;
      case "active":
        return <span className="text-green-600 font-medium">Còn hàng</span>;
      case "low_stock":
        return (
          <span className="text-orange-500 font-medium">Sắp hết hàng</span>
        );
      case "discontinued":
        return (
          <span className="text-gray-600 font-medium">Ngừng kinh doanh</span>
        );
      case "pre_order":
        return <span className="text-blue-600 font-medium">Đặt trước</span>;
      default:
        return <span className="text-blue-700">{status}</span>;
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="w-[80%] mx-auto">
        <Breadcrumb className="mb-6">
          <Breadcrumb.Item>
            <a href="/" className="text-blue-700 hover:text-blue-900">
              Trang chủ
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/product" className="text-blue-700 hover:text-blue-900">
              Sản phẩm
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        <div className="bg-white shadow-md rounded-lg p-8 mb-10">
          <div className="w-full grid grid-cols-1 md:grid-cols-9 gap-8">
            {contextHolder}

            {/* Product Image Gallery */}
            <div className="col-span-1 md:col-span-3 img-slide">
              <div className="product-page sticky top-5">
                <ProductImageGallery imgArr={imageArr} />
              </div>
            </div>

            {/* Product Information and Actions */}
            <div className="col-span-1 md:col-span-4 space-y-6">
              <ProductInformation
                product={product}
                quantity={quantity}
                decrease={decrease}
                increase={increase}
                activeVariant={activeVariant}
                handleClickVari={handleClickVari}
                renderProductStatus={renderProductStatus}
              >
                <ProductActions
                  handleAddToCart={handleAddToCart}
                  product={product}
                  fav={fav}
                  handleFav={handleFav}
                  showModal={showModal}
                />
              </ProductInformation>
            </div>

            {/* Sidebar */}
            <ProductSidebar infoCardData={infoCardData} />
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white shadow-md rounded-lg p-8 mb-10 grid grid-cols-1 md:grid-cols-9 gap-8">
          <ProductDescription
            toggle={toggle}
            setToggle={setToggle}
            product={product}
            showMore={showMore}
            setShowMore={setShowMore}
          />

          <div className="col-span-1 md:col-span-2 space-y-8">
            <SuggestionField title={"Có thể bạn đang tìm"} list={suggest} />
            <SuggestionField title={"Cùng phân khúc giá"} list={samePricing} />
          </div>
        </div>

        {/* Product Details Modal */}
        <ProductDetailsModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          product={product}
        />
      </div>
    </div>
  );
}

export default ProductDetail;
