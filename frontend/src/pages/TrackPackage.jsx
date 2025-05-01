import React from "react";

const TrackPackage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-4 text-center">
        Track Your Package
      </h1>

      <div className="border p-6 rounded-lg shadow-xl bg-white">
        <h2 className="text-2xl font-semibold mb-3">Order Status</h2>
        <p className="text-sm mb-4">
          Your order has been dispatched and is on the way!
        </p>
        <p className="text-sm mb-4">Expected Delivery Date: May 10, 2025</p>

        {/* Additional details */}
        <p className="text-sm mb-4">
          Tracking Number: <span className="font-semibold">123456789</span>
        </p>
        <p className="text-sm mb-4">
          Carrier: <span className="font-semibold">Aramex Express</span>
        </p>

        {/* Tracking Timeline with colorful line */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-3">Tracking Timeline:</h3>
          <div className="relative">
            <ul className="list-none pl-10">
              <li className="mb-4 flex items-center">
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-full"></div>
                <div className="ml-10">
                  <p className="text-sm font-medium">
                    May 1, 2025 - Package dispatched from warehouse
                  </p>
                </div>
              </li>
              <li className="mb-4 flex items-center">
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-full"></div>
                <div className="ml-10">
                  <p className="text-sm font-medium">
                    May 3, 2025 - Package is in transit
                  </p>
                </div>
              </li>
              <li className="mb-4 flex items-center">
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-full"></div>
                <div className="ml-10">
                  <p className="text-sm font-medium">
                    May 5, 2025 - Arrived at sorting facility
                  </p>
                </div>
              </li>
              <li className="mb-4 flex items-center">
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-full"></div>
                <div className="ml-10">
                  <p className="text-sm font-medium">
                    May 7, 2025 - Out for delivery
                  </p>
                </div>
              </li>
              <li className="mb-4 flex items-center">
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-full"></div>
                <div className="ml-10">
                  <p className="text-sm font-medium">
                    May 10, 2025 - Delivered
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackPackage;
