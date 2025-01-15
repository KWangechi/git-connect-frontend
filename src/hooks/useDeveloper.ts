import { useEffect, useState } from "react";
import { Developer } from "@/utils/types";
import { api } from "@/utils/axios";
import { useToast } from "./use-toast";

function useDeveloper() {
  const [developers, setDevelopers] = useState<Developer[] | []>([]);
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const getDevelopers = async () => {
    try {
      setLoading(true);

      // Simulating delay for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const { data } = await api.get("/developers");

      if (data.status.code === 200) {
        setDevelopers(data.data);
        setDeveloper(data.data[0]);
      }
    } catch (error: unknown) {
      toast({
        description: error instanceof Error ? error.message : "Error Occurred",
        duration: 2000,
      });
    }
  };

  // fetch developers when this hook is called the first time
  useEffect(() => {
    getDevelopers();
  }, []);

  const fetchUserProfile = async (username: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/${username}/profile`);

      if (data.status.code === 200) {
        setDeveloper(data.data);
      } else {
        toast({
          description: data.status.message ?? "Error Occurred",
          duration: 2000,
        });
      }
      setLoading(false);
    } catch (error: unknown) {
      toast({
        description: error instanceof Error ? error.message : "Error Occurred",
        duration: 2000,
      });
    }
  };

  const updateUserProfile = async (updatedDeveloper: Developer) => {
    setLoading(true);
    try {
      const { data } = await api.put(
        `/developers/${updatedDeveloper.username}`,
        updatedDeveloper
      );
      if (data.status.code === 200) {
        toast({
          description: "Profile updated successfully!",
          duration: 2000,
        });
        setDeveloper(updatedDeveloper);
      } else {
        toast({
          description: data.status.message ?? "Error Occurred",
          duration: 2000,
        });
      }
      setLoading(false);
    } catch (error: unknown) {
      toast({
        description: error instanceof Error ? error.message : "Error Occurred",
        duration: 2000,
      });
    }
  };

  const deleteUserProfile = async (username: string) => {
    setLoading(true);
    try {
      const { data } = await api.delete(`/developers/${username}`);
      if (data.status.code === 204) {
        toast({
          description: "Profile deleted successfully!",
          duration: 2000,
        });
      } else {
        toast({
          description: data.status.message ?? "Error Occurred",
          duration: 2000,
        });
      }
      setLoading(false);
    } catch (error: unknown) {
      toast({
        description: error instanceof Error ? error.message : "Error Occurred",
        duration: 2000,
      });
    }
    setLoading(false);
  };

  return {
    getDevelopers,
    developers,
    developer,
    loading,
    fetchUserProfile,
    updateUserProfile,
    deleteUserProfile,
  };
}

export default useDeveloper;
