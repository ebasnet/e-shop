import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-10">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to our e-commerce store! We are dedicated to providing the
            best online shopping experience for our customers. Whether you're
            looking for the latest fashion trends, electronics, or home goods,
            we have everything you need in one place.
          </p>
          <p>
            At our store, we believe in offering high-quality products at
            competitive prices. Our team works hard to curate a diverse range of
            items to ensure there’s something for everyone. Whether you're a
            trendsetter or a tech enthusiast, we have you covered!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to make shopping easy, convenient, and affordable for
            everyone. With fast shipping, excellent customer service, and a wide
            range of products, we aim to meet your needs and exceed your
            expectations. Thank you for choosing us!
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            We ensure that every product we offer meets the highest quality
            standards. Our rigorous quality control processes guarantee that you
            receive only the best items, tested for durability, performance, and
            value. Shop with confidence knowing that our products are built to
            last.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            Shopping with us is simple and hassle-free. With easy navigation,
            secure payment options, and fast delivery services, we make online
            shopping as convenient as possible. Plus, with our user-friendly
            mobile app and website, you can shop anytime, anywhere.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our dedicated customer service team is here to assist you every step
            of the way. Whether you have questions about a product, need help
            with an order, or require assistance with returns, we are always
            just a message or call away. We aim to provide a seamless and
            friendly experience for all our customers.
          </p>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default About;
