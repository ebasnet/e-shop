import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div>
          <img src={assets.logo} className="mb-5 w-32 rounded-full shadow-lg" />
          <p className="w-full md:w-2/3 text-gray-600">
            E-shop is your one-stop destination for quality products and smooth
            shopping experience. We offer fast delivery, reliable service, and a
            growing selection of items to meet all your needs. Shop with
            confidence and convenience, anytime.
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
