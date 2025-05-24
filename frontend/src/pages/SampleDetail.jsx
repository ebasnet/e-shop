// pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SampleDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/sample" className="text-pink-600 mb-4 inline-block">
        ← Back to Sample
      </Link>
      <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 object-contain"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold text-pink-600">
            Rs. {product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SampleDetail;
