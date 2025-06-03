import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // or false

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
