import { AuthContext } from "@/components/context/AuthContext";
import useAuth from "@/hooks/use-auth";
import {
  HelpCircleIcon,
  LogOut,
  LucideBell,
  Settings,
  UserCircle2,
} from "lucide-react";
import { useContext, useState } from "react";

export const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const { logout } = useAuth();

  return (
    <nav className="h-12 bg-gray-800 text-white px-4 flex justify-end items-center">
      <div className="flex items-center gap-x-4">
        <div>
          <HelpCircleIcon size={20} className="rounded hover:bg-gray-200" />
        </div>

        <div>
          <LucideBell size={20} className="rounded hover:bg-gray-200" />
        </div>

        <div
          className="flex items-center gap-x-2 ml-12 mr-4 cursor-pointer hover:text-gray-600"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          <UserCircle2 size={20} className="rounded hover:bg-gray-200" />
          <span className="text-gray-400 ">{user?.username}</span>
        </div>

        {openMenu && (
          <menu className="bg-gray-800 rounded py-4 px-6 absolute top-14 right-8 cursor-pointer">
            <div className="text-white hover:text-gray-600 flex gap-x-2 items-center pb-3 ">
              <Settings size={14}></Settings>
              <span>Settings</span>
            </div>
            <div
              className="text-white hover:text-gray-600 flex gap-x-2 items-center"
              onClick={logout}
            >
              <LogOut size={14}></LogOut>
              <span>Logout</span>
            </div>
          </menu>
        )}
      </div>
    </nav>
  );
};
