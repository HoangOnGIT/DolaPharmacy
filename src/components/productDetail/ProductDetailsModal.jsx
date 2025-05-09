import React from "react";
import { Modal, Descriptions, Tag, Table } from "antd";

function ProductDetailsModal({ isModalOpen, handleOk, handleCancel, product }) {
  return (
    <Modal
      title={
        <span className="text-xl font-bold text-blue-700">
          Thông tin chi tiết sản phẩm
        </span>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      footer={[
        <button
          key="close"
          className="px-4 py-2 bg-blue-600 !text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={handleCancel}
        >
          Đóng
        </button>,
      ]}
    >
      <div className="max-h-[70vh] overflow-y-auto pr-2">
        <Descriptions
          bordered
          column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          layout="vertical"
          className="mb-6"
        >
          <Descriptions.Item label="Tên sản phẩm" span={2}>
            <span className="font-semibold">{product.name}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Mã sản phẩm">
            {product.sku}
          </Descriptions.Item>
          <Descriptions.Item label="Thương hiệu">
            {product.brand}
          </Descriptions.Item>
          <Descriptions.Item label="Xuất xứ">
            {product.origin}
          </Descriptions.Item>
          <Descriptions.Item label="Nhà sản xuất">
            {product.manufacturerName}
          </Descriptions.Item>
          <Descriptions.Item label="Phân khúc giá">
            {product.priceRange}
          </Descriptions.Item>
          <Descriptions.Item label="Trọng lượng">
            {product.weight}
          </Descriptions.Item>
          <Descriptions.Item label="Đối tượng sử dụng">
            {product.targeted}
          </Descriptions.Item>
          <Descriptions.Item label="Tình trạng">
            <Tag
              color={
                product.status === "active"
                  ? "green"
                  : product.status === "inactive"
                  ? "red"
                  : "blue"
              }
            >
              {product.status === "active"
                ? "Còn hàng"
                : product.status === "inactive"
                ? "Ngừng kinh doanh"
                : product.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Cần toa thuốc">
            <Tag color={product.requiresPrescription ? "red" : "green"}>
              {product.requiresPrescription ? "Có" : "Không"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Thành phần" span={2}>
            {product.ingredients || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Liều dùng" span={2}>
            {product.dosage || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Cảnh báo" span={2}>
            {product.warnings || "Không có thông tin"}
          </Descriptions.Item>
        </Descriptions>

        {product.variants && product.variants.length > 0 && (
          <>
            <h3 className="font-bold text-blue-700 mb-3">
              Các phiên bản sản phẩm
            </h3>
            <Table
              dataSource={product.variants}
              rowKey="id"
              pagination={false}
              bordered
              size="small"
              className="mb-6"
            >
              <Table.Column title="Tên" dataIndex="name" key="name" />
              <Table.Column title="Mã SKU" dataIndex="sku" key="sku" />
              <Table.Column
                title="Giá"
                dataIndex="price"
                key="price"
                render={(text) =>
                  text
                    ? `${new Intl.NumberFormat("vi-VN").format(text)} ₫`
                    : "Giá mặc định"
                }
              />
              <Table.Column
                title="Tồn kho"
                dataIndex="stock"
                key="stock"
                render={(text) => (
                  <Tag
                    color={text > 10 ? "green" : text > 0 ? "orange" : "red"}
                  >
                    {text}
                  </Tag>
                )}
              />
            </Table>
          </>
        )}

        {product.stock && (
          <>
            <h3 className="font-bold text-blue-700 mb-3">Thông tin kho hàng</h3>
            <Descriptions bordered column={2} className="mb-6">
              <Descriptions.Item label="Tổng số lượng">
                {product.stock.total}
              </Descriptions.Item>
              <Descriptions.Item label="Còn lại">
                <Tag
                  color={
                    product.stock.available > product.stock.lowStockThreshold
                      ? "green"
                      : product.stock.available > 0
                      ? "orange"
                      : "red"
                  }
                >
                  {product.stock.available}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Đã đặt">
                {product.stock.reserved}
              </Descriptions.Item>
              <Descriptions.Item label="Ngưỡng cảnh báo hết hàng">
                {product.stock.lowStockThreshold}
              </Descriptions.Item>
              <Descriptions.Item label="Lần nhập hàng cuối" span={2}>
                {product.stock.lastRestocked
                  ? new Date(product.stock.lastRestocked).toLocaleDateString(
                      "vi-VN"
                    )
                  : "Không có thông tin"}
              </Descriptions.Item>
            </Descriptions>
          </>
        )}

        {product.discount && (
          <>
            <h3 className="font-bold text-blue-700 mb-3">
              Thông tin khuyến mãi
            </h3>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Loại giảm giá">
                {product.discount.type === "percentage"
                  ? "Phần trăm"
                  : "Số tiền cố định"}
              </Descriptions.Item>
              <Descriptions.Item label="Giá trị">
                {product.discount.type === "percentage"
                  ? `${product.discount.value}%`
                  : `${new Intl.NumberFormat("vi-VN").format(
                      product.discount.value
                    )} ₫`}
              </Descriptions.Item>
              <Descriptions.Item label="Giảm tối đa">
                {product.discount.maxDiscountAmount > 0
                  ? `${new Intl.NumberFormat("vi-VN").format(
                      product.discount.maxDiscountAmount
                    )} ₫`
                  : "Không giới hạn"}
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </div>
    </Modal>
  );
}

export default ProductDetailsModal;
