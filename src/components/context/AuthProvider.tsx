import { User } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>("");

  /**
   * Fetch user from localStorage on mount but first check if the user exists
   * and if user has already been set, return early and update the localStorage
   */
  useEffect(() => {
    if (user) {
      // If user exists, update localStorage and return early to avoid unnecessary re-renders
      localStorage.setItem("user", JSON.stringify(user));
      return;
    }

    const savedUser = localStorage.getItem("user");
    const hasToken = localStorage.getItem("accessToken") ? true : false;

    if (savedUser && hasToken) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, [user]);

  if (loading) {
    // Show a fallback (like a spinner) while checking authentication
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
