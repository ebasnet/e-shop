import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import FormInput from "../../components/FormInput";
import FormNotification from "../../components/FormNotification";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
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
      const adminCredentials = {
        email: "admin@eshop.com",
        password: "admin123",
      };

      if (
        form.email === adminCredentials.email &&
        form.password === adminCredentials.password
      ) {
        const adminUser = {
          name: "Admin",
          email: form.email,
          role: "admin",
        };
        localStorage.setItem("loggedInUser", JSON.stringify(adminUser));
        dispatch(login(adminUser));
        setLoading(false);
        setNotification({
          message: "Admin login successful!",
          type: "success",
        });
        navigate("/admin"); // change to your admin route
      } else {
        setLoading(false);
        setNotification({
          message: "Invalid admin credentials.",
          type: "error",
        });
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
        <p className="prata-regular text-3xl">Admin Login</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <FormInput
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Admin Email"
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

      <button
        type="submit"
        className="bg-black text-white font-light py-2 px-8 mt-4"
        disabled={loading}
      >
        {loading ? (
          <div className="flex justify-center">
            <PropagateLoader color="#36d7b7" size={15} />
          </div>
        ) : (
          "Login"
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

export default AdminLogin;
