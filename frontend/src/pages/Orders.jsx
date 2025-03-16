import React, { useState } from "react";
import { useSelector } from "react-redux";

const Orders = () => {
  const orders = useSelector((state) => state.orders.orders);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-4 text-center">Your Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.orderNumber}
            className="border p-6 rounded-lg shadow-xl mb-4"
          >
            <h2 className="text-2xl font-semibold mb-3">
              Order #{order.orderNumber}
            </h2>
            <p>Status: {order.status}</p>
            <p>Estimated Delivery: {order.deliveryDate}</p>
            <div className="mt-4">
              <h3 className="font-medium text-lg">Order Details</h3>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        imageError
                          ? "path/to/fallback-image.jpg"
                          : item.image[0]
                      }
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                      onError={handleImageError}
                    />
                    <div>
                      <p className="font-medium text-lg">{item.name}</p>
                      <p>Size: {item.size}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Rs. {item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p className="font-medium">Subtotal: Rs. {order.subtotal}</p>
              <p className="font-medium">
                Delivery Fee: Rs. {order.deliveryFee}
              </p>
              <p className="font-bold text-xl mt-2">Total: Rs. {order.total}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default Orders;
