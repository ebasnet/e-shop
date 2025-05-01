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
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState([]);

  // Access the user's login status from the Redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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

  const handleProceedToCheckout = () => {
    if (isLoggedIn) {
      navigate("/placeorder"); // Navigate to PlaceOrder if logged in
    } else {
      navigate("/login"); // Navigate to Login if not logged in
    }
  };

  return (
    <div className="relative pt-5 sm:pt-14 min-h-[80vh] border-t pb-40">
      <div className="text-xl sm:text-2xl my-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="flex flex-col gap-6">
        {cartData.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            if (!productData) return null; // Skip rendering if productData is not found

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1.2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image?.[0] || assets.defaultImage}
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-sm sm:text-lg font-medium">
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
                      handleQuantityChange(
                        item._id,
                        item.size,
                        item.quantity - 1
                      )
                    }
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <input
                    className="border w-10 sm:w-12 px-1 text-center"
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
                      handleQuantityChange(
                        item._id,
                        item.size,
                        item.quantity + 1
                      )
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
          })
        )}
      </div>

      {/* Bottom Left Cart Total */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={handleProceedToCheckout} // Use the new checkout handler
              className="text-white bg-black text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
