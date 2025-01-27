// import { Link } from "react-router-dom";
import { MdSend } from "react-icons/md";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardHeader,
  CardFooter,
  // CardTitle,
  // CardDescription,
} from "@/components/ui/card";
import usePost from "./hooks/usePost";
import { ChangeEvent, FormEvent, useState } from "react";
import { Post as UserPost } from "@/utils/types";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
// import { MdOpenInNew } from "react-icons/md";
// import { convertToDateString, formattedTime } from "@/utils/formateDate";
// import { useNavigate } from "react-router-dom";
import Post from "./Post";
// import { appUrl } from "@/utils/axios";

const Posts = () => {
  const { posts, loading, createPost } = usePost();

  // const navigate = useNavigate();

  // get currently logged in user
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUsername = currentUser.username;

  // //get the current logged in user
  const [newPost, setNewPost] = useState<Partial<UserPost>>({
    title: "",
    content: "",
  });

  const handleInputChange =
    (field: keyof typeof newPost) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNewPost({ ...newPost, [field]: e.target.value });
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createPost(newPost, currentUsername);

    // if successful, clear the form
    setNewPost({ title: "", content: "" });
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Recent Posts</h2>
        <p className="text-gray-500 text-sm">
          Here are some of our most recent blog posts.
        </p>
      </div>

      {/* Card Form */}
      <div className="mb-6">
        <Card className="w-full bg-white shadow-lg rounded">
          <CardContent className="flex flex-col mt-7 ">
            <form
              action=""
              method="post"
              onSubmit={(e) => handleSubmit(e)}
              className="w-full flex flex-col gap-y-5 mx-1"
            >
              <div>
                <input
                  type="text"
                  name="title"
                  value={newPost.title}
                  className="bg-gray-100 w-full h-10 px-4 rounded border border-gray-300 focus:ring-1 focus:ring-[#22331D] focus:outline-none"
                  placeholder="Enter a title (e.g., Framework BS)"
                  onChange={handleInputChange("title")}
                />
              </div>

              <div>
                <textarea
                  className="bg-gray-100 w-full px-4 py-2 rounded border border-gray-300 focus:ring-1 focus:ring-[#22331D] focus:outline-none"
                  name="content"
                  id="content"
                  value={newPost.content}
                  rows={5}
                  placeholder="Write something..."
                  onChange={handleInputChange("content")}
                ></textarea>
              </div>

              <CardFooter className="flex justify-end h-8">
                <Button
                  type="submit"
                  className="bg-[#f65a11] hover:bg-[#22331D] text-white px-4 py-2 rounded flex items-center gap-x-2 shadow-md mt-6"
                >
                  {loading ? (
                    <Loader2 className=" animate-spin" />
                  ) : (
                    <div className="flex gap-x-2 items-center">
                      <MdSend size={20} />
                      <span>Save</span>
                    </div>
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Loader2 className="text-black animate-spin" size={"34px"} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
          {posts.map((post) => (
            <Post post={post} key={post._id} showOpenInNewButton={true}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
