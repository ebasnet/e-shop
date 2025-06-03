import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const Sample = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });
  const [showWishlist, setShowWishlist] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        const clothes = data.filter(
          (product) =>
            product.category === "men's clothing" ||
            product.category === "women's clothing"
        );
        setProducts(clothes);
      } catch (error) {
        console.error("Error fetching clothes:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClothes();
  }, []);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  if (loading)
    return <p className="text-center my-10 text-lg">Loading clothes...</p>;

  if (error)
    return (
      <p className="text-center my-10 text-red-500 font-semibold">{error}</p>
    );

  return (
    <div className="p-4 sm:p-6">
      <div className="text-center text-2xl sm:text-3xl py-6 sm:py-8">
        <Title text1="UPCOMING" text2="ITEMS" />
        <p className="w-full sm:w-3/4 m-auto text-sm sm:text-base text-gray-600">
          Clothing collection from Best Sellers all over the world to your
          doorstep.
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowWishlist((prev) => !prev)}
          className="relative px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
          aria-label="Toggle Wishlist"
        >
          Wishlist
          {wishlist.length > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-white text-pink-600 text-xs font-bold px-2 py-0.5 rounded-full shadow">
              {wishlist.length}
            </span>
          )}
        </button>
      </div>

      {showWishlist ? (
        <div className="mb-8 p-4 bg-gray-100 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-pink-600">
              Your Wishlist
            </h2>
            <button
              onClick={() => setShowWishlist(false)}
              className="text-sm px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              Back
            </button>
          </div>

          {wishlist.length === 0 ? (
            <p className="text-center text-gray-600">Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlist.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  toggleWishlist={toggleWishlist}
                  isWishlisted={true}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length === 0 ? (
            <p className="text-center col-span-full text-gray-600">
              No clothing products available at the moment.
            </p>
          ) : (
            products.map((product) => {
              const isWishlisted = wishlist.some(
                (item) => item.id === product.id
              );
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  toggleWishlist={toggleWishlist}
                  isWishlisted={isWishlisted}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product, toggleWishlist, isWishlisted }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-3 flex flex-col justify-between items-center text-center transition-transform duration-300 hover:shadow-lg">
      <Link to={`/sample/${product.id}`} className="w-full">
        <div className="w-full h-44 sm:h-52 md:h-60 overflow-hidden mb-3">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h2 className="text-sm sm:text-base font-semibold h-12 overflow-hidden mb-2">
          {product.title.length > 50
            ? product.title.substring(0, 50) + "..."
            : product.title}
        </h2>
      </Link>

      <p className="text-pink-600 font-bold mt-2 mb-3 text-sm sm:text-base">
        Rs. {product.price}
      </p>

      <button
        onClick={() => toggleWishlist(product)}
        className={`mt-auto px-4 py-2 rounded-xl text-white w-full ${
          isWishlisted
            ? "bg-gray-500 hover:bg-gray-600"
            : "bg-pink-500 hover:bg-pink-600"
        }`}
        aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    </div>
  );
};

export default Sample;
