import React from "react";

const OrderTrack = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-4 text-center">
        Track Your Order
      </h1>
      <div className="border p-6 rounded-lg shadow-xl bg-white">
        <h2 className="text-2xl font-semibold mb-3">Order Status</h2>
        <p className="text-sm mb-4">Your order is currently being processed.</p>
        <p className="text-sm mb-4">Expected Delivery Date: March 20, 2025</p>

        {/* You can show more tracking info here, like shipping carrier, tracking number, etc. */}
      </div>
    </div>
  );
};

export default OrderTrack;
