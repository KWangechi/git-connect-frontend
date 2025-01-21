import { useMemo, useState } from "react";
import { Developer, Post } from "@/utils/types";
import { api } from "@/utils/axios";
import { useToast } from "./use-toast";

function useDeveloper() {
  const [developers, setDevelopers] = useState<Developer[] | []>([]);
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userPosts, setUserPosts] = useState<Partial<Post[]> | []>([]);

  const { toast } = useToast();

  useMemo(() => {
    const getDevelopers = async () => {
      try {
        setLoading(true);

        const { data } = await api.get("/developers");

        if (data.status.code === 200) {
          setDevelopers(data.data);
        }
      } catch (error: unknown) {
        toast({
          description:
            error instanceof Error ? error.message : "Error Occurred",
          duration: 2000,
        });
      }
      setLoading(false);
    };

    getDevelopers();
  }, [toast]);

  const fetchUserProfile = async (username: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/developers/${username}/profile`);

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

  const searchDeveloper = async (searchTerm: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/developers/search`, {
        params: {
          searchTerm,
        },
      });

      if (data.status.code === 200) {
        setDevelopers(data.data);
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

  // fetch user posts
  const fetchUserPosts = async (username: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/developers/${username}/posts`);
      if (data.status.code === 200) {
        setUserPosts(data.data);
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
      setLoading(false);
    }
  };

  return {
    developers,
    developer,
    loading,
    fetchUserProfile,
    searchDeveloper,
    updateUserProfile,
    deleteUserProfile,
    // posts
    fetchUserPosts,
    userPosts,
  };
}

export default useDeveloper;
