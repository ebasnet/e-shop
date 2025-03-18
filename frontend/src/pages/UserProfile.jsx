import React, { useState } from "react";
import { assets } from "../assets/assets"; // Optional: to add a placeholder image or logo for the profile

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    firstName: "Eliza",
    lastName: "Basnet",
    email: "eliza@gmail.com",
    phoneNumber: "9812345678",
    address: "Balkot,Bhaktapur",
    profilePic: assets.default_profile_pic, // Placeholder profile picture
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 w-full sm:w-96 bg-white rounded-lg shadow-lg">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">User Profile</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <div className="flex flex-col items-center space-y-4">
        {/* Profile Picture */}
        {/* <img
          src={user.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        /> */}
        {/* Edit Button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Details */}
      <div className="space-y-4 w-full">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-600">
            First Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-gray-400"
            />
          ) : (
            <p className="text-lg">{user.firstName}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-600">Last Name</label>
          {isEditing ? (
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-gray-400"
            />
          ) : (
            <p className="text-lg">{user.lastName}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-600">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-gray-400"
            />
          ) : (
            <p className="text-lg">{user.email}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="tel"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
              className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-gray-400"
            />
          ) : (
            <p className="text-lg">{user.phoneNumber}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-600">Address</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleInputChange}
              className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-gray-400"
            />
          ) : (
            <p className="text-lg">{user.address}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
