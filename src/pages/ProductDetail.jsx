import React, { useEffect, useState } from "react";
import ProductImageGallery from "../components/ProductImageGallery";
import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import VariantCard from "../components/VariantCard";
import queryString from "query-string";
import ProductSuggetionCard from "../components/ProductSuggetionCard";

function ProductDetail({ product }) {
  const imageArr = product.images
    ? product.images.map((image) => image.url)
    : [];

  const [quantity, setQuantity] = useState(1);
  const [fav, setFav] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [suggest, setSuggestion] = useState([]);
  const [samePricing, setSamePricing] = useState([]);
  useEffect(() => {
    let param = queryString.stringify({ category: product.category });

    fetch(`http://localhost:3000/api/products?${param}`)
      .then((res) => res.json())
      .then((data) => setSuggestion(data));

    param = { ...param, priceRange: product.priceRange };

    fetch(`http://localhost:3000/api/products?${param}`)
      .then((res) => res.json())
      .then((data) => setSamePricing(data));
  }, [product.category, product.priceRange]);

  function increase() {
    setQuantity((prev) => prev + 1);
  }

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

  function decrease(n) {
    if (n > 1) {
      setQuantity((prev) => prev - 1);
    }
  }

  function handleFav() {
    setFav(!fav);
  }

  function handleAddToCart() {
    //add logic add to cart}
  }

  return (
    <div
      style={{ width: "100%" }}
      className="flex items-center justify-center mt-10 flex-wrap"
    >
      <div className="w-[70%] min-h-screen h-fit grid grid-cols-9 gap-10">
        <div className="col-span-3 img-slide">
          <div className="product-page">
            <ProductImageGallery imgArr={imageArr} />
          </div>
        </div>
        <div className="col-span-4 text-[13px] space-y-3">
          <h1 className="text-2xl">{product.name}</h1>
          <div className="text-blue-800">
            <div className="row flex ">
              <span className=" w-[200px]">
                <b className="text-black">Thương hiệu: </b> {product.brand}
              </span>
              <span className="">
                <b className="text-black">Loại: </b> {product.brand}
              </span>
            </div>
            <div className="row flex ">
              <span className=" w-[200px]">
                <b className="text-black">Tình trạng: </b> {product.status}
              </span>
              <span className="">
                <b className="text-black">Mã sản phẩm: </b> {product.sku}
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 w-full rounded-lg shadow-sm py-3 px-4">
            <div className="flex items-center gap-3">
              <span className="text-blue-800 text-3xl font-bold">
                {product.salePrice
                  ? new Intl.NumberFormat("vi-VN").format(
                      parseFloat(product.salePrice).toFixed(0)
                    )
                  : new Intl.NumberFormat("vi-VN").format(
                      parseFloat(product.basePrice).toFixed(0)
                    )}
                <span className="text-sm font-medium ml-1">₫</span>
              </span>
              {product.salePrice && (
                <span className="line-through text-gray-500 text-lg">
                  {new Intl.NumberFormat("vi-VN").format(
                    parseFloat(product.basePrice).toFixed(0)
                  )}
                  <span className="text-xs">₫</span>
                </span>
              )}
              {product.salePrice && (
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full ml-2">
                  -
                  {Math.round(
                    ((product.basePrice - product.salePrice) /
                      product.basePrice) *
                      100
                  )}
                  %
                </span>
              )}
            </div>
            {product.salePrice && (
              <div className="mt-2 flex items-center">
                <span className="text-sm text-gray-700 font-medium">
                  Tiết kiệm:{" "}
                </span>
                <span className="text-red-600 font-semibold ml-1">
                  {new Intl.NumberFormat("vi-VN").format(
                    parseFloat(product.basePrice - product.salePrice).toFixed(0)
                  )}
                  <span className="text-xs">₫</span>
                </span>
              </div>
            )}
          </div>
          {product.variants && (
            <div className="space-y-2">
              <div className="font-medium">Loại sản phẩm:</div>
              <div className="grid gap-3 grid-cols-3">
                {product.variants.map((vari) => (
                  <VariantCard variant={vari} key={vari.id} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <div className="font-medium mb-2">Số lượng:</div>
            <div className="inline-flex items-center border border-blue-700 rounded-md">
              <button
                className="px-3 py-1 bg-blue-700 text-white hover:bg-blue-800 rounded-l-md"
                onClick={() => decrease(quantity)}
              >
                -
              </button>
              <span className="px-4 py-1 font-medium">{quantity}</span>
              <button
                className="px-3 py-1 bg-blue-700 text-white hover:bg-blue-800 rounded-r-md"
                onClick={() => increase()}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              className="flex items-center bg-blue-700 hover:bg-blue-800 text-white rounded-md px-4 py-2 w-4/5 transition-colors"
              onClick={() => handleAddToCart(product)}
            >
              <ShoppingCartOutlined className="mr-2 text-lg" />
              <div className="flex flex-col items-start">
                <span className="font-medium">Thêm vào giỏ</span>
                <span className="text-xs opacity-90">Miễn phí giao hàng</span>
              </div>
            </button>
            <button
              className="flex items-center justify-center bg-white border-2 border-blue-700 text-blue-700 rounded-md w-12 h-12 hover:bg-blue-50"
              onClick={() => handleFav()}
            >
              {fav ? (
                <HeartFilled className="text-xl text-blue-700" />
              ) : (
                <HeartOutlined className="text-xl text-blue-700" />
              )}
            </button>
          </div>

          <div className="discount flex flex-col justify-center">
            <div className="bg-blue-700 w-fit px-4 py-2 ring-t-2 rounded-t-[5px] ring-blue-800 text-white">
              🎁 Khuyến mãi đặc biệt!!!
            </div>
            <div className="ring-2 ring-blue-800 rounded-[5px] text-[13px] p-3 h-fit">
              <span>✔ Áp dụng Phiếu quà tặng/ Mã giảm giá theo ngành hàng</span>
              <br></br>
              <span>✔ Giảm giá 10% khi mua từ 5 sản phẩm trở lên</span>
              <br></br>
              <span>
                🎁 Tặng 100.000₫ mua hàng tại website thành viên Dola Watch, áp
                dụng khi mua Online tại Hồ Chí Minh và 1 số khu vực khác.
              </span>
            </div>
          </div>
          <div className="garantee">
            <div className="bg-blue-700 w-fit px-4 py-2 ring-t-2 rounded-t-[5px] ring-blue-800 text-white">
              🔒 Cam kết dịch vụ
            </div>
            <div className="ring-2 ring-blue-800 rounded-[5px] text-[13px] p-3 h-fit space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-1 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-800"
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

              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-1 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-800"
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

              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-1 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-800"
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

              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-1 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-800"
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

              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-1 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-800"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <span>Theo dõi đơn hàng trực tuyến dễ dàng</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 sidebar space-y-4">
          <div className="ring-1 ring-gray-500 rounded-[3px] text-[10px] flex flex-col p-2 items-center">
            <span className="font-semibold text-center">
              CHÚNG TÔI LUÔN SẴN SÀNG ĐỂ GIÚP ĐỠ BẠN
            </span>
            <img src="https://res.cloudinary.com/ds2dbvq5h/image/upload/v1744085626/pngtree-remote-work-in-action-man-on-video-conference-call-png-image_15059907_vbj8zw.png"></img>
            <span className="font-semibold text-center">
              Để được hỗ trợ tốt nhất. Hãy gọi:
              <br></br>
              <span className="text-blue-800 text-2xl">1900 6750</span>
              <legend style={{ float: "center" }}>Hoặc:</legend>
              <span>Chat hỗ trợ trực tuyến</span>
              <br></br>
              <button className="p-2 bg-blue-600 text-white w-full rounded-[5px]">
                Chat với chúng tôi
              </button>
            </span>
          </div>
          {infoCardData.map((item, index) => (
            <InfoCard key={index} title={item.title} content={item.content}>
              <div className="p-2 flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.iconPath}
                  />
                </svg>
              </div>
            </InfoCard>
          ))}
        </div>

        <div className="col-span-7">
          <button
            className={`py-1 px-2 ring-2 ring-blue-800 text-blue-700 hover:bg-blue-700 hover:text-white rounded-[5px] mr-2 mb-2 ${
              toggle ? "bg-blue-700 text-white" : ""
            }`}
            onClick={() => setToggle(!toggle)}
          >
            Mô tả sản phẩm
          </button>
          <button
            className={`py-1 px-2 ring-2 ring-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white rounded-[5px] mr-2 mb-2 ${
              !toggle ? "bg-blue-800 text-white" : ""
            }`}
            onClick={() => setToggle(!toggle)}
          >
            Hướng dẫn mua hàng
          </button>
          {toggle ? (
            <div
              className={`ring-2 ring-blue-800 rounded-[5px] p-3 mb-3 description relative pb-20 overflow-hidden transition-all duration-500 ${
                showMore ? " h-[500px]" : "h-fit"
              }`}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    product.description +
                    product.description +
                    product.description +
                    product.description,
                }}
              />
              <div className="absolute bottom-3 left-0 flex items-center w-full justify-center bg-white">
                <button
                  className="py-1 px-2 ring-2 ring-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white rounded-[5px] mr-2 mb-2 "
                  onClick={() => setShowMore(!showMore)}
                >
                  {!showMore ? "Ẩn bớt" : "Hiện thêm"}
                </button>
              </div>
            </div>
          ) : (
            <div className="ring-2 ring-blue-800 rounded-[5px] p-3 mb-3 description">
              <b>Bước 1: </b>
              Truy cập website và lựa chọn sản phẩm cần mua <br></br>
              <b>Bước 2: </b> Click và sản phẩm muốn mua, màn hình hiển thị ra
              pop up với các lựa chọn sau Nếu bạn muốn tiếp tục mua hàng: Bấm
              vào phần tiếp tục mua hàng để lựa chọn thêm sản phẩm vào giỏ hàng
              Nếu bạn muốn xem giỏ hàng để cập nhật sản phẩm: Bấm vào xem giỏ
              hàng Nếu bạn muốn đặt hàng và thanh toán cho sản phẩm này vui lòng
              bấm vào: Đặt hàng và thanh toán<br></br> <b>Bước 3: </b> Lựa chọn
              thông tin tài khoản thanh toán Nếu bạn đã có tài khoản vui lòng
              nhập thông tin tên đăng nhập là email và mật khẩu vào mục đã có
              tài khoản trên hệ thống Nếu bạn chưa có tài khoản và muốn đăng ký
              tài khoản vui lòng điền các thông tin cá nhân để tiếp tục đăng ký
              tài khoản. Khi có tài khoản bạn sẽ dễ dàng theo dõi được đơn hàng
              của mình Nếu bạn muốn mua hàng mà không cần tài khoản vui lòng
              nhấp chuột vào mục đặt hàng không cần tài khoản <br></br>{" "}
              <b>Bước 4: </b>
              Điền các thông tin của bạn để nhận đơn hàng, lựa chọn hình thức
              thanh toán và vận chuyển cho đơn hàng của mình <br></br>{" "}
              <b>Bước 5: </b>
              Xem lại thông tin đặt hàng, điền chú thích và gửi đơn hàng Sau khi
              nhận được đơn hàng bạn gửi chúng tôi sẽ liên hệ bằng cách gọi điện
              lại để xác nhận lại đơn hàng và địa chỉ của bạn. Trân trọng cảm
              ơn.
            </div>
          )}
        </div>
        <div className="col-span-2 space-y-8">
          <SuggestionField title={"Có thể bạn đang tìm"} list={suggest} />
          <SuggestionField title={"Cùng phân khúc giá"} list={samePricing} />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, content, children }) {
  return (
    <div className="ring-1 ring-gray-500 rounded-[3px] text-[10px] flex p-2 items-center">
      <div>{children}</div>
      <div>
        <span className="text-blue-600 font-medium">{title}</span>
        <br></br>
        <span>{content}</span>
      </div>
    </div>
  );
}

function SuggestionField({ title, list }) {
  return (
    <div className="ring-2 ring-blue-700 rounded-[5px] same-finding">
      <div className="bg-blue-700 text-white px-2 py-1 rounded-t-[5px]">
        {title}
      </div>
      <div className="product-suggestion">
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
