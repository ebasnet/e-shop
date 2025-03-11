import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const Product = () => {
  const { productId } = useParams();
  const products = useSelector((state) => state.shop.products);
  const currency = useSelector((state) => state.shop.currency);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const dispatch = useDispatch();

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size first!");
      return;
    }

    dispatch(
      addToCart({
        id: productData._id,
        name: productData.name,
        price: productData.price,
        image: productData.image[0],
        size: size,
      })
    );
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product content */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Image section */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal gap-2">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-30 h-20 object-cover rounded-md cursor-pointer border border-gray-300 hover:border-gray-500 transition-all duration-200"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* Description section */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-600" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product</p>
            <p>Cash on delivery is available in the displayed product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <b className="border px-5 py-3 text-sm">Reviews (122)</b>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            This premium product is crafted using high-quality materials to
            ensure durability and performance. Designed to meet modern lifestyle
            needs, it blends style with functionality.
          </p>
          <p>
            Whether you're buying it for yourself or as a gift, this item is
            sure to impress. Shop with confidence and enjoy fast delivery and
            easy returns.
          </p>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"> </div>
  );
};

export default Product;
