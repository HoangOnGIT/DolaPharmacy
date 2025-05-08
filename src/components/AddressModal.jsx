import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Checkbox, Select, message } from "antd";

function AddressModal({ visible, onCancel, onAddAddress, submitting }) {
  const [addressForm] = Form.useForm();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Fetch provinces and districts for address form
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p")
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data);
      })
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/d")
      .then((response) => response.json())
      .then((data) => {
        setDistricts(data);
      })
      .catch((error) => console.error("Error fetching districts:", error));
  }, []);

  const handleAddressFailed = () => {
    message.warning("Vui lòng kiểm tra thông tin địa chỉ!");
  };

  return (
    <Modal
      title="Thêm địa chỉ mới"
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose={true}
      width={600}
    >
      <Form
        form={addressForm}
        layout="vertical"
        onFinish={onAddAddress}
        onFinishFailed={handleAddressFailed}
        initialValues={{
          type: "shipping",
          isPrimary: false,
        }}
      >
        <Form.Item
          name="province"
          label="Tỉnh thành"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh thành!" }]}
        >
          <Select
            showSearch
            placeholder="Chọn tỉnh thành"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={provinces.map((province) => ({
              value: province.name,
              label: province.name,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="district"
          label="Quận huyện"
          rules={[{ required: true, message: "Vui lòng chọn quận huyện!" }]}
        >
          <Select
            showSearch
            placeholder="Chọn quận huyện"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={districts.map((district) => ({
              value: district.name,
              label: district.name,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ chi tiết"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input placeholder="Số nhà, tên đường..." size="large" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input placeholder="Số điện thoại liên hệ" size="large" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Loại địa chỉ"
          rules={[{ required: true, message: "Vui lòng chọn loại địa chỉ!" }]}
        >
          <Select
            placeholder="Chọn loại địa chỉ"
            options={[
              { value: "shipping", label: "Địa chỉ giao hàng" },
              { value: "billing", label: "Địa chỉ thanh toán" },
            ]}
          />
        </Form.Item>

        <Form.Item name="isPrimary" valuePropName="checked">
          <Checkbox>Đặt làm địa chỉ chính</Checkbox>
        </Form.Item>

        <Form.Item className="mt-4">
          <div className="flex justify-end space-x-2">
            <Button onClick={onCancel}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              className="bg-blue-500"
            >
              Thêm địa chỉ
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddressModal;
