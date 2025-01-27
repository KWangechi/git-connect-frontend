import useDeveloper from "@/hooks/useDeveloper";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// import { MdOpenInNew } from "react-icons/md";
// import { Tabs } from "@/components/ui/tabs";
// import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ArrowLeftIcon } from "lucide-react";
// import Post from "@/components/post/Post";
// import { convertToDateString } from "@/utils/formateDate";
import ProfileCard from "@/components/app/user-profile/ProfileCard";

const ViewProfile = () => {
  const { username } = useParams();
  const { developer, fetchUserProfile } = useDeveloper();

  // memoize the Professional Info and the posts component to avoid making requests each time to tab value changes
  // get currently logged in user
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUsername = currentUser?.username;

  useEffect(() => {
    if (username) {
      fetchUserProfile(username);
    }
  }, []);

  if (!developer) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    history.back();
  };

  const permissions = {
    Profile: {
      canRead: true,
      canCreate: true,
      canEdit: developer.username === currentUsername,
      canDelete: developer.username === currentUsername,
    },
    Posts: {
      canCreate: true,
      canRead: true,
      canEdit: developer.username === currentUsername,
      canDelete: developer.username === currentUsername,
    },
    Comments: {
      canCreate: true,
      canRead: true,
      canEdit: developer.username === currentUsername,
      canDelete: developer.username === currentUsername,
    },
  };

  // this logic should be in the ProfileCard in order to reuse it and customize on the permissions
  return (
    <div className="min-h-screen sm:flex flex-col">
      <div className="fixed w-full bg-gray-300 mb-4 z-50 h-12 pt-1.5">
        <div className="pl-4 text-gray-600 flex gap-x-4 items-center">
          <div onClick={handleBack} className="cursor-pointer">
            <ArrowLeftIcon size={28}></ArrowLeftIcon>
          </div>
          <span className="text-lg font-bold">
            {developer.firstName} {developer.lastName}
          </span>
        </div>
      </div>

      {/* Profile Header */}
      <ProfileCard
        developer={developer}
        permissions={permissions}
      ></ProfileCard>
    </div>
  );
};

export default ViewProfile;
