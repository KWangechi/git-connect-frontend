// import { Link } from "react-router-dom";
// import { MdSend } from "react-icons/md";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardHeader,
  // CardFooter,
  // CardTitle,
  // CardDescription,
} from "@/components/ui/card";
import usePost from "./hooks/usePost";
// import { ChangeEvent, FormEvent, useMemo, useState } from "react";
// import { Post } from "@/utils/types";
// import { Button } from "../ui/button";
// import { Post } from "@/utils/types";
import { Loader2 } from "lucide-react";
import { convertToDateString, formattedTime } from "@/utils/formateDate";
// import { appUrl } from "@/utils/axios";

const Posts = () => {
  const { posts, loading, createPost } = usePost();

  // get currently logged in user
  // const user = JSON.parse(localStorage.getItem("user"));
  // const username = user.username;

  // //get the current logged in user
  // const [newPost, setNewPost] = useState<Partial<Post>>({
  //   title: "",
  //   content: "",
  // });

  // const handleInputChange =
  //   (field: keyof typeof newPost) =>
  //   (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //     setNewPost({ ...newPost, [field]: e.target.value });
  //   };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   await createPost(newPost, username);

  //   // if successful, clear the form
  //   setNewPost({ title: "", content: "" });
  // };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Recent Posts</h2>
        <p className="text-gray-500 text-sm">
          Here are some of our most recent blog posts.
        </p>
      </div>

      {/* Card Form */}
      {/* <div className="mb-6">
        <Card className="w-full bg-white shadow-lg rounded">
          <div className="mb-4 px-7 py-4">
            <span className="font-semibold">New Post</span>
          </div>
          <CardContent className="flex flex-col">
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

              <CardFooter className="flex justify-end h-14">
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
      </div> */}

      {/* Posts Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="text-gray-300 animate-spin" size={"34px"} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
          {posts.map((post) => (
            <Card
              key={post._id}
              className="bg-white shadow-lg rounded p-4 hover:shadow-xl transition duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-x-4">
                {/* Username */}
                <div className="text-gray-500 text-sm font-medium">
                  <img
                    src={
                      "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"
                    }
                    className="h-16 w-16 rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>

                <div className="flex flex-col gap-y-1 ">
                  <span className="font-bold">{post.createdBy.username}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-y-2">
                {/* Title */}
                <div className="text-lg italic font-semibold">{post.title}</div>

                {/* Content */}
                <div className="text-gray-600 mb-4 text-sm">{post.content}</div>

                {/* Date Time */}
                <div className="mt-1 ">
                  {/* Date */}
                  <span className="text-gray-400 text-xs">
                    {convertToDateString(post.createdAt)}
                    {", "}
                    {formattedTime(post.createdAt)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
