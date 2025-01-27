import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePost from "./hooks/usePost";
import { Card } from "../ui/card";
import { Loader2 } from "lucide-react";
// import { convertToDateString, formattedTime } from "@/utils/formateDate";
// import { MdOutlineMoreVert } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
import { Button } from "../ui/button";
import { MdSend } from "react-icons/md";
// import { convertToDateString, formattedTime } from "@/utils/formateDate";

const ViewPost = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState({ content: "" });
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  //   const [moreSettings, setMoreSettings] = useState<boolean>(false);
  //   const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const {
    fetchPost,
    post,
    loading,
    addingComment,
    toggleLikeStatus,
    postComment,
    fetchPostComments,
    postComments,
    commentsLoading,
  } = usePost();

  useEffect(() => {
    function getPost() {
      fetchPost(id);
      fetchPostComments(id);
    }

    getPost();
  }, []);

  const handleLike = (postId: string | undefined) => {
    toggleLikeStatus(postId);
  };

  const handleInputChange =
    (field: keyof typeof newComment) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNewComment({ ...newComment, [field]: e.target.value });
    };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    postId: string | undefined
  ) => {
    e.preventDefault();
    console.log(newComment);
    await postComment(postId, newComment);
    // if successful, clear the form
    setNewComment({ content: "" });
  };

  //   const handleEditButtonClicked = (postId: string | undefined) => {
  //     setEditModalOpen(true);
  //   };

  //   const handleDeleteButtonClicked = (postId: string | undefined) => {
  //     deletePost(postId);
  //   };

  return (
    <div className="mt-2">
      {loading ? (
        <div className="flex justify-center align-middle">
          <Loader2 size={32} className="animate-spin" />
        </div>
      ) : (
        <Card
          key={post?._id}
          className="bg-white shadow-lg rounded-xl p-4 my-4 hover:shadow-xl transition duration-300"
        >
          <div className="flex justify-between items-center gap-x-4">
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
                <span className="font-bold">{post?.createdBy.username}</span>
              </div>
            </div>

            {/* <div
              className="flex items-center"
              onClick={() => setMoreSettings(true)}
            >
              <MdOutlineMoreVert size={30} />
            </div> */}

            {/* {moreSettings && (
              <menu className="bg-gray-800 rounded py-4 px-6 absolute top-14 right-8 cursor-pointer">
                <div
                  className="text-white hover:text-gray-600 flex gap-x-2 items-center pb-3 "
                //   onClick={() => handleEditButtonClicked(post?._id)}
                >
                  <Edit size={14}></Edit>
                  <span>Edit</span>
                </div>
                <div
                  className="text-white hover:text-gray-600 flex gap-x-2 items-center"
                  onClick={() => handleDeleteButtonClicked(post?._id)}
                >
                  <Trash size={14}></Trash>
                  <span>Delete</span>
                </div>
              </menu>
            )} */}
          </div>

          <div className="mt-4 flex flex-col gap-y-2">
            {/* Title */}
            <div className="text-lg italic font-semibold">{post?.title}</div>

            {/* Content */}
            <div className="text-gray-600 mb-4 text-sm">{post?.content}</div>

            {/* Date Time */}
            <div className="mt-1 ">
              {/* Date */}
              {/* <span className="text-gray-400 text-xs">
                {convertToDateString(new Date(post?.createdAt))}
                {", "}
                {formattedTime(post?.createdAt)}
              </span> */}
            </div>
          </div>

          {/* Date time and buttons */}
          <div className="flex justify-between items-center mt-1 ">
            {/* Date */}
            {/* <div>
              <span className="text-gray-400 text-xs">
                {convertToDateString(post?.createdAt)}
                {", "}
                {formattedTime(post?.createdAt)}
              </span>
            </div> */}

            <div className="flex gap-x-2">
              <div className="bg-gray-50 flex gap-x-2 px-2 py-1 rounded items-center">
                <FaRegCommentDots size={"18px"} />
                <span className="font-bold">0</span>
              </div>

              <div
                className="bg-gray-100 flex gap-x-2 px-2 py-1 rounded items-center cursor-pointer"
                onClick={() => handleLike(post?._id)}
              >
                <BiLike
                  size={"18px"}
                  className={`${
                    post?.likes && post?.likes > 0 ? "text-yellow-500" : ""
                  }`}
                />
                <span className="font-bold">{post?.likes}</span>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          {/* Comments */}
          <div className="flex flex-col border-b-gray-600 my-4">
            <div className="mb-5 flex justify-between items-center">
              <span className="text-lg font-bold">Comments</span>
              <div>
                <Button
                  className="bg-[#f65a11] hover:bg-gray-300 text-white px-4 py-2 rounded flex items-center gap-x-2 shadow-md"
                  onClick={() => setCreateModalOpen((prevState) => !prevState)}
                >
                  <FaRegCommentDots size={"18px"} />
                  Add Comment
                </Button>
              </div>
            </div>

            {createModalOpen && (
              <div className="mb-6 mt-2">
                <form
                  action=""
                  method="post"
                  onSubmit={(e) => {
                    handleSubmit(e, post?._id);
                  }}
                >
                  <textarea
                    className="bg-gray-100 w-full px-4 py-2 rounded border border-gray-300 focus:ring-1 focus:ring-[#22331D] focus:outline-none"
                    name="content"
                    id="content"
                    value={newComment.content}
                    placeholder="Write something..."
                    onChange={handleInputChange("content")}
                  ></textarea>
                  <div className="flex justify-start">
                    <button
                      type="submit"
                      className="bg-[#22331D] hover:bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-x-2 shadow-md mt-3"
                    >
                      {addingComment ? (
                        <Loader2 className=" animate-spin" />
                      ) : (
                        <div className="flex gap-x-2 items-center">
                          <MdSend size={20} />
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="flex flex-col border-b-gray-600">
              {commentsLoading ? (
                <div className="flex justify-center align-middle">
                  <Loader2 size={32} className="animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col gap-y-10 mt-2">
                  {postComments.length > 0 ? (
                    postComments.map((comment) => (
                      <div
                        className="flex gap-x-2 items-start"
                        key={comment._id}
                      >
                        <img
                          src={
                            "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"
                          }
                          className="h-8 w-8 rounded-full object-cover border-4 border-white shadow-md"
                        />
                        <div className="flex flex-col gap-y-0 w-full">
                          <span className="text-gray-500 text-xs">
                            {comment?.commentedBy.username}
                          </span>
                          <span className="text-gray-600 text-sm">
                            {comment?.content}
                          </span>

                          <hr className="mt-4 mb-1 w-full" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center mt-4">
                      <p className="text-gray-500 text-sm">
                        No comments yet. Be the first to comment!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ViewPost;
