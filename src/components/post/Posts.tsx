import { Link } from "react-router-dom";
import { MdSend } from "react-icons/md";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
  // CardDescription,
} from "@/components/ui/card";
import usePost from "./hooks/usePost";
import { ChangeEvent, useRef, useState } from "react";
// import { Post } from "@/utils/types";
import { Button } from "../ui/button";
import { Post } from "@/utils/types";
import { Loader2 } from "lucide-react";

const Posts = () => {
  const { posts, createPost, loading } = usePost();

  //get the current logged in user
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: "",
    content: "",
  });
  const handleInputChange =
    (field: keyof typeof newPost) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNewPost({ ...newPost, [field]: e.target.value });
    };

  const handleSubmit = async (e) => {
    console.log(newPost);
    // const newPost = {
    //   title: postTitle.current,
    //   content: postContent.current,
    // };
    // createPost(newPost, username);
  };

  return (
    <div className="p-4">
      {/* Card Form */}
      <div className="mb-6">
        <Card className="w-full bg-white shadow-lg rounded">
          <CardHeader className="mb-4">
            <input
              type="text"
              name="title"
              className="bg-gray-100 w-full h-10 px-4 rounded border border-gray-300 focus:ring-1 focus:ring-[#22331D] focus:outline-none"
              placeholder="Enter a title (e.g., Framework BS)"
              onChange={handleInputChange("title")}
            />
          </CardHeader>
          <CardContent className="mb-4">
            <form
              action=""
              method="post"
              onSubmit={handleSubmit}
              className="w-full"
            >
              <textarea
                className="bg-gray-100 w-full px-4 py-2 rounded border border-gray-300 focus:ring-1 focus:ring-[#22331D] focus:outline-none resize-none"
                name="content"
                id="content"
                rows={5}
                placeholder="Write something..."
                onChange={handleInputChange("content")}
              ></textarea>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end bg-gray-100 h-fit">
            <Button
              type="submit"
              className="bg-[#f65a11] hover:bg-[#22331D] text-white px-4 py-2 rounded flex items-center gap-x-2 shadow-md mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <div className="flex gap-x-2 items-center">
                  <MdSend size={20} />
                  <span>Save</span>
                </div>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="bg-white shadow-lg rounded p-4 hover:shadow-xl transition duration-300"
          >
            <CardTitle className="text-lg font-semibold mb-2">
              {post.title}
            </CardTitle>
            <CardContent className="text-gray-600 mb-4">
              {post.content}
            </CardContent>
            <Link
              to={`/posts/${post.id}`}
              className="text-blue-500 hover:underline text-sm"
            >
              View Details
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Posts;
