import { useEffect, useState } from "react";
import Search from "./Search";
// import ProfileCard from "./user-profile/ProfileCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  // CardDescription,
} from "@/components/ui/card";
import useDeveloper from "@/hooks/useDeveloper";

const Home = () => {
  const [search, setSearchTerm] = useState<string>("");

  const { getDevelopers, developers } = useDeveloper();

  useEffect(() => {
    getDevelopers();
  }, []);

  return (
    <div className="p-4">
      {search}
      <div className="w-80 mb-8">
        <div className="text-bold font-semibold text-3xl">
          <span>Developers</span>
        </div>
        <Search searchTerm={search} setSearchTerm={setSearchTerm} />
        {/* <ProfileCard profile="Profile 1" /> */}
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-5 gap-x-8  gap-y-8">
        {developers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <img
                src={user?.profile?.photoUrl}
                alt={user.username}
                className="w-full h-32 object-cover rounded-t-md"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-center">{user.username}</CardTitle>
              {/* <CardDescription className="text-center text-gray-500">
                {user.jobTitle}
              </CardDescription> */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
