import { AuthContext } from "@/components/context/AuthContext";
import { HelpCircleIcon, LucideBell, UserCircle2 } from "lucide-react";
import { useContext } from "react";

export const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="h-12 bg-gray-800 text-white px-4 flex justify-end items-center">
      <div className="flex items-center gap-x-4">
        <div>
          <HelpCircleIcon size={20} className="rounded hover:bg-gray-200" />
        </div>

        <div>
          <LucideBell size={20} className="rounded hover:bg-gray-200" />
        </div>

        <div className="flex items-center gap-x-2 ml-12 cursor-pointer hover:text-gray-600">
          <UserCircle2 size={20} className="rounded hover:bg-gray-200" />
          <span className="text-gray-400 ">{user?.username}</span>
        </div>
      </div>
    </nav>
  );
};
