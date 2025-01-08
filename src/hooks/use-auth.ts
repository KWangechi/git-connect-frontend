import { useContext, useState } from "react";
import { api } from "@/utils/axios"; // Axios instance
import { LoginCredentials, User } from "@/utils/types"; // Define your User type accordingly
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/components/context/AuthContext";
import { useToast } from "./use-toast";

function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser, setToken, setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();
  const { toast } = useToast();

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

        toast({
          description: "Success",
        });
        navigate("/");
      } else {
        toast({
          description: data.status.message,
        });
      }
    } catch (error: unknown) {
      toast({
        description: error instanceof Error ? error.message : "Error Occurred",
      });
      setLoading(false);
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
        toast({
          description: "Success",
        });
        navigate("/login");
      } else {
        toast({
          description: data.status.message,
        });

        setLoading(false);
      }
    } catch (error) {
      toast({
        description: error instanceof Error ? error.message : "Error Occurred",
      });
      setLoading(false);
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
