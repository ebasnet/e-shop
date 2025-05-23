import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialOrders = [
  {
    id: 201,
    customer: "Eliza Basnet",
    item: "Women Round Neck Top",
    size: "M",
    status: "Pending",
  },
  {
    id: 202,
    customer: "Ram Gurung",
    item: "Men Fitted Shirt",
    size: "L",
    status: "Sent for Delivery",
  },
  {
    id: 203,
    customer: "Anita Rai",
    item: "Kids Frock",
    size: "S",
    status: "Auto Dispatch",
  },
  {
    id: 204,
    customer: "Suman Thapa",
    item: "Men Polo T-Shirt",
    size: "XL",
    status: "Pending",
  },
  {
    id: 205,
    customer: "Kiran Lama",
    item: "Women Casual Dress",
    size: "M",
    status: "Delivered",
  },
  {
    id: 206,
    customer: "Maya Shrestha",
    item: "Kids Shirt",
    size: "XS",
    status: "Cancelled",
  },
  {
    id: 207,
    customer: "Sanjay Rai",
    item: "Men Jeans Pants",
    size: "L",
    status: "Sent for Delivery",
  },
  {
    id: 208,
    customer: "Prisha Gurung",
    item: "Women Blouse",
    size: "S",
    status: "Pending",
  },
  {
    id: 209,
    customer: "Niraj Karki",
    item: "Kids Pants",
    size: "M",
    status: "Auto Dispatch",
  },
  {
    id: 210,
    customer: "Rita Tamang",
    item: "Women Skirt",
    size: "L",
    status: "Delivered",
  },
];

const statusOptions = [
  "Pending",
  "Sent for Delivery",
  "Auto Dispatch",
  "Delivered",
  "Cancelled",
];

const initialPayments = [
  { orderId: 201, amount: 1200, paymentMethod: "Khalti" },
  { orderId: 202, amount: 1500, paymentMethod: "Cash on Delivery" },
  { orderId: 203, amount: 800, paymentMethod: "eSewa" },
  { orderId: 204, amount: 1000, paymentMethod: "Khalti" },
  { orderId: 205, amount: 1300, paymentMethod: "Cash on Delivery" },
  { orderId: 206, amount: 700, paymentMethod: "eSewa" },
  { orderId: 207, amount: 1600, paymentMethod: "Cash on Delivery" },
  { orderId: 208, amount: 900, paymentMethod: "Khalti" },
  { orderId: 209, amount: 850, paymentMethod: "eSewa" },
  { orderId: 210, amount: 1400, paymentMethod: "Cash on Delivery" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const navigate = useNavigate();
  const DELIVERY_CHARGE = 100;

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  // Helper: get payment info for a given orderId
  const getPaymentByOrderId = (orderId) =>
    initialPayments.find((p) => p.orderId === orderId);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <button
        onClick={() => navigate("/admin")}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Admin
      </button>

      <h1 className="text-3xl font-bold mb-6">Manage Orders & Payments</h1>

      <div className="bg-white rounded shadow p-6">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Order ID</th>
              <th className="border px-4 py-2 text-left">Customer</th>
              <th className="border px-4 py-2 text-left">Item</th>
              <th className="border px-4 py-2 text-left">Size</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Choose Action</th>
              <th className="border px-4 py-2 text-left">Payment Method</th>
              <th className="border px-4 py-2 text-left">
                Amount Paid / To Be Paid
              </th>
              <th className="border px-4 py-2 text-left">Delivery Charge</th>
              <th className="border px-4 py-2 text-left">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const payment = getPaymentByOrderId(order.id) || {};
              const amount = payment.amount || 0;
              const paymentMethod = payment.paymentMethod || "N/A";
              const totalAmount = amount + DELIVERY_CHARGE;
              const isCOD = paymentMethod === "Cash on Delivery";

              return (
                <tr key={order.id}>
                  <td className="border px-4 py-2">{order.id}</td>
                  <td className="border px-4 py-2">{order.customer}</td>
                  <td className="border px-4 py-2">{order.item}</td>
                  <td className="border px-4 py-2 font-semibold">
                    {order.size}
                  </td>
                  <td className="border px-4 py-2">{order.status}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">{paymentMethod}</td>
                  <td className="border px-4 py-2">
                    {isCOD
                      ? `Rs. ${totalAmount} (To Be Paid)`
                      : `Rs. ${amount}`}
                  </td>
                  <td className="border px-4 py-2">Rs. {DELIVERY_CHARGE}</td>
                  <td className="border px-4 py-2">Rs. {totalAmount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
