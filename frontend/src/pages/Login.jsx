import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import FormInput from "../components/FormInput";
import FormNotification from "../components/FormNotification";
import FormToggle from "../components/FormToggle";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (currentState === "Sign Up") {
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Check if the user already exists
        const userExists = existingUsers.some(
          (user) => user.email === form.email
        );

        if (userExists) {
          setLoading(false);
          setNotification({
            message: "User already exists. Please log in.",
            type: "error",
          });
          setCurrentState("Login");
          setForm({
            name: "",
            email: "",
            password: "",
            mobile: "",
            address: "",
          });
        } else {
          const newUser = {
            name: form.name,
            email: form.email,
            password: form.password,
            mobile: form.mobile,
            address: form.address,
          };
          existingUsers.push(newUser);
          localStorage.setItem("users", JSON.stringify(existingUsers));
          setLoading(false);
          setNotification({
            message: "Sign up successful! Please log in.",
            type: "success",
          });
          setCurrentState("Login");
          setForm({
            name: "",
            email: "",
            password: "",
            mobile: "",
            address: "",
          });
        }
      } else {
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const storedUser = existingUsers.find(
          (user) => user.email === form.email && user.password === form.password
        );

        if (storedUser) {
          localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
          dispatch(login(storedUser));
          setLoading(false);
          setNotification({
            message: "Login successful!",
            type: "success",
          });
          navigate("/profile");
        } else {
          setLoading(false);
          setNotification({
            message: "Invalid credentials. Please try again.",
            type: "error",
          });
        }
      }
    }, 1500);
  };

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <form
      onSubmit={handleSubmit}
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
        <>
          <FormInput
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <FormInput
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
          />
          <FormInput
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
        </>
      )}

      <FormInput
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <FormInput
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />

      <FormToggle
        currentState={currentState}
        setCurrentState={setCurrentState}
      />

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

      {notification.message && (
        <FormNotification
          message={notification.message}
          type={notification.type}
        />
      )}
    </form>
  );
};

export default Login;
