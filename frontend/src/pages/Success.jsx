import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const Success = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Show the success message after 3 seconds
    }, 3000);

    setTimeout(() => {
      navigate("/orders");
    }, 4500);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <>
          <PropagateLoader color="#36d7b7" />
        </>
      ) : (
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Order Successful!
          </h2>
          <p>Your order has been successfully placed.</p>
        </div>
      )}
    </div>
  );
};

export default Success;
