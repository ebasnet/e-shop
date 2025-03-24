import React, { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../redux/orderSlice";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const orderDetails = {
      id: Date.now(),
      items: cartItems.map((item) => ({
        ...item,
        image: item.image,
      })),
      placedAt: new Date().toLocaleString(),
    };

    dispatch(placeOrder(orderDetails));

    navigate("/success");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className=" text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:border-gray-400"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:border-gray-400"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full  focus:outline-none focus:border-gray-400"
          type="email"
          placeholder="Email Address"
          required
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:border-gray-400"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:border-gray-400"
            type="text"
            placeholder="City"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:border-gray-400"
            type="text"
            placeholder="Province"
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:border-gray-400"
            type="number"
            placeholder="Zipcode"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:border-gray-400"
            type="number"
            placeholder="Phone Number"
          />
        </div>
      </div>
      {/* right  side */}
      <div className="mt-8 ">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* payment selection */}

          <div className="flex  gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("esewa")}
              className="flex items-center gap-3 border pt-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5  border rounded-full ${
                  method === "esewa" ? "bg-green-400" : ""
                }`}
              >
                {" "}
              </p>
              <img className="h-9 mx-4" src={assets.esewa_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("khalti")}
              className="flex items-center gap-3 border pt-2 px-3 cursor-pointer "
            >
              <p
                className={`min-w-3.5 h-3.5  border rounded-full ${
                  method === "khalti" ? "bg-green-400" : ""
                }`}
              >
                {" "}
              </p>
              <img className="h-9 mx-4" src={assets.khalti_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border pt-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5  border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              >
                {" "}
              </p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              onClick={handlePlaceOrder}
              // onClick={() => navigate("/success")}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
