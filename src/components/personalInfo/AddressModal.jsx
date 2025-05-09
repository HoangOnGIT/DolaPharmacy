import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  message,
  Row,
  Col,
} from "antd";

function AddressModal({ visible, onCancel, onAddAddress, submitting }) {
  const [addressForm] = Form.useForm();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Fetch provinces using the new API
  useEffect(() => {
    fetch("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the specific response format with data property
        if (responseData.error === 0 && responseData.data) {
          const formattedProvinces = responseData.data.map((province) => ({
            id: province.id,
            value: province.name,
            label: province.name,
          }));
          setProvinces(formattedProvinces);
        } else {
          console.error("Province data format is incorrect:", responseData);
          message.error(
            "Không thể tải danh sách tỉnh thành. Dữ liệu không hợp lệ."
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
        message.error(
          "Không thể tải danh sách tỉnh thành. Vui lòng thử lại sau."
        );
      });
  }, []);

  // Load districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
        .then((response) => response.json())
        .then((responseData) => {
          // Similar handling for districts data
          if (responseData.error === 0 && responseData.data) {
            const formattedDistricts = responseData.data.map((district) => ({
              value: district.name,
              label: district.name,
              id: district.id,
            }));
            setDistricts(formattedDistricts);
          } else {
            console.error("District data format is incorrect:", responseData);
            message.error(
              "Không thể tải danh sách quận huyện. Dữ liệu không hợp lệ."
            );
          }
          // Reset ward selection when district changes
          setSelectedDistrict(null);
          addressForm.setFieldsValue({ district: undefined, ward: undefined });
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
          message.error(
            "Không thể tải danh sách quận huyện. Vui lòng thử lại sau."
          );
        });
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  // Load wards when district changes
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.error === 0 && responseData.data) {
            const formattedWards = responseData.data.map((ward) => ({
              value: ward.name,
              label: ward.name,
            }));
            setWards(formattedWards);
            addressForm.setFieldsValue({ ward: undefined });
          } else {
            console.error("Ward data format is incorrect:", responseData);
            message.error(
              "Không thể tải danh sách phường xã. Dữ liệu không hợp lệ."
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching wards:", error);
          message.error(
            "Không thể tải danh sách phường xã. Vui lòng thử lại sau."
          );
        });
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  const handleAddressFailed = () => {
    message.warning("Vui lòng kiểm tra thông tin địa chỉ!");
  };

  // Handle form submission including all address fields
  const handleSubmit = (values) => {
    const addressData = {
      ...values,
      city: values.province,
      state: values.district,
      ward: values.ward,
      street: values.address,
      phone: values.phoneNumber,
    };
    onAddAddress(addressData);
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
        onFinish={handleSubmit}
        onFinishFailed={handleAddressFailed}
        initialValues={{
          type: "shipping",
          isPrimary: false,
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="province"
              label="Tỉnh thành"
              rules={[{ required: true, message: "Vui lòng chọn tỉnh thành!" }]}
            >
              <Select
                showSearch
                placeholder="Chọn tỉnh thành"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={provinces}
                onChange={(value, option) => {
                  const selectedProv = provinces.find(
                    (province) => province.value === value
                  );
                  if (selectedProv) {
                    setSelectedProvince(selectedProv.id);
                  }
                  addressForm.setFieldsValue({
                    district: undefined,
                    ward: undefined,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="district"
              label="Quận huyện"
              rules={[{ required: true, message: "Vui lòng chọn quận huyện!" }]}
            >
              <Select
                showSearch
                placeholder="Chọn quận huyện"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={districts}
                disabled={!selectedProvince}
                onChange={(value) => {
                  const selectedDist = districts.find(
                    (district) => district.value === value
                  );
                  if (selectedDist) {
                    setSelectedDistrict(selectedDist.id);
                  }
                  addressForm.setFieldsValue({ ward: undefined });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ward"
              label="Phường xã"
              rules={[{ required: true, message: "Vui lòng chọn phường xã!" }]}
            >
              <Select
                showSearch
                placeholder="Chọn phường xã"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={wards}
                disabled={!selectedDistrict}
              />
            </Form.Item>
          </Col>
        </Row>

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
            <Button onClick={onCancel} className="!mr-3">
              Hủy
            </Button>
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
