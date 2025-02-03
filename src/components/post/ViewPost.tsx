import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePost from "./hooks/usePost";
// import { Card } from "../ui/card";
import { Edit, Loader2, Trash } from "lucide-react";
// import { convertToDateString, formattedTime } from "@/utils/formateDate";
import { MdOutlineMoreVert } from "react-icons/md";
// import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
import { Button } from "../ui/button";
import { MdSend } from "react-icons/md";
import Post from "./Post";
import { PostComment } from "@/utils/types";
import DeleteConfirmationModal from "../app/DeleteConfirmationModal";
// import { convertToDateString, formattedTime } from "@/utils/formateDate";

const ViewPost = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState({ content: "" });
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  const [moreSettings, setMoreSettings] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<string | undefined>(undefined);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState<boolean>(false);

  const {
    fetchPost,
    post,
    loading,
    addingComment,
    postComment,
    updatePostComment,
    fetchPostComments,
    deletePostComment,
    postComments,
    commentsLoading,
  } = usePost();

  useEffect(() => {
    async function getPost() {
      await fetchPost(id);
      await fetchPostComments(id);
    }

    getPost();
  }, []);

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

    if (editMode) {
      console.log("I am editing the info here...");
      await updatePostComment(postId, commentId, newComment);
    } else {
      console.log("I am posting a comment...");
      await postComment(postId, newComment);
    }

    setEditMode(false);
    setCreateModalOpen(false);

    // if successful, clear the form
    setNewComment({ content: "" });
  };

  const handleEditButtonClicked = (oldComment: PostComment) => {
    setEditMode(true);
    setCommentId(oldComment?._id);
    setCreateModalOpen(true);
    setMoreSettings(false);

    // set the comment content into the form
    setNewComment({ content: oldComment.content });
  };

  const handleDeleteButtonClicked = async (postId: string | undefined) => {
    await deletePostComment(postId, commentId);
    setDeleteConfirmationModalOpen(false);
  };

  return (
    <div className="mt-2">
      {loading ? (
        <div className="flex justify-center align-middle">
          <Loader2 size={32} className="animate-spin" />
        </div>
      ) : (
        <div>
          <Post
            key={post?._id}
            post={post}
            // postPermissions={postPermissions}
          >
            <div className="mt-4">
              <hr />
              <div className="flex flex-col border-b-gray-600 my-4">
                <div className="mb-5 flex justify-between items-center">
                  <span className="text-lg font-bold">Comments</span>
                  <div>
                    <Button
                      className="bg-[#f65a11] hover:bg-gray-300 text-white px-4 py-2 rounded flex items-center gap-x-2 shadow-md"
                      onClick={() => {
                        setNewComment({ content: "" });
                        setCreateModalOpen((prevState) => !prevState);
                      }}
                    >
                      <FaRegCommentDots size={"18px"} />
                      Add Comment
                    </Button>
                  </div>
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
                            <div className="flex justify-between relative">
                              <span className="text-gray-500 text-xs">
                                {comment?.commentedBy.username}
                              </span>

                              <div
                                className="flex items-center"
                                onClick={() =>
                                  setMoreSettings((prevState) => !prevState)
                                }
                              >
                                <MdOutlineMoreVert size={30} />
                              </div>

                              {/* Setting Menu */}
                              {moreSettings && (
                                <menu className="bg-gray-800 rounded py-4 px-6 absolute top-8 right-4 cursor-pointer">
                                  <div
                                    className="text-white hover:text-gray-600 flex gap-x-2 items-center pb-3 "
                                    onClick={() =>
                                      handleEditButtonClicked(comment)
                                    }
                                  >
                                    <Edit size={14}></Edit>
                                    <span>Edit</span>
                                  </div>
                                  <div
                                    className="text-white hover:text-gray-600 flex gap-x-2 items-center"
                                    onClick={() => {
                                      setDeleteConfirmationModalOpen(true);
                                      setCommentId(comment._id);
                                    }}
                                  >
                                    <Trash size={14}></Trash>
                                    <span>Delete</span>
                                  </div>
                                </menu>
                              )}
                            </div>
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
          </Post>

          {deleteConfirmationModalOpen && (
            <DeleteConfirmationModal
              isOpen={deleteConfirmationModalOpen}
              onClose={() => setDeleteConfirmationModalOpen(false)}
              onConfirm={() => handleDeleteButtonClicked(post?._id)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ViewPost;
