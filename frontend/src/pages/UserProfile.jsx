import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      const userWithDefaults = {
        ...parsedUser,
        mobile: parsedUser.mobile || "",
        address: parsedUser.address || "",
      };
      setUser(userWithDefaults);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) => (u.email === user.email ? user : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsEditing(false);
    alert("🎉 Profile updated successfully!");
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0].toUpperCase())
      .join("");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] flex items-center justify-center px-4 animate-fade-in-up">
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-3xl transition-all duration-500 animate-fade-in-slow">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar with animated gradient ring */}
          <div className="relative animate-pulse-slow">
            <div className="w-28 h-28 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 p-1 rounded-full shadow-lg animate-spin-slower">
              <div className="bg-indigo-600 w-full h-full rounded-full flex items-center justify-center text-white text-4xl font-bold tracking-widest">
                {getInitials(user.name)}
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-lg animate-fade-in">
                  Welcome,{" "}
                  <span className="text-indigo-700">
                    {user.name?.split(" ")[0]}
                  </span>{" "}
                  👋
                </h1>
                <p className="text-gray-600 text-sm font-medium animate-fade-in">
                  Glad to see you back!
                </p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-5 py-2 rounded-full text-white font-semibold shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl ${
                  isEditing
                    ? "bg-rose-500 hover:bg-rose-600"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="grid gap-5">
              {["name", "email", "mobile", "address"].map((field, index) => (
                <div
                  key={field}
                  className={`animate-fade-in delay-[${index * 100}ms]`}
                >
                  <label className="block mb-1 text-sm text-gray-600 capitalize">
                    {field}
                  </label>
                  {isEditing ? (
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={user[field]}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 animate-glow-on-focus"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">
                      {user[field] || "Not provided"}
                    </p>
                  )}
                </div>
              ))}

              {/* Password Field */}
              <div className="animate-fade-in delay-500">
                <label className="block mb-1 text-sm text-gray-600">
                  Password
                </label>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-4 top-2.5 text-xl text-gray-500"
                    >
                      {passwordVisible ? "🙈" : "👁️"}
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-800">••••••••</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="text-center mt-8 animate-fade-in">
                <button
                  onClick={handleSaveChanges}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-105 text-lg font-semibold"
                >
                  ✅ Save Profile
                </button>
              </div>
            )}

            <div className="text-center mt-8 animate-fade-in delay-700">
              <Link to="/orders">
                <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-md hover:scale-105">
                  🛒 View Orders
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.7s ease-out both;
          }

          .animate-spin-slower {
            animation: spin 12s linear infinite;
          }

          .animate-pulse-slow {
            animation: pulse 3s infinite;
          }

          .animate-glow-on-focus:focus {
            box-shadow: 0 0 10px #6366f1;
          }

          .animate-fade-in {
            animation: fade-in 0.6s ease both;
          }

          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default UserProfile;
