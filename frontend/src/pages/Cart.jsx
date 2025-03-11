import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal >= 500 ? 0 : 50;
  const total = subtotal + deliveryFee;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">My Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">No items in cart.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border-b border-gray-300 mb-4"
            >
              <div className="flex-shrink-0 w-24 h-24">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div className="flex flex-col justify-between ml-4">
                <p className="font-medium text-lg">{item.name}</p>
                <span className="text-gray-500">
                  Rs.{item.price} × {item.quantity} = Rs.
                  {item.price * item.quantity}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => dispatch(increaseQuantity({ id: item.id }))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  -
                </button>
                <button
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="border-t pt-4">
            <p className="text-lg font-medium">Subtotal: Rs.{subtotal}</p>
            <p className="text-lg font-medium">
              Delivery Fee: Rs.{deliveryFee === 0 ? "Free" : deliveryFee}
            </p>
            <p className="text-xl font-bold mt-2">Total: Rs.{total}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
