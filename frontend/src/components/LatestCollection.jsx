/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, []);

  return (
    <div className="my-10 ">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs md:text-base text-gray-600 sm:text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum,
          dignissimos? Est praesentium possimus vero nesciunt eveniet numquam
          officia nihil. Repudiandae illo nemo praesentium accusamus possimus
          voluptatum distinctio error magnam nostrum.
        </p>
      </div>

      {/* render products */}
      <div className="grid grid-cols-2 sm:grid-col-3 md:grid-col-4 lg:grid-cols-5 gap-4 gap-y-6">
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
