import React, { useEffect } from "react";
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
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  const handleQuantityChange = (id, size, newQuantity) => {
    if (newQuantity <= 0 || isNaN(newQuantity)) return;
    dispatch(updateQuantity({ id, size, quantity: newQuantity }));
    toast.info("Quantity updated", { icon: "🔁" });
  };

  const handleRemoveFromCart = (id, size) => {
    dispatch(removeFromCart({ id, size }));
    toast.error("Item removed from cart", { icon: "🗑️" });
  };

  const handleProceedToCheckout = () => {
    if (isLoggedIn) {
      navigate("/placeorder");
    } else {
      navigate("/login");
    }
  };

  const filteredCartItems = cartItems.filter((item) => item.quantity > 0);

  return (
    <div className="relative pt-5 sm:pt-14 min-h-[80vh] border-t pb-40">
      <div className="text-xl sm:text-2xl my-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="flex flex-col gap-6">
        {filteredCartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            <p className="text-2xl font-semibold text-gray-700 mb-4">
              No items in the cart.
            </p>
            <Link
              to="/Collection"
              className="inline-block bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition duration-200 shadow-md"
            >
              Continue Shopping!
            </Link>
          </div>
        ) : (
          filteredCartItems.map((item) => {
            const productData = products.find(
              (product) => product._id === item.id || product._id === item._id
            );

            if (!productData) return null;

            return (
              <div
                key={`${item._id || item.id}-${item.size}`}
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
                    aria-label="Decrease quantity"
                    onClick={() =>
                      handleQuantityChange(
                        item._id || item.id,
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
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val)) {
                        handleQuantityChange(
                          item._id || item.id,
                          item.size,
                          val
                        );
                      }
                    }}
                  />
                  <button
                    aria-label="Increase quantity"
                    onClick={() =>
                      handleQuantityChange(
                        item._id || item.id,
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
                  onClick={() =>
                    handleRemoveFromCart(item._id || item.id, item.size)
                  }
                  className="w-4 sm:w-5 cursor-pointer"
                  aria-label="Remove item from cart"
                >
                  <img className="w-full" src={assets.bin_icon} alt="remove" />
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={handleProceedToCheckout}
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
