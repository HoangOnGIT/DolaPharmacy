import React from "react";

function ProductDescription({
  toggle,
  setToggle,
  product,
  showMore,
  setShowMore,
}) {
  return (
    <div className="col-span-1 md:col-span-7 mb-10">
      <div className="mb-6">
        <button
          className={`py-2 px-4 font-medium rounded-lg !mr-3 transition-colors ${
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
          className={`border-2 border-blue-200 rounded-lg p-6 pb-10 prose prose-blue max-w-none relative overflow-hidden transition-all duration-500 ${
            showMore ? "max-h-[500px]" : "max-h-[800px]"
          }`}
        >
          <div
            className="h-fit"
            dangerouslySetInnerHTML={{
              __html:
                product.description + product.description + product.description,
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
              {!showMore ? "Ẩn bớt" : "Hiện thêm"}
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
                Click và sản phẩm muốn mua, màn hình hiển thị ra pop up với các
                lựa chọn sau:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>
                  Nếu bạn muốn tiếp tục mua hàng: Bấm vào phần tiếp tục mua hàng
                  để lựa chọn thêm sản phẩm vào giỏ hàng
                </li>
                <li>
                  Nếu bạn muốn xem giỏ hàng để cập nhật sản phẩm: Bấm vào xem
                  giỏ hàng
                </li>
                <li>
                  Nếu bạn muốn đặt hàng và thanh toán cho sản phẩm này vui lòng
                  bấm vào: Đặt hàng và thanh toán
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-blue-700 mb-2">
                Bước 3: Lựa chọn thông tin tài khoản thanh toán
              </h3>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>
                  Nếu bạn đã có tài khoản vui lòng nhập thông tin tên đăng nhập
                  là email và mật khẩu vào mục đã có tài khoản trên hệ thống
                </li>
                <li>
                  Nếu bạn chưa có tài khoản và muốn đăng ký tài khoản vui lòng
                  điền các thông tin cá nhân để tiếp tục đăng ký tài khoản. Khi
                  có tài khoản bạn sẽ dễ dàng theo dõi được đơn hàng của mình
                </li>
                <li>
                  Nếu bạn muốn mua hàng mà không cần tài khoản vui lòng nhấp
                  chuột vào mục đặt hàng không cần tài khoản
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-blue-700 mb-2">
                Bước 4: Điền thông tin nhận hàng
              </h3>
              <p>
                Điền các thông tin của bạn để nhận đơn hàng, lựa chọn hình thức
                thanh toán và vận chuyển cho đơn hàng của mình
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-blue-700 mb-2">
                Bước 5: Xác nhận đặt hàng
              </h3>
              <p>
                Xem lại thông tin đặt hàng, điền chú thích và gửi đơn hàng. Sau
                khi nhận được đơn hàng bạn gửi chúng tôi sẽ liên hệ bằng cách
                gọi điện lại để xác nhận lại đơn hàng và địa chỉ của bạn.
              </p>
              <p className="font-medium mt-3">Trân trọng cảm ơn.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDescription;
