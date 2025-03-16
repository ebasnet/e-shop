import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { placeOrder } from "../redux/orderSlice"; // Import the placeOrder action

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currency = useSelector((state) => state.shop.currency);
  const deliveryFee = useSelector((state) => state.shop.delivery_fee);
  const subtotal = useSelector((state) => state.cart.subtotal);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "Cash On Delivery", // Default payment method
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirmOrder = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.address ||
      !formData.phone
    ) {
      toast.error("Please fill in all the details!");
      return;
    }

    // Prepare order details
    const orderDetails = {
      orderNumber: Date.now(), // Use current timestamp as the order number
      status: "Processing", // Default status, can be updated later
      deliveryDate: "March 20, 2025", // Example delivery date, you can calculate it dynamically
      items: cartItems, // Items in the cart
      subtotal: subtotal,
      deliveryFee: subtotal >= 500 ? 0 : deliveryFee, // Delivery fee logic
      total: subtotal + (subtotal >= 500 ? 0 : deliveryFee), // Total calculation
      customer: formData, // Customer information (Name, Email, Address, Phone)
    };

    // Dispatch placeOrder action to save order to the store
    dispatch(placeOrder({ orderDetails }));

    toast.success("Order placed successfully!", { icon: "✔️" });

    // Navigate to the orders page
    navigate("/orders");
  };

  const calculatedTotal = subtotal + (subtotal >= 500 ? 0 : deliveryFee); // Add delivery fee based on subtotal

  return (
    <div className="pt-14 max-w-4xl mx-auto px-4">
      <div className="text-3xl font-semibold mb-6 text-center">
        <Title text1={"PLACE"} text2={"ORDER"} />
      </div>

      {/* Form for User Information */}
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h3 className="text-xl font-medium">Shipping Information</h3>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="sm:col-span-2 mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your shipping address"
                rows="4"
              ></textarea>
            </div>

            <div className="sm:col-span-2 mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Cash On Delivery">Cash On Delivery</option>
                <option value="Card">Credit/Debit Card</option>
                <option value="Paypal">Paypal</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      {/* Order Totals */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h3 className="text-xl font-medium mb-4">Order Summary</h3>
        <p className="text-sm text-gray-700">
          Subtotal: {currency} {subtotal}
        </p>
        <p className="text-sm text-gray-700">
          Delivery Fee: {currency} {subtotal >= 500 ? 0 : deliveryFee}
        </p>
        <p className="font-bold text-lg mt-2">
          Total: {currency} {calculatedTotal}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-between items-center flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/cart")}
          className="px-6 py-3 bg-gray-200 text-black rounded-lg hover:bg-gray-300 w-full sm:w-auto"
        >
          Back to Cart
        </button>
        <button
          onClick={handleConfirmOrder}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
