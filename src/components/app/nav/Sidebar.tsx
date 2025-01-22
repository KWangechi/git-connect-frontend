import { Home, Contact, MenuIcon, XIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Switch } from "@/components/ui/switch";

function Sidebar() {
  const menuItems = [
    { label: "Feed", icon: <Home size={20} />, path: "/home" },
    { label: "Developers", icon: <Contact size={20} />, path: "/developers" },
  ];

  const isMobile = useIsMobile();
  const [open, setOpen] = useState(isMobile ? false : true);
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMobile]);

  return (
    <div
      className={`bg-[#22331D] min-h-screen ${
        isMobile ? (open ? "w-60" : "hidden") : open ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4 fixed sm:relative z-50`}
    >
      {/* Top Section */}
      <div>
        {/* Logo Section */}
        <div className="flex justify-between pt-3 pb-2 items-center">
          <div
            className={`flex items-center ${
              !open ? "hidden" : "visible"
            } gap-x-4`}
          >
            <img
              src="/git_connect_logo.png"
              alt="Git Connect"
              className="h-6"
            />
            <h1 className={`text-lg font-semibold text-white`}>Git Connect</h1>
          </div>
          <div className="flex justify-end items-center">
            {!open ? (
              <MenuIcon
                size={24}
                className="rounded-md cursor-pointer "
                onClick={() => setOpen(true)}
              ></MenuIcon>
            ) : (
              <XIcon
                size={24}
                className="rounded-md cursor-pointer "
                onClick={() => setOpen(false)}
              ></XIcon>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <ul className="mt-4 flex flex-col gap-3">
          {menuItems.map((item, index) => (
            <li key={index} className="group">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center py-2 px-2 text-sm hover:bg-gray-700 rounded hover:px-2 text-white transition ${
                    isActive ? "bg-[#6a6d69] text-yellow-500" : ""
                  }`
                }
              >
                <div className={`mr-3 text-gray-400 group-hover:text-yellow-500`}>
                  {item.icon}
                </div>
                <span
                  className={`whitespace-pre duration-500 group-hover:text-yellow-500 ${
                    !open &&
                    "opacity-0 translate-x-28 overflow-hidden hover:rounded-lg"
                  }`}
                >
                  {item.label}
                </span>

                <span
                  className={`${
                    open && "hidden"
                  } absolute left-20 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {item?.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section: Dark Mode Toggle */}
      <div className="absolute bottom-0 p-4 border-t">
        <div className="flex items-center space-x-4 w-full">
          <label htmlFor="dark_theme">Dark Theme</label>
          <Switch
            id="dark_theme"
            checked={darkTheme}
            onCheckedChange={setDarkTheme}
            className="bg-white"
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
