// import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
// import { Input } from "../../ui/input";
// import { Button } from "../../ui/button";
import { ProfileCardProps } from "@/utils/types";

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return <Card className="w-[550px]">
    {/* {profile} */}
    <CardHeader>
      <CardTitle>Create project</CardTitle>
      {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
    </CardHeader
  </Card>;
};

export default ProfileCard;
