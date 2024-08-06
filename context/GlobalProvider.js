// context/GlobalProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, logout } from "../lib/appwrite"; // Update the import path as necessary

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLogged(false);
      setUser(null);
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        handleLogout, // Expose the handleLogout function
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
