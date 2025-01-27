import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Post as UserPost } from "@/utils/types";
import usePost from "./hooks/usePost";
import { convertToDateString, formattedTime } from "@/utils/formateDate";
import { FaRegCommentDots } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { MdOpenInNew } from "react-icons/md";
import { useState } from "react";
// import { createPortal } from "react-dom";

const Post = ({
  post,
  postPermissions,
  showOpenInNewButton,
}: {
  post: UserPost;
  postPermissions?: {
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canRead: boolean;
  };
  showOpenInNewButton?: boolean;
}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  // const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const { toggleLikeStatus } = usePost();

  const handleLike = (postId: string | undefined) => {
    toggleLikeStatus(postId);
  };

  const goToProfile = (clickedUsername: string) => {
    navigate(`/developers/${clickedUsername}/profile`);
  };

  // const handleOpenMenu = (postId: string | undefined) => {
  //   setMenuOpen(true);
  //   console.log(postId);
  //   // set the postId to open the menu for
  //   // setPostIdForMenu(postId);
  // };

  const handleEditButtonClicked = (postId: string | undefined) => {
    console.log(postId);
    // editPost();
    // open an Edit Modal
  };

  const handleOpenInNew = (postId: string | undefined) => {
    navigate(`/posts/${postId}`);
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
            onClick={() => goToProfile(post.createdBy.username)}
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
              <span className="font-bold">{post.createdBy.username}</span>
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
                <div className=" hover:text-gray-600 flex gap-x-2 items-center pb-3 ">
                  <Edit size={14}></Edit>
                  <span>Edit</span>
                </div>

                <div
                  className=" hover:text-gray-600 flex gap-x-2 items-center pb-3"
                  onClick={() => handleEditButtonClicked(post?._id)}
                >
                  <Trash size={14}></Trash>
                  <span>Delete</span>
                </div>
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
      </Card>
    </div>
  );
};

// export function DialogDemo() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Edit Profile</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Edit profile</DialogTitle>
//           <DialogDescription>
//             Make changes to your profile here. Click save when you're done.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name
//             </Label>
//             <Input
//               id="name"
//               defaultValue="Pedro Duarte"
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//               Username
//             </Label>
//             <Input
//               id="username"
//               defaultValue="@peduarte"
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="submit">Save changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

export default Post;
