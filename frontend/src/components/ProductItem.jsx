import React from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductItem = ({ id, image, name, price }) => {
  const currency = useSelector((state) => state.shop.currency);
  return (
    <Link className="cursor-pointer text-gray-700" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
