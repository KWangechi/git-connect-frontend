import { useState } from "react";
import Search from "./Search";
// import ProfileCard from "./user-profile/ProfileCard";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardHeader,
  // CardFooter,
  CardTitle,
  // CardDescription,
} from "@/components/ui/card";
import useDeveloper from "@/hooks/useDeveloper";
import { appUrl } from "@/utils/axios";
import { Link } from "react-router-dom";
// import { MapPinIcon } from "lucide-react";
// import { developers } from "@/utils/developers_dummy";
import { MapPinIcon } from "lucide-react";

const Home = () => {
  const [search, setSearchTerm] = useState<string>("");
  const { developers } = useDeveloper();
  useDeveloper();

  return (
    <div className="p-4">
      <div className="w-full mb-8">
        <div className="text-bold font-semibold text-3xl">
          <span>Developers</span>
        </div>
        <Search searchTerm={search} setSearchTerm={setSearchTerm} />
        {/* <ProfileCard profile="Profile 1" /> */}
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mt-12">
        {developers.map((user, id) => (
          <Card
            key={id}
            className="hover:shadow transition-shadow w-full text-wrap shadow-xl rounded-xl border border-gray-200 bg-white"
          >
            {/* Profile Image and Basic Info */}
            <CardContent className="flex flex-col items-center -mt-8 rounded-md">
              <img
                src={`${appUrl}${user.profile?.photoUrl}`}
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
                alt={user?.username}
              />
              <div className="text-center mt-3">
                <CardTitle className="text-lg font-semibold">
                  {user?.username}
                </CardTitle>
                {/* <CardDescription className="text-gray-600 text-sm flex items-center justify-center gap-2 mt-1">
                  <MailIcon size="16" />
                  {user?.email || "Not Available"}
                </CardDescription> */}
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 mt-2 rounded-full">
                  {user.profile?.occupation || "No Occupation"}
                </span>
              </div>
            </CardContent>

            {/* Social Links Section */}
            <CardContent className="flex flex-col text-gray-700 px-6 pb-4 gap-y-3">
              {user?.profile?.socialLinks?.websiteLink && (
                <div className="flex items-center gap-x-2">
                  <MapPinIcon size={"16px"} />
                  <span className="truncate">
                    {user?.profile?.socialLinks?.websiteLink}
                  </span>
                </div>
              )}

              {user?.profile?.socialLinks?.twitterLink && (
                <div className="flex items-center gap-x-2">
                  <FaXTwitter size={"16px"} className="text-blue-400" />
                  <span className="truncate">
                    {user?.profile?.socialLinks?.twitterLink}
                  </span>
                </div>
              )}

              {user?.profile?.socialLinks?.githubLink && (
                <div className="flex items-center gap-x-2">
                  <FaGithub size={"16px"} className="text-gray-800" />
                  <span className="truncate">
                    {user?.profile?.socialLinks?.githubLink}
                  </span>
                </div>
              )}

              {user?.profile?.location && (
                <div className="flex items-center gap-x-2">
                  <MapPinIcon size={"16px"} className="text-gray-500" />
                  <span>{user?.profile?.location}</span>
                </div>
              )}
            </CardContent>

            {/* Footer Section */}
            <div className="flex justify-end text-green-500 pr-4 pb-4">
              <Link to={"/"}>
                <span className="underline">View More</span>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
