/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";

import Title from "./Title";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const products = useSelector((state) => state.shop.products);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, []);

  return (
    <div className="my-10 ">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs md:text-base text-gray-600 sm:text-sm">
          Our New Latest Item in our collection for your fashion.
        </p>
      </div>

      {/* render products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
