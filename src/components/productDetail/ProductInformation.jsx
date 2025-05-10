import React from "react";
import VariantCard from "../product/VariantCard";
import ProductActions from "./ProductActions";

function ProductInformation({
  product,
  quantity,
  decrease,
  increase,
  activeVariant,
  handleClickVari,
  renderProductStatus,
  children,
}) {
  return (
    <div className="col-span-1 md:col-span-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

      <div className="flex flex-wrap gap-y-2 text-sm">
        <div className="flex items-center w-full sm:w-1/2">
          <span className="font-semibold text-gray-700 w-32">Thương hiệu:</span>
          <span className="text-blue-700">{product.brand}</span>
        </div>
        <div className="flex items-center w-full sm:w-1/2">
          <span className="font-semibold text-gray-700 w-32">Loại:</span>
          <span className="text-blue-700">{product.brand}</span>
        </div>
        <div className="flex items-center w-full sm:w-1/2">
          <span className="font-semibold text-gray-700 w-32">Tình trạng:</span>
          {renderProductStatus(product.status)}
        </div>
        <div className="flex items-center w-full sm:w-1/2">
          <span className="font-semibold text-gray-700 w-32">Mã sản phẩm:</span>
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
            <span className="text-gray-700 font-medium">Tiết kiệm: </span>
            <span className="text-red-600 font-semibold ml-2">
              {new Intl.NumberFormat("vi-VN").format(
                parseFloat(product.basePrice - product.salePrice).toFixed(0)
              )}
              <span className="text-xs">₫</span>
            </span>
          </div>
        )}
      </div>

      {product.variants && product.variants.length > 0 ? (
        <div className="space-y-3">
          <div className="font-medium text-gray-800">Loại sản phẩm:</div>
          <div className="flex space-x-3">
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
      ) : (
        <span className="text-lg font-semibold">
          Sản phẩm không có phân loại
        </span>
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

      {children}

      <div className="space-y-5">
        <div className="rounded-lg overflow-hidden border-2 border-blue-600">
          <div className="bg-blue-600 px-4 py-2 !text-white font-bold flex items-center gap-2">
            <span className="text-xl">🎁</span> Khuyến mãi đặc biệt!!!
          </div>
          <div className="p-4 space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-green-600 font-bold">✔</span>
              <span>Áp dụng Phiếu quà tặng/ Mã giảm giá theo ngành hàng</span>
            </div>
            <div className="flex gap-2">
              <span className="text-green-600 font-bold">✔</span>
              <span>Giảm giá 10% khi mua từ 5 sản phẩm trở lên</span>
            </div>
            <div className="flex gap-2">
              <span className="text-amber-500 font-bold">🎁</span>
              <span>
                Tặng 100.000₫ mua hàng tại website thành viên Dola Watch, áp
                dụng khi mua Online tại Hồ Chí Minh và 1 số khu vực khác.
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
  );
}

export default ProductInformation;
