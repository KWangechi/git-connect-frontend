import { useEffect, useState } from "react";
import { Developer, Post } from "@/utils/types";
import { api } from "@/utils/axios";
import { useToast } from "./use-toast";

function useDeveloper() {
  const [developers, setDevelopers] = useState<Developer[] | []>([]);
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userPosts, setUserPosts] = useState<Post[] | []>([]);

  const { toast } = useToast();

  useEffect(() => {
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
        console.log("Data fetced: ", data.data);
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

  const updateUserPost = async (updatedPost: Post, username: string) => {
    setUserPosts([]);
    setLoading(true);
    try {
      const { data } = await api.patch(
        `/developers/${username}/posts/${updatedPost?._id}`,
        updatedPost
      );
      if (data.status.code === 200) {
        toast({
          description: "Post updated!",
          duration: 2000,
        });

        await fetchUserPosts(username);
        // setUserPosts([...data.data]);
        setLoading(false);
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

  const deleteUserPost = async (
    username: string | undefined,
    postId: string | undefined
  ) => {
    if (!postId) {
      throw new Error("Post ID is required");
    }

    if (!username) {
      throw new Error("Username is required");
    }

    setLoading(true);
    try {
      const { data } = await api.delete(
        `/developers/${username}/posts/${postId}`
      );
      if (data.status.code === 204) {
        toast({
          description: data.status.message,
          duration: 2000,
        });
        setLoading(false);
        // navigate("/posts");
        setUserPosts((prevPosts) =>
          prevPosts.filter((post) => post?._id !== postId)
        );

        // await fetchUserPosts(username);
      } else {
        toast({
          description: data.status.message ?? "Error Occurred",
          duration: 2000,
        });
        // setLoading(false);
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
    updateUserPost,
    deleteUserPost,
  };
}

export default useDeveloper;
