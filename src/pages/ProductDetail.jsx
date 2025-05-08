import React, { useEffect, useState } from "react";
import ProductImageGallery from "../components/product/ProductImageGallery";
import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import VariantCard from "../components/product/VariantCard";
import queryString from "query-string";
import ProductSuggetionCard from "../components/product/ProductSuggetionCard";
import { useParams } from "react-router-dom";
import { useFav } from "../contexts/FavouriteContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { Breadcrumb, notification } from "antd";

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
  const imageArr = product.images
    ? product.images.map((image) => image.url)
    : [];

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/api/products?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data[0]);
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

    const updatedItem = { ...item, quantity: quantity, variant: activeVariant };

    console.log(updatedItem);
    addToCartWithDetail(updatedItem);

    api.success({
      message: "Thêm giỏ hàng thành công",
      description: `${item.name} được thêm vào giỏ hàng thành công!`,
      duration: 2,
    });
  }

  function handleClickVari(vari) {
    setActiveVariant(vari);
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

            {/* Product Information */}
            <div className="col-span-1 md:col-span-4 space-y-6">
              <h1 className="text-3xl font-bold text-gray-800">
                {product.name}
              </h1>

              <div className="flex flex-wrap gap-y-2 text-sm">
                <div className="flex items-center w-full sm:w-1/2">
                  <span className="font-semibold text-gray-700 w-32">
                    Thương hiệu:
                  </span>
                  <span className="text-blue-700">{product.brand}</span>
                </div>
                <div className="flex items-center w-full sm:w-1/2">
                  <span className="font-semibold text-gray-700 w-32">
                    Loại:
                  </span>
                  <span className="text-blue-700">{product.brand}</span>
                </div>
                <div className="flex items-center w-full sm:w-1/2">
                  <span className="font-semibold text-gray-700 w-32">
                    Tình trạng:
                  </span>
                  {renderProductStatus(product.status)}
                </div>
                <div className="flex items-center w-full sm:w-1/2">
                  <span className="font-semibold text-gray-700 w-32">
                    Mã sản phẩm:
                  </span>
                  <span className="text-blue-700">{product.sku}</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow p-5">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-blue-800 text-4xl font-bold">
                    {product.salePrice
                      ? new Intl.NumberFormat("vi-VN").format(
                          parseFloat(product.salePrice).toFixed(0)
                        )
                      : new Intl.NumberFormat("vi-VN").format(
                          parseFloat(product.basePrice).toFixed(0)
                        )}
                    <span className="text-sm font-medium ml-1">₫</span>
                  </span>
                  {product.discount && (
                    <>
                      <span className="line-through text-gray-500 text-lg">
                        {new Intl.NumberFormat("vi-VN").format(
                          parseFloat(product.basePrice).toFixed(0)
                        )}
                        <span className="text-xs">₫</span>
                      </span>
                      <span className="bg-red-600 !text-white text-xs px-3 py-1 rounded-full font-bold">
                        -
                        {Math.round(
                          ((product.basePrice - product.salePrice) /
                            product.basePrice) *
                            100
                        )}
                        %
                      </span>
                    </>
                  )}
                </div>
                {product.discount && (
                  <div className="mt-3 flex items-center text-sm">
                    <span className="text-gray-700 font-medium">
                      Tiết kiệm:{" "}
                    </span>
                    <span className="text-red-600 font-semibold ml-2">
                      {new Intl.NumberFormat("vi-VN").format(
                        parseFloat(
                          product.basePrice - product.salePrice
                        ).toFixed(0)
                      )}
                      <span className="text-xs">₫</span>
                    </span>
                  </div>
                )}
              </div>

              {product.variants && (
                <div className="space-y-3">
                  <div className="font-medium text-gray-800">
                    Loại sản phẩm:
                  </div>
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                    {product.variants.map((vari) => {
                      let active = activeVariant === vari.name;
                      return (
                        <VariantCard
                          variant={vari}
                          key={vari.id}
                          handleClickVari={handleClickVari}
                          active={active}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <div className="font-medium text-gray-800 mb-3">Số lượng:</div>
                <div className="inline-flex items-center border-2 border-blue-600 rounded-lg shadow-sm overflow-hidden">
                  <button
                    className="px-4 py-2 bg-blue-600 !text-white hover:bg-green-500  transition-colors font-bold text-lg"
                    onClick={() => decrease(quantity)}
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-medium text-gray-800 bg-white">
                    {quantity}
                  </span>
                  <button
                    className="px-4 py-2 bg-blue-600 !text-white hover:bg-green-500 transition-colors font-bold text-lg"
                    onClick={() => increase()}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex mt-6 gap-3">
                <button
                  className="flex-1 flex items-center justify-center gap-3 bg-blue-600 hover:bg-green-500 !text-white font-bold text-base py-4 px-6 rounded-lg shadow-md transition-colors h-14"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCartOutlined style={{ fontSize: "24px" }} />
                  <div className="text-left">
                    <span className="block">Thêm vào giỏ</span>
                    <span className="text-xs opacity-90">
                      Miễn phí giao hàng
                    </span>
                  </div>
                </button>
                <button
                  className={`w-14 flex items-center justify-center rounded-lg shadow-md transition-colors py-4 px-6 h-14 ring-2 ring-blue-500 ${
                    fav ? " hover:text-green-500" : " hover:text-green-500"
                  }`}
                  onClick={() => handleFav()}
                >
                  {fav ? (
                    <HeartFilled
                      className="text-2xl"
                      style={{ color: "red" }}
                    />
                  ) : (
                    <HeartOutlined
                      className="text-2xl"
                      style={{ color: "blue" }}
                    />
                  )}
                </button>
              </div>

              <div className="space-y-5">
                <div className="rounded-lg overflow-hidden border-2 border-blue-600">
                  <div className="bg-blue-600 px-4 py-2 !text-white font-bold flex items-center gap-2">
                    <span className="text-xl">🎁</span> Khuyến mãi đặc biệt!!!
                  </div>
                  <div className="p-4 space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-green-600 font-bold">✔</span>
                      <span>
                        Áp dụng Phiếu quà tặng/ Mã giảm giá theo ngành hàng
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-600 font-bold">✔</span>
                      <span>Giảm giá 10% khi mua từ 5 sản phẩm trở lên</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-amber-500 font-bold">🎁</span>
                      <span>
                        Tặng 100.000₫ mua hàng tại website thành viên Dola
                        Watch, áp dụng khi mua Online tại Hồ Chí Minh và 1 số
                        khu vực khác.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden border-2 border-blue-600">
                  <div className="bg-blue-600 px-4 py-2 !text-white font-bold flex items-center gap-2">
                    <span className="text-xl">🔒</span> Cam kết dịch vụ
                  </div>
                  <div className="p-4 space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-700"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">
                        Cam kết 100% sản phẩm chính hãng
                      </span>
                    </div>

                    {/* Other service items */}
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-700"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2V8a1 1 0 00-.3-.7l-4-4A1 1 0 008 3H4a1 1 0 00-1 1z" />
                          <path d="M11 10.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-1z" />
                        </svg>
                      </div>
                      <span>Giao hàng toàn quốc trong 24h</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-700"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 10.586V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>Đổi trả trong vòng 30 ngày nếu sản phẩm lỗi</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-700"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span>Tư vấn dược sĩ chuyên nghiệp 24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-span-1 md:col-span-2 space-y-5">
              <div className="bg-white rounded-lg shadow-md border-2 border-blue-100 p-4 text-center">
                <h3 className="font-bold text-blue-800 text-sm mb-3">
                  CHÚNG TÔI LUÔN SẴN SÀNG ĐỂ GIÚP ĐỠ BẠN
                </h3>
                <img
                  src="https://res.cloudinary.com/ds2dbvq5h/image/upload/v1744085626/pngtree-remote-work-in-action-man-on-video-conference-call-png-image_15059907_vbj8zw.png"
                  className="w-3/4 mx-auto my-3"
                  alt="Support"
                />
                <p className="text-sm font-medium mb-2">
                  Để được hỗ trợ tốt nhất. Hãy gọi:
                </p>
                <p className="text-blue-700 text-2xl font-bold mb-3">
                  1900 6750
                </p>
                <div className="w-full h-px bg-gray-300 my-3"></div>
                <p className="text-sm mb-2">Hoặc:</p>
                <p className="text-sm mb-4">Chat hỗ trợ trực tuyến</p>
                <button className="w-full py-2 px-4 bg-blue-600 hover:bg-green-500  !text-white text-sm font-medium rounded-md shadow transition-colors">
                  Chat với chúng tôi
                </button>
              </div>

              {infoCardData.map((item, index) => (
                <InfoCard
                  key={index}
                  title={item.title}
                  content={item.content}
                  iconPath={item.iconPath}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white shadow-md rounded-lg p-8 mb-10 grid grid-cols-1 md:grid-cols-9 gap-8">
          <div className="col-span-1 md:col-span-7">
            <div className="mb-6">
              <button
                className={`py-2 px-4 font-medium rounded-lg mr-3 transition-colors ${
                  toggle
                    ? "bg-blue-600 !text-white"
                    : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setToggle(true)}
              >
                Mô tả sản phẩm
              </button>
              <button
                className={`py-2 px-4 font-medium rounded-lg transition-colors ${
                  !toggle
                    ? "bg-blue-600 !text-white"
                    : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setToggle(false)}
              >
                Hướng dẫn mua hàng
              </button>
            </div>

            {/* Spacer div */}
            <div className="h-4"></div>

            {toggle ? (
              <div
                className={`border-2 border-blue-200 rounded-lg p-6 prose prose-blue max-w-none relative overflow-hidden transition-all duration-500 ${
                  showMore ? "max-h-[500px]" : "max-h-[800px]"
                }`}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      product.description +
                      product.description +
                      product.description,
                  }}
                />
                {!showMore && (
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
                )}
                <div className="absolute bottom-3 left-0 flex items-center w-full justify-center">
                  <button
                    className="py-2 px-4 bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 rounded-lg shadow-md font-medium transition-colors"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {!showMore ? "Hiện thêm" : "Ẩn bớt"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-blue-200 rounded-lg p-6 space-y-4 text-gray-700">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-blue-700 mb-2">
                      Bước 1: Truy cập website và lựa chọn sản phẩm
                    </h3>
                    <p>Truy cập website và lựa chọn sản phẩm cần mua</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-blue-700 mb-2">
                      Bước 2: Thêm vào giỏ hàng
                    </h3>
                    <p>
                      Click và sản phẩm muốn mua, màn hình hiển thị ra pop up
                      với các lựa chọn sau:
                    </p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>
                        Nếu bạn muốn tiếp tục mua hàng: Bấm vào phần tiếp tục
                        mua hàng để lựa chọn thêm sản phẩm vào giỏ hàng
                      </li>
                      <li>
                        Nếu bạn muốn xem giỏ hàng để cập nhật sản phẩm: Bấm vào
                        xem giỏ hàng
                      </li>
                      <li>
                        Nếu bạn muốn đặt hàng và thanh toán cho sản phẩm này vui
                        lòng bấm vào: Đặt hàng và thanh toán
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-blue-700 mb-2">
                      Bước 3: Lựa chọn thông tin tài khoản thanh toán
                    </h3>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>
                        Nếu bạn đã có tài khoản vui lòng nhập thông tin tên đăng
                        nhập là email và mật khẩu vào mục đã có tài khoản trên
                        hệ thống
                      </li>
                      <li>
                        Nếu bạn chưa có tài khoản và muốn đăng ký tài khoản vui
                        lòng điền các thông tin cá nhân để tiếp tục đăng ký tài
                        khoản. Khi có tài khoản bạn sẽ dễ dàng theo dõi được đơn
                        hàng của mình
                      </li>
                      <li>
                        Nếu bạn muốn mua hàng mà không cần tài khoản vui lòng
                        nhấp chuột vào mục đặt hàng không cần tài khoản
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-blue-700 mb-2">
                      Bước 4: Điền thông tin nhận hàng
                    </h3>
                    <p>
                      Điền các thông tin của bạn để nhận đơn hàng, lựa chọn hình
                      thức thanh toán và vận chuyển cho đơn hàng của mình
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-blue-700 mb-2">
                      Bước 5: Xác nhận đặt hàng
                    </h3>
                    <p>
                      Xem lại thông tin đặt hàng, điền chú thích và gửi đơn
                      hàng. Sau khi nhận được đơn hàng bạn gửi chúng tôi sẽ liên
                      hệ bằng cách gọi điện lại để xác nhận lại đơn hàng và địa
                      chỉ của bạn.
                    </p>
                    <p className="font-medium mt-3">Trân trọng cảm ơn.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-span-1 md:col-span-2 space-y-8">
            <SuggestionField title={"Có thể bạn đang tìm"} list={suggest} />
            <SuggestionField title={"Cùng phân khúc giá"} list={samePricing} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, content, iconPath }) {
  return (
    <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md border-2 border-blue-100">
      <div className="bg-blue-100 p-3 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={iconPath}
          />
        </svg>
      </div>
      <div>
        <h3 className="text-blue-700 font-semibold text-sm">{title}</h3>
        <p className="text-xs text-gray-600">{content}</p>
      </div>
    </div>
  );
}

function SuggestionField({ title, list }) {
  return (
    <div className="ring-2 ring-blue-500 rounded-[5px] same-finding">
      <div className="bg-blue-600 text-white p-3 rounded-t-[5px]">{title}</div>
      <div className="product-suggestion space-y-5">
        {list &&
          list.map((item, index) => {
            if (index < 5)
              return <ProductSuggetionCard key={item.id} product={item} />;
          })}
      </div>
    </div>
  );
}

export default ProductDetail;
