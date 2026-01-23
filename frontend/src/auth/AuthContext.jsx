import { createContext, useContext, useEffect, useState } from "react";

// creates shared storage
const AuthContext = createContext(null);

// stores the state of login, so that every other component can excess the information
// the children is the hole application, so every component can excess the informations
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (userFromApi) => {
    setUser(userFromApi);
    localStorage.setItem("user", JSON.stringify(userFromApi));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
