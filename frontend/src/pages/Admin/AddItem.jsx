import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/productSlice";

const categories = ["Men", "Women", "Kids"];
const sizes = ["S", "M", "L", "XL", "XXL"];

export default function AddItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(file);
  };

  const handleSave = () => {
    if (!name || selectedSizes.length === 0 || !description) {
      alert("Please fill all required fields and select at least one size.");
      return;
    }

    setLoading(true);

    const newItem = {
      id: Date.now(), // or uuid if using it
      name,
      category,
      sizes: selectedSizes,
      description,
      photo: photo ? URL.createObjectURL(photo) : null, // preview link
    };

    // ✅ Dispatch action to Redux
    dispatch(addProduct(newItem));

    alert("Item added (frontend simulation only).");
    handleCancel();
    navigate("/items"); // or admin dashboard
    setLoading(false);
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
      <button
        onClick={() => navigate("/admin")}
        className="mb-6 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition"
      >
        {/* SVG back icon */}
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

      <label className="block mb-2 text-gray-700 font-semibold">
        Item Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter item name"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-indigo-400"
      />

      <label className="block mt-6 mb-2 text-gray-700 font-semibold">
        Category
      </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-indigo-400"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <label className="block mt-6 mb-2 text-gray-700 font-semibold">
        Sizes
      </label>
      <div className="flex flex-wrap gap-5">
        {sizes.map((size) => (
          <label key={size} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedSizes.includes(size)}
              onChange={() => handleSizeChange(size)}
              className="h-5 w-5 text-indigo-600"
            />
            <span>{size}</span>
          </label>
        ))}
      </div>

      <label className="block mt-6 mb-2 text-gray-700 font-semibold">
        Description
      </label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 resize-none focus:ring-indigo-400"
      />

      <label className="block mt-6 mb-2 text-gray-700 font-semibold">
        Upload Photo
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="block w-full text-gray-600"
      />
      {photo && (
        <p className="mt-2 text-sm text-gray-500 italic">
          Selected: <span className="font-medium">{photo.name}</span>
        </p>
      )}

      <div className="flex justify-end gap-6 mt-10">
        <button
          onClick={handleCancel}
          disabled={loading}
          className="px-6 py-3 bg-gray-300 rounded-xl font-semibold hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
