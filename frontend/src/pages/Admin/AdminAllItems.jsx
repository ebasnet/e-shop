import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // <-- Correct hook imported

const AdminAllItems = () => {
  const products = useSelector((state) => state.shop.products);
  const [itemList, setItemList] = useState(products);
  const [counter, setCounter] = useState(products.length);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const updatedList = itemList.filter((item) => item._id !== id);
    setItemList(updatedList);
    setCounter((prev) => prev - 1);
  };

  const handleUpdate = (id) => {
    alert(`Updated item with ID: ${id}`);
    setCounter((prev) => prev + 1); // demo update
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate("/admin")}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        🛠️ Admin Panel – All Items
      </h2>

      <p className="mb-6 text-gray-600 text-lg">
        Total Items: <span className="font-semibold">{counter}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {itemList.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col"
          >
            <div className="h-48 w-full overflow-hidden rounded-xl mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-800">{item.name}</h3>
            <p className="text-gray-600 mb-3">Rs. {item.price}</p>

            <div className="mt-auto flex justify-between gap-2 pt-4">
              <button
                onClick={() => handleUpdate(item._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllItems;
