import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import Title from "../../components/Title";

export default function Items() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [addedMsg, setAddedMsg] = useState(false);

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    imageFile: null,
    imagePreview: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setAdding(true);

    const newItem = {
      id: Date.now(),
      title: newProduct.title,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      category: newProduct.category,
      image: newProduct.imagePreview || "https://via.placeholder.com/150",
    };

    setTimeout(() => {
      setProducts((prev) => [...prev, newItem]);
      setNewProduct({
        title: "",
        price: "",
        description: "",
        category: "",
        imageFile: null,
        imagePreview: "",
      });
      setAdding(false);
      setAddedMsg(true);
      setTimeout(() => setAddedMsg(false), 2000);
    }, 1000);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) {
    return <div className="text-center text-xl mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <Title text1={"PRODUCTS"} text2={"DASHBOARD"} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Add Product Form */}
        <form
          onSubmit={handleAddProduct}
          className="p-6 rounded-2xl border shadow bg-white relative"
        >
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            Add New Product
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newProduct.title}
            onChange={handleInputChange}
            required
            className="w-full mb-3 px-4 py-2 border rounded-lg"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
            className="w-full mb-3 px-4 py-2 border rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            rows="3"
            className="w-full mb-3 px-4 py-2 border rounded-lg"
          />

          <select
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            required
            className="w-full mb-3 px-4 py-2 border rounded-lg"
          >
            <option value="">Choose Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-3"
          />

          {newProduct.imagePreview && (
            <img
              src={newProduct.imagePreview}
              alt="preview"
              className="w-32 h-32 object-contain mb-4 border rounded-lg"
            />
          )}

          <button
            type="submit"
            disabled={adding}
            className="bg-indigo-600 text-white w-full py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {adding ? (
              <span className="flex justify-center items-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" /> Adding...
              </span>
            ) : (
              "Add Product"
            )}
          </button>

          {addedMsg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute right-6 bottom-6 bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow text-sm flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Product added!
            </motion.div>
          )}
        </form>

        {/* Product List */}
        <div>
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            Product List
          </h2>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            <AnimatePresence>
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between border p-4 rounded-xl shadow-sm bg-white"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-contain border rounded-lg"
                    />
                    <div className="space-y-1 max-w-xs">
                      <h3 className="font-semibold text-base line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>
                      <span className="text-indigo-600 font-bold text-sm">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
