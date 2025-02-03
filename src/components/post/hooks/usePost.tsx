import { useEffect, useState } from "react";
import { Post, PostComment } from "@/utils/types";
import { api } from "@/utils/axios";
import { useToast } from "@/hooks/use-toast";
// import { useNavigate } from "react-router-dom";

function usePost() {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [post, setPost] = useState<Post>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [addingComment, setAddingComment] = useState<boolean>(false);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false);

  // const [loadingPosts, setLoadingPosts] = useState<boolean>(false)

  const [postComments, setPostComments] = useState<PostComment[]>([]);

  // const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);
    try {
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

  const fetchPost = async (id: string | undefined) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/posts/${id}`);

      if (data.status.code === 200) {
        setPost(data.data);
        // setLoading(false);
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

  /**
   * Toggle the like status of a post and avoid making a request to the backend
   * @param id
   */
  const toggleLikeStatus = async (id: string | undefined) => {
    // Optimistically update the frontend

    try {
      const response = await api.post(`/posts/${id}/toggleLikePost`);

      if (response.data.status.code === 200) {
        toast({
          description: response.data.status.message,
          duration: 2000,
        });
        setLoading(false);
        await fetchPost(id);
      }
    } catch (error: unknown) {
      toast({
        description: error instanceof Error ? error.message : "Error Occurred",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  const fetchPostComments = async (id: string | undefined) => {
    setCommentsLoading(true);
    // TODO: Implement comment functionality here
    // Example:
    const response = await api.get(`/posts/${id}/comments`);

    if (response.data.status.code === 200) {
      setPostComments(response.data.data); // Placeholder return value for demonstration purposes. Replace with actual implementation.
      setCommentsLoading(false);
    }
    // return comments.data.data;
  };

  const postComment = async (
    id: string | undefined,
    newComment: Record<string, string>
  ) => {
    setAddingComment(true);
    const response = await api.post(`/posts/${id}/comments`, newComment);

    if (response.data.status.code === 201) {
      toast({
        description: response.data.status.message,
        duration: 2000,
      });
      setAddingComment(false);
      await fetchPostComments(id);
    }
  };

  const updatePostComment = async (
    id: string | undefined,
    commentId: string | undefined,
    newComment: Record<string, string>
  ) => {
    setAddingComment(true);
    const response = await api.patch(
      `/posts/${id}/comments/${commentId}`,
      newComment
    );

    if (response.data.status.code === 200) {
      toast({
        description: response.data.status.message,
        duration: 2000,
      });
      setAddingComment(false);
      await fetchPostComments(id);
    }
  };

  const deletePostComment = async (
    id: string | undefined,
    commentId: string | undefined
  ) => {
    const response = await api.delete(`/posts/${id}/comments/${commentId}`);
    if (response.data.status.code === 200) {
      toast({
        description: response.data.status.message,
        duration: 2000,
      });
      await fetchPostComments(id);
    }
  };

  return {
    posts,
    post,
    loading,
    fetchPost,
    createPost,
    toggleLikeStatus,
    postComment,
    fetchPostComments,
    deletePostComment,
    postComments,
    updatePostComment,
    addingComment,
    commentsLoading,
  };
}

export default usePost;
