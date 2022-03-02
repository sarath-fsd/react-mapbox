import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

/**
 * Global Context provider to maintain the state across the app.   This is a small app, it doesn't required third party state management libraries like redux. 
 */
export const GlobalContextProvider = ({ children }) => {
  // Hamburger Menu added in the app to show the links to the other pages in the app.
  const [showMenu, setShowMenu] = useState(true);  
  return (
    <GlobalContext.Provider value={{ showMenu, setShowMenu }}>
      {children}
    </GlobalContext.Provider>
  );
};
