import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Post as UserPost } from "@/utils/types";
import usePost from "./hooks/usePost";
import { convertToDateString, formattedTime } from "@/utils/formateDate";
import { FaRegCommentDots } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";
import { Edit, Loader2, MoreVertical, Trash } from "lucide-react";
import { MdOpenInNew } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useDeveloper from "@/hooks/useDeveloper";
// import { Dialog } from "@radix-ui/react-dialog";
// import {
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../ui/dialog";
// import { Button } from "../ui/button";
// import { createPortal } from "react-dom";

const Post = ({
  post,
  postPermissions,
  showOpenInNewButton,
  children,
}: {
  post: UserPost;
  postPermissions?: {
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canRead: boolean;
  };
  showOpenInNewButton?: boolean;
  children?: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const { toggleLikeStatus } = usePost();

  const { updateUserPost, deleteUserPost, loading } = useDeveloper();

  const { user: currentUser } = useContext(AuthContext);
  const username = currentUser?.username;

  const [updatedPost, setUpdatedPost] = useState<UserPost>(post);

  const handleLike = (postId: string | undefined) => {
    toggleLikeStatus(postId);
  };

  const goToProfile = (clickedUsername: string) => {
    navigate(`/developers/${clickedUsername}/profile`);
  };

  const handleEditButtonClicked = () => {
    setShowModal(true);
  };

  const handleDeleteButtonClicked = () => {
    setDeleteModal(true);
  };

  const handleDeletePost = async () => {
    await deleteUserPost(username, updatedPost?._id);
    setDeleteModal(false);
  };

  const handleOpenInNew = (postId: string | undefined) => {
    navigate(`/posts/${postId}`);
  };

  const handleSave = async (username: string) => {
    await updateUserPost(updatedPost, username);
    setShowModal(false);
    setMenuOpen(false);
  };

  return (
    <div>
      <Card
        key={post._id}
        className="bg-white shadow-lg rounded p-4 hover:shadow-xl transition duration-300"
      >
        <div className="flex items-center gap-x-4 justify-between">
          <div
            className="flex items-center gap-x-4 cursor-pointer"
            onClick={() => goToProfile(post.createdBy?.username)}
          >
            {/* Username */}
            <div className="text-gray-500 text-sm font-medium">
              <img
                src={
                  "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"
                }
                className="h-12 w-12 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            <div className="flex flex-col gap-y-1 ">
              <span className="font-bold">{post.createdBy?.username}</span>
            </div>
          </div>

          <div className="flex items-center gap-x-2 relative">
            {showOpenInNewButton && (
              <div
                onClick={() => handleOpenInNew(post?._id)}
                className="cursor-pointer"
              >
                <MdOpenInNew size={"20px"} />
              </div>
            )}

            {(postPermissions?.canEdit || postPermissions?.canDelete) && (
              <div
                onClick={() => setMenuOpen((prevState) => !prevState)}
                className="cursor-pointer"
              >
                <MoreVertical />
              </div>
            )}

            {menuOpen && (
              <menu className="bg-gray-200 rounded py-4 px-6 absolute top-10 right-2 cursor-pointer text-gray-900 flex flex-col gap-y-2">
                <div
                  className=" hover:text-gray-600 flex gap-x-2 items-center pb-3"
                  onClick={handleEditButtonClicked}
                >
                  <Edit size={14}></Edit>
                  <span>Edit</span>
                </div>

                {/* Modal Overlay */}
                {showModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    {/* Modal Content */}
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                      {/* Modal Header */}
                      <div className="flex justify-between items-center border-b pb-3">
                        <h2 className="text-lg font-semibold">Edit Post</h2>
                        <button
                          className="text-gray-600 hover:text-gray-800"
                          onClick={() => setShowModal(false)}
                        >
                          ✕
                        </button>
                      </div>

                      {/* Modal Body */}
                      <div className="space-y-4 mt-4">
                        {/* Title Input */}
                        <div className="flex flex-col">
                          <label htmlFor="title" className="font-medium">
                            Title
                          </label>
                          <input
                            id="title"
                            type="text"
                            className="border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            value={updatedPost.title}
                            onChange={(e) =>
                              setUpdatedPost({
                                ...updatedPost,
                                title: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* Content Input */}
                        <div className="flex flex-col">
                          <label htmlFor="content" className="font-medium">
                            Content
                          </label>
                          <textarea
                            id="content"
                            className="border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            rows={4}
                            value={updatedPost.content}
                            onChange={(e) =>
                              setUpdatedPost({
                                ...updatedPost,
                                content: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      {/* Modal Footer */}
                      <div className="flex justify-end mt-4 space-x-2">
                        <button
                          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex gap-x-2"
                          onClick={() => handleSave(post.createdBy?.username)}
                        >
                          Save changes
                          {loading && <Loader2 className="animate-spin" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className=" hover:text-gray-600 flex gap-x-2 items-center pb-3"
                  onClick={handleDeleteButtonClicked}
                >
                  <Trash size={14}></Trash>
                  <span>Delete</span>
                </div>
                {/* Delete Modal */}

                {deleteModal && (
                  <DeleteConfirmationModal
                    isOpen={deleteModal}
                    onConfirm={handleDeletePost}
                    onClose={() => setDeleteModal(false)}
                  ></DeleteConfirmationModal>
                )}
              </menu>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-y-2">
          {/* Title */}
          <div className="text-lg italic font-semibold">{post.title}</div>

          {/* Content */}
          <div className="text-gray-600 mb-4 text-sm">{post.content}</div>

          {/* Date Time */}
          <div className="flex justify-between items-center mt-1 ">
            {/* Date */}
            <div>
              <span className="text-gray-400 text-xs">
                {convertToDateString(post.createdAt)}
                {", "}
                {formattedTime(post.createdAt)}
              </span>
            </div>

            <div className="flex gap-x-2">
              <div className="bg-gray-50 flex gap-x-2 px-2 py-1 rounded items-center">
                <FaRegCommentDots
                  size={"18px"}
                  // className={`${post.likes > 0} ? text-yellow-500 : '' `}
                />
                <span className="font-bold">0</span>
              </div>

              <div
                className="bg-gray-100 flex gap-x-2 px-2 py-1 rounded items-center cursor-pointer"
                onClick={() => handleLike(post?._id)}
              >
                <BiLike
                  size={"18px"}
                  className={`${post.likes > 0 ? "text-yellow-500" : ""}`}
                />
                <span className="font-bold">{post.likes}</span>
              </div>
            </div>
          </div>
        </div>

        <div>{children}</div>
      </Card>
    </div>
  );
};

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        {/* Modal Header */}
        <h2 className="text-lg font-semibold text-center">Confirm Deletion</h2>
        <p className="text-gray-600 text-sm text-center mt-2">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>

        {/* Modal Footer */}
        <div className="flex justify-center mt-4 space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
