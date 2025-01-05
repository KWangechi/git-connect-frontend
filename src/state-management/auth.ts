import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/utils/axios"; // Axios instance
import { LoginCredentials, User } from "@/utils/types"; // Define your User type accordingly

function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate();

  // Fetch user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const isAuthenticated = localStorage.getItem("accessToken") ? true : false;

    if (savedUser && isAuthenticated) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    } 
  }, []);

  // Login function
  const login = async (user: LoginCredentials) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", user);
      if (data.status.code === 200) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(data.data.user));

        setIsAuthenticated(true);
        setUser(data.data.user);
        alert("Success!");
        navigate("/");
      } else {
        alert(data.status.message);
      }
    } catch (error) {
      alert(error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const registerUser = async (newUser: User) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", newUser);
      if (data.status.code === 201) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(data.status.message);
      }
    } catch (error) {
      alert(error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const response = await api.post("/auth/logout");
      if (response.data.status.code === 200) {
        alert("Success!");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
        navigate("/login");
      } else {
        alert(response.data.status.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return { user, isAuthenticated, loading, login, logout, registerUser };
}

export default useAuth;
