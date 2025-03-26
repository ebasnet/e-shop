import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import CartTotal from "../components/CartTotal";
// Import the action

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders); // Assuming orders are stored in Redux
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // Process orders and save to state
    const tempData = [];
    orders.forEach((order) => {
      order.items.forEach((item) => {
        tempData.push({
          ...item,
          orderId: order.id,
          placedAt: order.placedAt, // Add the order's placed date
        });
      });
    });
    setOrderData(tempData);
  }, [orders]);

  const handleReorder = (item) => {
    const updatedItem = { ...item, quantity: 1 }; // Ensure the quantity is at least 1
    dispatch(addToCart(updatedItem)); // Dispatch the addToCart action
  };

  return (
    <div className="relative pt-5 sm:pt-14 min-h-[80vh] border-t pb-40">
      <div className="text-xl sm:text-2xl my-3">
        <Title text1={"YOUR"} text2={"ORDERS"} />
      </div>

      <div className="flex flex-col gap-6">
        {orderData.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1.2fr_0.5fr] sm:grid-cols-[3fr_1fr_1fr_0.8fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={item.image || assets.defaultImage} // Fallback image if missing
                  alt={item.name}
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">{item.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>Rs. {item.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-sm font-medium">
                  {/* Order total quantity */}
                  Quantity: {item.quantity}
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-500">Order placed at:</div>
                <div className="font-medium">{item.placedAt}</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 ml-2">
                <button
                  className="bg-yellow-400 px-4 py-2 rounded text-black font-medium hover:bg-yellow-500"
                  onClick={() => handleReorder(item)} // Add item to the cart
                >
                  Buy it again
                </button>
                <button className="border px-4 py-2 rounded hover:bg-gray-100">
                  Track package
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Left Cart Total */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/orderdetails")}
              className="text-white bg-black text-sm my-8 px-8 py-3"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
