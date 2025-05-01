import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners"; // Use PropagateLoader
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Logging out...");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate the logout process with a 3-second delay
    setTimeout(() => {
      localStorage.removeItem("auth_token"); // Remove auth token from local storage
      setLoading(false); // Stop loading
      setMessage("You have been logged out!"); // Update the message after logout

      // Redirect to the home page after displaying the message for 2 seconds
      setTimeout(() => {
        navigate("/"); // Navigate to the home page
      }, 2000);
    }, 3000); // Simulate the logout process with a 3-second delay
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Display loading spinner and message while logging out */}
      {loading ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <PropagateLoader color="#36d7b7" size={15} /> {/* Spinner */}
          <p className="text-xl text-gray-700">{message}</p>{" "}
          {/* Message during loading */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Final message after logout */}
          <h2 className="text-3xl text-green-600 font-semibold mb-4">
            {message}
          </h2>
          <p className="text-lg text-gray-500">
            You will be redirected shortly...
          </p>
        </div>
      )}
    </div>
  );
};

export default Logout;
