// GoogleLogin.js
import React, { useState } from "react";
import { auth, provider, signInWithPopup } from "./firebase";

const GoogleLogin = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // You get user's email, displayName, photoURL etc.
      console.log("User signed in:", result.user);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {user ? (
        <div className="text-center">
          <img src={user.photoURL} alt="User" className="w-20 rounded-full" />
          <p>Welcome, {user.displayName}</p>
          <p>{user.email}</p>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default GoogleLogin;
