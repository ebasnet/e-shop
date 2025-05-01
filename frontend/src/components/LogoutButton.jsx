import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const LogoutButton = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggingOut(true);
    setLogoutMessage("Logging out... Please wait.");

    // Show the loading overlay
    setTimeout(() => {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("loggedInUser");
      setLogoutMessage("You have been logged out. Redirecting to homepage...");

      // Wait for a short delay before redirecting
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000); // Small delay before redirect
    }, 2000); // Wait for 2 seconds before logging out
  };

  return (
    <div>
      <p
        onClick={handleLogout}
        className="cursor-pointer hover:text-black flex items-center gap-2"
      >
        {loggingOut ? <PropagateLoader color="#ffff" size={0} /> : "Logout"}
      </p>

      {loggingOut && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 text-white">
          <div className="flex flex-col items-center">
            <PropagateLoader color="#36d7b7" size={30} />
            <p className="mt-4 text-lg">{logoutMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
