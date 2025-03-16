// src/components/LoginModal.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowLogin } from "../redux/shopSlice"; // Import the action
import { assets } from "../assets/assets";

const LoginModal = () => {
  const showLogin = useSelector((state) => state.shop.showLogin); // Get showLogin from Redux
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  if (!showLogin) return null; // Don't render if showLogin is false

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Sign up</h2>
          <img
            src={assets.cross_icon}
            alt="Close"
            className="w-6 h-6 cursor-pointer"
            onClick={() => dispatch(setShowLogin(false))} // Close the modal by dispatching the action
          />
        </div>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Your email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
