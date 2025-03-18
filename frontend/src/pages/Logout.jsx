import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Logging out...");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("auth_token");
      setLoading(false);
      setMessage("You have been logged out!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 3000);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <div className="flex flex-col items-center">
          <RingLoader color="#36d7b7" />
          <h2 className="text-2xl mt-4">{message}</h2>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl  prata-regular font-semibold mb-4 text-center">
            {message}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Logout;
