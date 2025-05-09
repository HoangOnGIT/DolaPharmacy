import React, { useEffect, useState } from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";

export default function DashboardStatsGrid() {
  const [orderData, setOrderData] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productData, setProductData] = useState([]);
  const base = import.meta.env.VITE_API_BASE_URL;

  function BoxWrapper({ children }) {
    return (
      <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
        {children}
      </div>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, usersRes, productsRes] = await Promise.all([
          fetch(`${base}/api/orders`),
          fetch(`${base}/api/users`),
          fetch(`${base}/api/products`)
        ]);

        const [orders, users, products] = await Promise.all([
          ordersRes.json(),
          usersRes.json(),
          productsRes.json()
        ]);

        setOrderData(orders);
        setOrderCount(orders.length);
        setCustomerCount(users.filter(u => u.role === "customer").length);
        setProductData(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Tổng doanh số
  const totalSales = orderData.reduce((acc, order) => acc + (order.total || 0), 0);

  // Tổng chi phí
  const totalExpenses = orderData.reduce((acc, order) => {
    const orderItemsCost = order.items?.reduce((itemAcc, item) => {
      // Giả sử item là object chứa productId và quantity
      const product = productData.find(p => p.id === item.productId);
      const cost = product ? Number(product.cost || 0) * Number(item.quantity || 0) : 0;
      return itemAcc + cost;
    }, 0) || 0;
    return acc + orderItemsCost;
  }, 0);

  // Định dạng tiền VND
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount).replace("₫", " VNĐ");

  return (
    <div className="flex gap-4 w-full py-4">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Tổng doanh số</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {formatCurrency(totalSales)}
            </strong>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Tổng chi phí</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {formatCurrency(totalExpenses)}
            </strong>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Tổng khách hàng</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {customerCount}
            </strong>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Tổng đơn hàng</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {orderCount}
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}