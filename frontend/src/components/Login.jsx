import React, { useState } from "react";
import { assets } from "../assets/assets";

const Login = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign up");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{currentState}</h2>
          <img
            src={assets.cross_icon}
            alt="Close"
            className="w-6 h-6 cursor-pointer"
            onClick={() => setShowLogin(false)} // Close the login modal
          />
        </div>
        <div className="space-y-4">
          {currentState === "Sign up" && (
            <input
              type="text"
              placeholder="Your name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
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
        {currentState === "Sign up" && (
          <div className="flex items-center space-x-2">
            <input type="checkbox" required className="h-4 w-4" />
            <p className="text-sm text-gray-600">
              By continuing, I agree to the terms of use & privacy policy
            </p>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {currentState === "Sign up" ? "Create Account" : "Login"}
        </button>
        <div className="text-center text-sm text-gray-600">
          {currentState === "Login" ? (
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => setCurrentState("Sign up")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign up here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setCurrentState("Login")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
