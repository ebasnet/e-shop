import React, { useState, useEffect } from "react";

export default function AdminProfile() {
  // Load saved profile from localStorage or use defaults
  const getInitialProfile = () => {
    const saved = localStorage.getItem("adminProfile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          name: "Admin Name",
          email: "admin@example.com",
          phone: "9876543210",
        };
      }
    }
    return {
      name: "Admin Name",
      email: "admin@example.com",
      phone: "9876543210",
    };
  };

  const [profile, setProfile] = useState(getInitialProfile);
  const [editMode, setEditMode] = useState(false);

  // Save profile to localStorage whenever it changes *and* editMode is off (means after save)
  useEffect(() => {
    if (!editMode) {
      localStorage.setItem("adminProfile", JSON.stringify(profile));
    }
  }, [profile, editMode]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditMode(false);
    alert("Profile saved!");
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          disabled={!editMode}
          onChange={handleChange}
          className={`w-full border px-3 py-2 rounded ${
            editMode ? "border-blue-500" : "border-gray-300 bg-gray-100"
          }`}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          disabled={!editMode}
          onChange={handleChange}
          className={`w-full border px-3 py-2 rounded ${
            editMode ? "border-blue-500" : "border-gray-300 bg-gray-100"
          }`}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          value={profile.phone}
          disabled={!editMode}
          onChange={handleChange}
          className={`w-full border px-3 py-2 rounded ${
            editMode ? "border-blue-500" : "border-gray-300 bg-gray-100"
          }`}
        />
      </div>

      {editMode ? (
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}
