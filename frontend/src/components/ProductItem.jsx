import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductItem = ({ id, image, name, price }) => {
  const currency = useSelector((state) => state.shop.currency);

  return (
    <Link className="cursor-pointer text-gray-700" to={`/product/${id}`}>
      <div className="overflow-hidden w-full aspect-[3/4]">
        <img
          className="object-cover w-full h-full hover:scale-110 transition-transform duration-300 ease-in-out"
          src={image[0]}
          alt={name}
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
