import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  calculateTotals,
} from "../redux/cartSlice";
import Title from "../components/Title";
import { products, assets } from "../assets/assets";
import { toast } from "react-toastify";
import CartTotal from "../components/CartTotal"; // Import the CartTotal component
import { useNavigate } from "react-router"; // Import useNavigate
import { placeOrder } from "../redux/orderSlice"; // Import placeOrder action

const Cart = () => {
  const navigate = useNavigate(); // Use useNavigate to handle navigation
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    cartItems.forEach((item) => {
      if (item.quantity > 0) {
        tempData.push({
          _id: item.id,
          size: item.size,
          quantity: item.quantity,
        });
      }
    });
    setCartData(tempData);

    // Recalculate totals whenever cartItems change
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  const handleQuantityChange = (id, size, newQuantity) => {
    if (newQuantity <= 0) return;
    dispatch(updateQuantity({ id, size, quantity: newQuantity }));
    toast.info("Quantity updated", { icon: "🔁" });
  };

  const handleRemoveFromCart = (id, size) => {
    dispatch(removeFromCart({ id, size }));
    toast.error("Item removed from cart", { icon: "🗑️" });
  };

  if (cartData.length === 0) {
    return (
      <div className="text-center py-6">
        <p>Your cart is empty. Start shopping!</p>
      </div>
    );
  }

  // Handle Place Order navigation and dispatch placeOrder action
  const handlePlaceOrder = () => {
    const orderDetails = {
      orderNumber: Date.now(), // Use current timestamp as order number
      status: "Processing",
      deliveryDate: "March 20, 2025", // Mock delivery date
      items: cartItems,
      subtotal: cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      deliveryFee:
        cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) >= 500
          ? 0
          : 50,
      total:
        cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) +
        (cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) >= 500
          ? 0
          : 50),
    };

    dispatch(placeOrder(orderDetails)); // Dispatch placeOrder action to store the order

    // Navigate to the orders page
    navigate("/payment");
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>Rs. {productData.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    handleQuantityChange(item._id, item.size, item.quantity - 1)
                  }
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  -
                </button>
                <input
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item._id,
                      item.size,
                      parseInt(e.target.value)
                    )
                  }
                />
                <button
                  onClick={() =>
                    handleQuantityChange(item._id, item.size, item.quantity + 1)
                  }
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item._id, item.size)}
                className="w-4 sm:w-5 cursor-pointer"
              >
                <img className="w-full" src={assets.bin_icon} alt="remove" />
              </button>
            </div>
          );
        })}
      </div>
      {/* Cart Total Section */}
      <CartTotal /> {/* Use CartTotal component here */}
      {/* Place Order Button */}
      <div className="mt-6 flex justify-between items-center flex-col sm:flex-row gap-4">
        <button
          onClick={handlePlaceOrder}
          className="border bg-black  text-white text-sm px-8 py-4 text-sm"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
