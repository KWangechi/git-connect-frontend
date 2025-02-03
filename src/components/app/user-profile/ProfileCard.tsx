// import { Label } from "@radix-ui/react-label";
import { appUrl } from "@/utils/axios";
import { Developer, Post as UserPost } from "@/utils/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import useDeveloper from "@/hooks/useDeveloper";
import { Loader2 } from "lucide-react";
import Post from "@/components/post/Post";
import { useParams } from "react-router-dom";
import { convertToDateString } from "@/utils/formateDate";

const ProfileCard = ({
  developer,
  permissions,
}: {
  developer: Developer | null;
  permissions: {
    [resourceType in "Profile" | "Posts" | "Comments"]: {
      canCreate: boolean;
      canDelete: boolean;
      canRead: boolean;
      canEdit: boolean;
    };
  };
}) => {
  const [tabValue, setTabValue] = useState<string>("professional_info");

  const { username } = useParams();
  const { userPosts: posts, fetchUserPosts, loading: userPostsLoading } = useDeveloper();

  useEffect(() => {
    if (username) {
      fetchUserPosts(username);
    }
  }, []);

  useEffect(() => {
    console.log('Parent Component has re-rendered... get latest posts');
  }, [posts]);

  // what if I use useMemo() to get the posts and only fetch them when the value changes?
  // useMemo(() => {
  //   if (username && posts.length === 0) {
  //     fetchUserPosts(username);
  //   }
  // }, [posts.length, username]);

  // in my postPermissions, just include the permissions for "Posts" and "Comments"
  const postPermissions = permissions["Posts"];
  // const commentPermissions = permissions["Comments"];

  return (
    <div>
      <div className="h-[100px] bg-gray-200 mt-14 relative pb-8 flex flex-col md:flex-row items-start md:items-center">
        <div className="absolute -bottom-24 left-4 md:left-10">
          <img
            src={`${appUrl}${developer?.profile?.photoUrl}`}
            className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
            alt="Profile Photo"
          />
        </div>
      </div>
      <div className="md:mt-4 ml-6 md:ml-44 flex flex-col md:flex-row justify-between items-start h-[80px]">
        <div>
          <h2 className="text-xl font-semibold">{developer?.username}</h2>
          <p className="text-gray-600">
            I'm a {developer?.profile?.occupation} based in{" "}
            {developer?.profile?.location || "Not Set"}.
          </p>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-3">
          <button className="bg-[#f65a11] text-white px-4 py-2 rounded shadow">
            Hire Me
          </button>
          {permissions["Profile"]["canEdit"] && (
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded shadow">
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="flex mt-4">
        <div className="px-4 w-full">
          <Tabs
            defaultValue="professional_info"
            onValueChange={(value) => setTabValue(value)}
            className="w-full"
          >
            <TabsList className="flex justify-around">
              <TabsTrigger
                value="professional_info"
                className={`${
                  tabValue === "professional_info"
                    ? "border-b-2 border-[#f65a11]"
                    : ""
                } py-2 text-center`}
              >
                Professional Info
              </TabsTrigger>
              <TabsTrigger
                value="posts"
                className={`${
                  tabValue === "posts" ? "border-b-2 border-[#f65a11]" : ""
                } py-2 text-center`}
              >
                Posts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="professional_info" className="w-full">
              <ProfessionalInfo />
            </TabsContent>
            <TabsContent value="posts" className="w-full">
              {/* // this component needs to re-render if the posts change */}
              {/* {<div className="flex flex-col gap-6 w-full">
                {posts.length === 0 && (
                  <div className="text-gray-600 text-center py-8">
                    No posts found.
                  </div>
                )}
                {posts.map((post: UserPost) => (
                  <Post
                    key={post?._id}
                    post={post}
                    postPermissions={postPermissions}
                  />
                ))}

              { <div className="flex justify-center mt-6">
                  <button className="bg-[#f65a11] text-white px-4 py-2 rounded shadow">
                    Load More
                  </button>
                </div> }
              </div> } */}


              <DevPosts
                postPermissions={postPermissions}
                posts={posts}
                loading={userPostsLoading}
                // commentPermissions={commentPermissions}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const ProfessionalInfo = () => {
  const { username } = useParams();
  const { developer, fetchUserProfile } = useDeveloper();

  useEffect(() => {
    if (username) {
      fetchUserProfile(username);
    }
  }, []);

  if (!developer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 w-full py-4">
      {/* Left Column */}
      <div className="md:col-span-2">
        {/* Experience Section */}
        <div className="bg-gray-200 shadow-md rounded p-6">
          <h3 className="text-lg font-semibold">Experience</h3>
          {developer?.profile?.workExperience?.length &&
            developer?.profile?.workExperience.map((experience, index) => (
              <div key={index} className="flex flex-col gap-y-4 mt-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://placehold.co/600x400"
                    className="h-12 w-12 rounded-xl"
                    alt={experience?.company}
                  />
                  <div>
                    <h4 className="text-sm font-semibold">
                      {experience?.company}
                    </h4>
                    <p className="text-gray-600">{experience?.jobTitle}</p>
                    <p className="text-gray-600 text-sm">
                      {experience?.startDate &&
                        convertToDateString(experience.startDate)}{" "}
                      -{" "}
                      {experience?.endDate === null ||
                      experience?.stillWorkingHere
                        ? "Present"
                        : experience?.endDate &&
                          convertToDateString(experience.endDate)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-1 space-y-6">
        {/* Location and Contact Section */}
        <div className="bg-gray-200 shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold">Location</h3>
          <p className="mt-2 text-gray-600">{developer?.profile?.location}</p>

          {developer?.profile?.socialLinks?.websiteLink && (
            <div>
              <h3 className="text-lg font-semibold mt-4">Website</h3>
              <a
                href={developer?.profile?.socialLinks?.websiteLink}
                className="text-blue-500 mt-2"
              >
                {developer?.profile?.socialLinks?.websiteLink}
              </a>
            </div>
          )}

          <h3 className="text-lg font-semibold mt-4">Email</h3>
          <a
            href={`mailto:${developer?.emailAddress}`}
            className="text-blue-500 mt-2"
          >
            {developer?.emailAddress}
          </a>
        </div>
      </div>
    </div>
  );
};

const DevPosts = ({
  postPermissions,
  posts,
  loading
}: // commentPermissions,
{
  postPermissions: {
    canCreate: boolean;
    canDelete: boolean;
    canRead: boolean;
    canEdit: boolean;
  };
  posts: UserPost[];
  loading: boolean
  // commentPermissions?: {
  //   canCreate: boolean;
  //   canDelete: boolean;
  //   canRead: boolean;
  //   canEdit: boolean;
  // };
}) => {



  return (
    <div className="flex w-full py-4 ">
      {/* Posts Section */}
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-6 w-full">
        {loading ? (
          <div className="flex items-center justify-center mt-4">
            <Loader2 className="text-gray-500 animate-spin" size={"34px"} />
          </div>
        ) : !posts.length ? (
          <div className="flex justify-center items-center">
            <h2 className="text-lg font-semibold">No posts found</h2>
          </div>
        ) : (
          posts.map((post) => (
            <Post
              post={post}
              key={post?._id}
              postPermissions={postPermissions}
              showOpenInNewButton={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
