import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("collabify_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(userData, token) {
    localStorage.setItem("collabify_token", token);
    localStorage.setItem("collabify_user", JSON.stringify(userData));
    setUser(userData);
  }

 function updateUser(updatedFields) {
    const newUser = { ...user, ...updatedFields };
    localStorage.setItem("collabify_user", JSON.stringify(newUser));
    setUser(newUser);
  }

  function logout() {
    localStorage.removeItem("collabify_token");
    localStorage.removeItem("collabify_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}