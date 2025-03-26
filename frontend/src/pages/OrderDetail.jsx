import React from "react";
import { useLocation } from "react-router-dom";

const OrderDetail = () => {
  const location = useLocation();
  const { order } = location.state || {}; // Get the order data passed from the Orders page

  if (!order) {
    return <p>No order data available</p>; // Show a fallback message if no order is passed
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <p className="text-lg font-medium mb-4">Order ID: {order.id}</p>
      <p className="text-lg font-medium mb-4">Placed at: {order.placedAt}</p>

      <div>
        <h3 className="text-xl font-semibold mb-2">Items in Order:</h3>
        {order.items && order.items.length > 0 ? (
          order.items.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center gap-6">
                <img
                  className="w-20"
                  src={item.image || "default_image.jpg"} // Fallback image if no image exists
                  alt={item.name}
                />
                <div>
                  <p className="text-lg font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>Rs. {item.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      Size: {item.size}
                    </p>
                  </div>
                  <p className="mt-2 text-sm">Quantity: {item.quantity}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No items found in this order.</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
