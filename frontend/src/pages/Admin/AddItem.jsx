import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = ["Men", "Women", "Kids"];
const sizes = ["S", "M", "L", "XL", "XXL"];

export default function AddItem() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSave = () => {
    console.log({
      name,
      category,
      sizes: selectedSizes,
      description,
      photo,
    });
    alert("Item data logged to console. Extend to backend submission.");
  };

  const handleCancel = () => {
    setName("");
    setCategory(categories[0]);
    setSelectedSizes([]);
    setDescription("");
    setPhoto(null);
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border border-gray-200 font-sans">
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin")}
        className="mb-6 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Admin
      </button>

      <h1 className="text-3xl font-extrabold text-indigo-700 mb-8 border-b-4 border-indigo-500 pb-3">
        Add New Item
      </h1>

      <label className="block mb-2 text-gray-700 font-semibold tracking-wide">
        Item Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter item name"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      />

      <label className="block mt-6 mb-2 text-gray-700 font-semibold tracking-wide">
        Category
      </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <label className="block mt-6 mb-2 text-gray-700 font-semibold tracking-wide">
        Sizes
      </label>
      <div className="flex flex-wrap gap-5">
        {sizes.map((size) => (
          <label
            key={size}
            className="flex items-center space-x-2 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={selectedSizes.includes(size)}
              onChange={() => handleSizeChange(size)}
              className="form-checkbox h-5 w-5 text-indigo-600 rounded transition duration-200"
            />
            <span className="text-gray-800 font-medium">{size}</span>
          </label>
        ))}
      </div>

      <label className="block mt-6 mb-2 text-gray-700 font-semibold tracking-wide">
        Description
      </label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        placeholder="Enter item description"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
      />

      <label
        htmlFor="photo"
        className="block mt-6 mb-2 text-gray-700 font-semibold tracking-wide cursor-pointer"
      >
        Upload Item Photo
      </label>
      <input
        id="photo"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="block w-full text-gray-600 file:border-0 file:bg-indigo-100 file:rounded file:px-4 file:py-2 file:text-indigo-700 file:font-semibold hover:file:bg-indigo-200 cursor-pointer"
      />
      {photo && (
        <p className="mt-2 text-sm text-gray-500 italic">
          Selected: <span className="font-medium">{photo.name}</span>
        </p>
      )}

      <div className="flex justify-end gap-6 mt-10">
        <button
          onClick={handleCancel}
          className="px-6 py-3 bg-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-indigo-600 rounded-xl font-semibold text-white hover:bg-indigo-700 transition shadow-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
}
