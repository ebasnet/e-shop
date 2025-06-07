import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { clearOrders } from "../redux/orderSlice"; // make sure this import exists
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(weekday);
dayjs.extend(advancedFormat);

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const [groupedOrders, setGroupedOrders] = useState({});

  useEffect(() => {
    const grouped = {};

    orders.forEach((order) => {
      const formattedDate = dayjs(order.placedAt).format("dddd, MMMM D");

      order.items.forEach((item) => {
        const itemWithInfo = {
          ...item,
          orderId: order.id,
          placedAt: formattedDate,
        };

        if (!grouped[formattedDate]) {
          grouped[formattedDate] = [];
        }

        grouped[formattedDate].push(itemWithInfo);
      });
    });

    setGroupedOrders(grouped);
  }, [orders]);

  const handleReorder = (item) => {
    const updatedItem = { ...item, quantity: 1 };
    dispatch(addToCart(updatedItem));
  };

  return (
    <div className="relative pt-5 sm:pt-14 min-h-[80vh] border-t pb-40">
      <div className="text-xl sm:text-2xl my-3">
        <Title text1={"YOUR"} text2={"ORDERS"} />
      </div>

      {Object.keys(groupedOrders).length === 0 ? (
        <p className="text-center text-gray-600 mt-10">No orders placed yet.</p>
      ) : (
        Object.entries(groupedOrders).map(([date, items]) => (
          <div
            key={date}
            className="bg-gray-50 p-4 rounded shadow mb-8 border border-gray-200"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
              {date}
            </h2>

            {items.map((item, index) => (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1.2fr_0.5fr] sm:grid-cols-[3fr_1fr_1fr_0.8fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={item.image || assets.defaultImage}
                    alt={item.name}
                  />
                  <div>
                    <p className="text-sm sm:text-lg font-medium">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>Rs. {item.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-sm font-medium">
                  Quantity: {item.quantity}
                </div>

                <div className="text-sm text-right font-medium">
                  {item.placedAt}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 ml-2">
                  <button
                    className="bg-yellow-400 px-4 py-2 rounded text-black font-medium hover:bg-yellow-500"
                    onClick={() => handleReorder(item)}
                  >
                    Buy it again
                  </button>
                  <button
                    className="border px-4 py-2 rounded hover:bg-gray-100"
                    onClick={() => navigate("/track-package")}
                  >
                    Track package
                  </button>
                </div>
              </div>
            ))}

            {/* ✅ ORDER SUMMARY SECTION */}
            <div className="mt-6 text-right border-t pt-4 text-sm sm:text-base text-gray-800">
              <p className="font-semibold">
                Total Items:{" "}
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </p>
              <p className="font-semibold">
                Total Price: Rs.{" "}
                {items.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}
              </p>
            </div>
          </div>
        ))
      )}

      {Object.keys(groupedOrders).length > 0 && (
        <div className="text-center mt-10">
          <button
            onClick={() => dispatch(clearOrders())}
            className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600"
          >
            Clear All Orders
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
