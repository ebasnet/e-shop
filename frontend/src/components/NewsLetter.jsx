import React, { useState } from "react";

const NewsLetter = () => {
  const [subscribed, setSubscribed] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-700">
        {subscribed ? "Thanks for subscribing!" : "Subscribe Now & Get 20% Off"}
      </p>

      <p className="text-gray-500 mt-3 text-sm sm:text-base">
        {subscribed
          ? "You're now signed up to receive exclusive updates, offers, and more straight to your inbox."
          : "Be the first to know about new arrivals, special deals, and the latest trends. Join our newsletter today!"}
      </p>

      {!subscribed && (
        <form
          onSubmit={onSubmitHandler}
          className="w-full flex sm:w-1/2 items-center gap-3 mx-auto my-6 border pl-3"
        >
          <input
            className="w-full flex-1 outline-none"
            type="email"
            placeholder="Enter Your Email"
            required
          />
          <button
            className="bg-black text-white text-xs px-10 py-4"
            type="submit"
          >
            SUBSCRIBE
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsLetter;
