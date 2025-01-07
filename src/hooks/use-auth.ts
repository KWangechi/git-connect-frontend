import { useContext, useState } from "react";
import { api } from "@/utils/axios"; // Axios instance
import { LoginCredentials, User } from "@/utils/types"; // Define your User type accordingly
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/components/context/AuthContext";

function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser, setToken, setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  // Login function
  const login = async (user: LoginCredentials) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", user);
      if (data.status.code === 200) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(data.data.user));

        setUser(data.data.user);
        setToken(data.data.accessToken);
        setIsAuthenticated(true);

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
        setUser(null);
        setToken(null);
        navigate("/login");
      } else {
        alert(response.data.status.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return { loading, login, logout, registerUser };
}

export default useAuth;
