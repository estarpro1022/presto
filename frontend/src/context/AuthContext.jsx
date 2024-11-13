import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("userToken") || null);

  const saveToken = (newToken) => {
    localStorage.setItem("userToken", newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem("userToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};
