import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div>
          <img src={assets.logo} className="mb-5 w-32 rounded-full shadow-lg" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur
            consequatur voluptatibus natus eligendi corrupti suscipit officiis
            deleniti, consectetur enim voluptate ratione nostrum nihil quas unde
            ullam dolores perspiciatis, quidem praesentium?
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Delivery</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5"> GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+977 986576587</li>
            <li>contact@eshop.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center ">
          &copy; 2025 E-shop.com - All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
