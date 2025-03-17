import React from "react";
import { useSelector } from "react-redux";
import Title from "./Title";

const CartTotal = () => {
  const currency = useSelector((state) => state.shop.currency);
  const deliveryFee = useSelector((state) => state.shop.delivery_fee);
  const subtotal = useSelector((state) => state.cart.subtotal);

  // Calculate total (with delivery fee if applicable)
  const calculatedTotal = subtotal + (subtotal >= 500 ? 0 : deliveryFee);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <Title text1={"CART"} text2={"SUMMARY"} />
      <div className="mt-4">
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">
            {currency} {subtotal}
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-semibold">
            {currency} {subtotal >= 500 ? 0 : deliveryFee}
          </span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between items-center py-2">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-bold">
            {currency} {calculatedTotal}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
