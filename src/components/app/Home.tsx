import { useState } from "react";
import Search from "./Search";
// import ProfileCard from "./user-profile/ProfileCard";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
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
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {developers.map((user, id) => (
          <Card
            key={id}
            className="hover:shadow transition-shadow w-full text-wrap shadow-xl"
          >
            <CardContent className="flex mt-4">
              <div className="flex justify-start text-bold">
                <img
                  src={`${appUrl}${user.profile?.photoUrl}`}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div className="ml-4">
                  <CardTitle className="font-bold">{user?.username}</CardTitle>
                  <CardDescription className="mt-1.5">
                    {user.profile?.occupation}
                  </CardDescription>
                </div>
              </div>
            </CardContent>
            <hr className="border-b-black w-full" />
            <CardContent className="flex flex-col text-black m-3 rounded justify-start gap-y-4 ">
              {user?.profile?.socialLinks?.websiteLink && (
                <div className="flex items-center gap-x-2">
                  <MapPinIcon size={"16px"}></MapPinIcon>
                  <span>{user?.profile?.socialLinks?.websiteLink}</span>
                </div>
              )}

              {user?.profile?.socialLinks?.twitterLink && (
                <div className="flex items-center gap-x-2">
                  <FaXTwitter size={"16px"}></FaXTwitter>
                  <span>{user?.profile?.socialLinks?.twitterLink}</span>
                </div>
              )}

              {user.profile?.socialLinks?.githubLink && (
                <div className="flex items-center gap-x-2">
                  <FaGithub size={"16px"}></FaGithub>
                  <span>{user?.profile?.socialLinks?.githubLink}</span>
                </div>
              )}

              {user && (
                <div className="flex items-center gap-x-2">
                  <MapPinIcon size={"16px"} opacity={0.4}></MapPinIcon>
                  <span>{user?.profile?.location} </span>
                </div>
              )}
            </CardContent>

            <div className="flex justify-end text-[#69cf49] pr-4 pb-2">
              <Link to={"/"}>
                <span className="underline">View More</span>
              </Link>
            </div>
            {/* <CardFooter className=""></CardFooter> */}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
