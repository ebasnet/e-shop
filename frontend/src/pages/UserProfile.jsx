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

      // Set defaults if fields are missing
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
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center p-10 max-w-lg mx-auto bg-white rounded-xl shadow-xl space-y-8">
      <div className="flex items-center gap-3 mb-6 mt-6">
        <p className="text-4xl font-semibold text-gray-900">User Profile</p>
        <hr className="flex-grow border-none h-[2px] bg-gray-300" />
      </div>

      <button
        onClick={() => setIsEditing(!isEditing)}
        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg text-lg transition duration-300 hover:bg-blue-700 focus:outline-none"
      >
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>

      <div className="w-full space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm text-gray-700 font-medium">
            Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="border border-gray-300 p-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          ) : (
            <p className="text-gray-700">{user.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-700 font-medium">
            Email
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="border border-gray-300 p-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          ) : (
            <p className="text-gray-700">{user.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-700 font-medium">
            Password
          </label>
          {isEditing ? (
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleInputChange}
                className="border border-gray-300 p-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-4 top-3 text-gray-500 focus:outline-none"
              >
                👁️
              </button>
            </div>
          ) : (
            <p className="text-gray-700">••••••••</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm text-gray-700 font-medium">
            Mobile Number
          </label>
          {isEditing ? (
            <input
              type="text"
              name="mobile"
              value={user.mobile}
              onChange={handleInputChange}
              placeholder="e.g. 9800000000"
              className="border border-gray-300 p-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          ) : (
            <p className="text-gray-700">{user.mobile || "Not provided"}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm text-gray-700 font-medium">
            Address
          </label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleInputChange}
              placeholder="Your city or street address"
              className="border border-gray-300 p-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          ) : (
            <p className="text-gray-700">{user.address || "Not provided"}</p>
          )}
        </div>
      </div>

      {isEditing && (
        <button
          onClick={handleSaveChanges}
          className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg text-lg transition duration-300 hover:bg-green-700 focus:outline-none"
        >
          Save Changes
        </button>
      )}

      <Link to="/orders">
        <button className="w-full sm:w-auto bg-gray-600 text-white px-6 py-3 rounded-lg text-lg transition duration-300 hover:bg-gray-700 focus:outline-none mt-6">
          View Orders
        </button>
      </Link>
    </div>
  );
};

export default UserProfile;
