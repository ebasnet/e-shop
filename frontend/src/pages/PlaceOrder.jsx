import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../redux/orderSlice";

const KHALTI_PUBLIC_KEY = "YOUR_KHALTI_PUBLIC_KEY_HERE"; // Replace with your Khalti public key

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [isPaid, setIsPaid] = useState(false);
  const [khaltiCheckout, setKhaltiCheckout] = useState(null);
  const [showEsewaQR, setShowEsewaQR] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (!window.KhaltiCheckout) {
      const script = document.createElement("script");
      script.src = "https://khalti.com/static/khalti-checkout.js";
      script.async = true;
      script.onload = () => {
        initKhaltiCheckout();
      };
      document.body.appendChild(script);
    } else {
      initKhaltiCheckout();
    }
  }, []);

  const initKhaltiCheckout = () => {
    const config = {
      publicKey: KHALTI_PUBLIC_KEY,
      productIdentity: "12345",
      productName: "eShop Order",
      productUrl: window.location.href,
      eventHandler: {
        onSuccess: (payload) => {
          console.log("Khalti payment success:", payload);
          setIsPaid(true);
          alert("Payment successful via Khalti!");
        },
        onError: (error) => {
          console.error("Khalti payment error:", error);
          setIsPaid(false);
          alert("Payment failed or cancelled.");
        },
        onClose: () => {
          console.log("Khalti payment widget closed.");
          setIsPaid(false);
        },
      },
      paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
      ],
    };
    const checkout = new window.KhaltiCheckout(config);
    setKhaltiCheckout(checkout);
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    if (method !== "cod" && !isPaid) {
      alert("Please complete your payment before placing the order.");
      return;
    }

    const orderDetails = {
      id: Date.now(),
      items: cartItems.map((item) => ({
        ...item,
        image: item.image,
      })),
      placedAt: new Date().toLocaleString(),
      paymentMethod: method,
    };

    dispatch(placeOrder(orderDetails));
    navigate("/success");
  };

  const openKhaltiCheckout = () => {
    if (!khaltiCheckout) {
      alert("Khalti payment gateway is not ready yet.");
      return;
    }

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const amountInPaisa = totalAmount * 100;

    khaltiCheckout.show({ amount: amountInPaisa });
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
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:border-gray-400"
          type="email"
          placeholder="Email Address"
          required
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:border-gray-400"
          type="text"
          placeholder="Street"
          required
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:border-gray-400"
            type="text"
            placeholder="City"
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:border-gray-400"
            type="text"
            placeholder="Province"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:border-gray-400"
            type="number"
            placeholder="Zipcode"
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:outline-none focus:border-gray-400"
            type="number"
            placeholder="Phone Number"
            required
          />
        </div>
      </div>

      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => {
                setMethod("esewa");
                setIsPaid(false);
                setShowEsewaQR(true);
              }}
              className="flex items-center gap-3 border pt-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "esewa" ? "bg-green-400" : ""
                }`}
              />
              <img className="h-9 mx-4" src={assets.esewa_logo} alt="eSewa" />
            </div>

            <div
              onClick={() => {
                setMethod("khalti");
                setIsPaid(false);
                setShowEsewaQR(false);
              }}
              className="flex items-center gap-3 border pt-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "khalti" ? "bg-green-400" : ""
                }`}
              />
              <img className="h-9 mx-4" src={assets.khalti_logo} alt="Khalti" />
            </div>

            <div
              onClick={() => {
                setMethod("cod");
                setIsPaid(true);
                setShowEsewaQR(false);
              }}
              className="flex items-center gap-3 border pt-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              />
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          {/* Khalti pay button */}
          {method === "khalti" && !isPaid && (
            <div className="w-full text-end mt-8">
              <button
                onClick={openKhaltiCheckout}
                className="bg-blue-600 text-white px-16 py-3 text-sm"
              >
                Pay with Khalti
              </button>
            </div>
          )}

          {/* eSewa QR modal */}
          {showEsewaQR && method === "esewa" && !isPaid && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative">
                <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
                  Pay with eSewa
                </h2>
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={assets.qr_place}
                    alt="eSewa QR"
                    className="h-40 w-40 mb-4 border rounded-md"
                  />
                  <p className="text-sm text-gray-600 text-center mb-4">
                    Scan this QR code using eSewa app to complete the payment.
                  </p>
                  <input
                    type="text"
                    placeholder="Enter your mobile number"
                    className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <div className="w-full h-2 bg-gray-100 rounded-full mb-4">
                    <div className="h-2 bg-green-500 rounded-full w-[80%] animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setIsPaid(true);
                      setShowEsewaQR(false);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                  >
                    I've Paid
                  </button>
                  <button
                    onClick={() => setShowEsewaQR(false)}
                    className="text-red-500 hover:text-red-600 px-4 py-2 rounded-md transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Final Place Order Button */}
          <div className="w-full text-end mt-10">
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 text-white px-20 py-3 rounded-full text-base font-semibold hover:bg-green-700 transition"
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
