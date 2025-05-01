import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/authSlice"; // Assuming login and logout actions are set up in authSlice

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState(""); // "success" or "error"
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (currentState === "Sign Up") {
        const existingUser = localStorage.getItem("user");
        if (existingUser) {
          setLoading(false);
          setNotificationMessage("User already exists. Please log in.");
          setNotificationType("error");
          setShowNotification(true);
          setCurrentState("Login");
          setForm({ name: "", email: "", password: "" });
          return;
        }

        // Save new user to localStorage and set login state in Redux
        localStorage.setItem("user", JSON.stringify(form));
        setLoading(false);
        setNotificationMessage("Sign up successful! Please log in.");
        setNotificationType("success");
        setShowNotification(true);
        setCurrentState("Login");
        setForm({ name: "", email: "", password: "" });
      } else {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (
          storedUser &&
          storedUser.email === form.email &&
          storedUser.password === form.password
        ) {
          // Set user as logged in in Redux
          localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
          dispatch(login(storedUser)); // Dispatch the login action

          setLoading(false);
          setNotificationMessage("Login successful!");
          setNotificationType("success");
          setShowNotification(true);
          navigate("/profile"); // Navigate to the profile page
        } else {
          setLoading(false);
          setNotificationMessage("Invalid credentials. Please try again.");
          setNotificationType("error");
          setShowNotification(true);
        }
      }
    }, 1500);
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {loading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-700 opacity-50 z-50 flex justify-center items-center">
          <PropagateLoader color="#36d7b7" size={30} />
        </div>
      )}

      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState !== "Login" && (
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-black text-white font-light py-2 px-8 mt-4"
        disabled={loading}
      >
        {loading ? (
          <div className="flex justify-center">
            <PropagateLoader color="#36d7b7" size={15} />
          </div>
        ) : currentState === "Login" ? (
          "Sign In"
        ) : (
          "Sign Up"
        )}
      </button>

      {showNotification && (
        <div
          className={`mt-4 p-3 rounded-md text-center ${
            notificationType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p className="text-white">{notificationMessage}</p>
        </div>
      )}
    </form>
  );
};

export default Login;
