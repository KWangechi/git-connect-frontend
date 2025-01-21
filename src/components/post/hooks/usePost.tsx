import { useEffect, useState } from "react";
import { Post } from "@/utils/types";
import { api } from "@/utils/axios";
import { useToast } from "@/hooks/use-toast";

function usePost() {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/posts");

      if (data.status.code === 200) {
        setPosts(data.data);
        setLoading(false);
      }
    } catch (error: unknown) {
      toast({
        description: error instanceof Error ? error.message : "Error Occurred",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  const fetchPost = async (postId: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/posts/${postId}`);

      if (data.status.code === 200) {
        setPost(data.data);
        setLoading(false);
        await getPosts();
      } else {
        toast({
          description: data.status.message ?? "Error Occurred",
          duration: 2000,
        });
        setLoading(false);
      }
      // setLoading(false);
    } catch (error: unknown) {
      toast({
        description: error instanceof Error ? error.message : "Error Occurred",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  const createPost = async (newPost: Partial<Post>, username: string) => {
    setLoading(true);
    try {
      const { data } = await api.post(`/developers/${username}/posts`, newPost);
      if (data.status.code === 201) {
        toast({
          description: data.status.message,
          duration: 2000,
        });
        setLoading(false);
        await getPosts();
      } else {
        toast({
          description: data.status.message ?? "Error Occurred",
          duration: 2000,
        });
        setLoading(false);
      }
    } catch (error: unknown) {
      toast({
        description: error instanceof Error ? error.message : "Error Occurred",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  const updatePost = async (updatedPost: Post, username: string) => {
    setLoading(true);
    try {
      const { data } = await api.put(
        `/developers/${username}/posts/${updatedPost?._id}`,
        updatedPost
      );
      if (data.status.code === 200) {
        toast({
          description: "Profile updated successfully!",
          duration: 2000,
        });
        setPost(data.data);
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

  const deletePost = async (username: string) => {
    setLoading(true);
    try {
      const { data } = await api.delete(`/developers/${username}/posts`);
      if (data.status.code === 204) {
        toast({
          description: "Post deleted successfully!",
          duration: 2000,
        });
        setLoading(false);
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
    posts,
    post,
    loading,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
  };
}

export default usePost;
