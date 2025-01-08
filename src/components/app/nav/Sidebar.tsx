import { Home, Contact, Bookmark, MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

function Sidebar() {
  const menuItems = [
    { label: "My Feed", icon: <Home size={20} />, path: "/posts" },
    { label: "Developers", icon: <Contact size={20} />, path: "/developers" },
    { label: "Login", icon: <Bookmark size={20} />, path: "login" },
  ];

  const [open, setOpen] = useState(true);
  const isMobile = useIsMobile();

  return (
    <div
      className={`bg-[#0e0c0cec] min-h-screen mt-12 ${
        isMobile
          ? open
            ? "w-72" // Full width on mobile when open
            : "hidden" // Completely hide on mobile when closed
          : open
          ? "w-72" // Desktop width when open
          : "w-20" // Compact width when closed
      } duration-500 text-gray-100 px-4 fixed sm:relative z-50`}
    >
      {/* Top Section */}
      <div>
        {/* Logo Section */}
        <div className="flex justify-between pt-3 pb-2 border-b border-gray-700 items-center">
          <div className={`flex items-center ${!open ? "hidden" : "visible"}`}>
            <img
              src="/git_connect_logo.png"
              alt="Git Connect"
              className="h-6"
            />
            <h1 className={`text-lg font-bold text-yellow-500 `}>
              Git Connect
            </h1>
          </div>
          <div className="flex justify-end items-center">
            <MenuIcon
              size={26}
              className="rounded-md cursor-pointer "
              onClick={() => setOpen(!open)}
            ></MenuIcon>
          </div>
        </div>

        {/* Menu Items */}
        <ul className="mt-4 flex flex-col gap-4 relative">
          {menuItems.map((item, index) => (
            <li key={index} className="group">
              <Link
                to={item.path}
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded-md text-white transition"
              >
                <div className="mr-3 text-gray-400 group-hover:text-yellow-500">
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
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section: Dark Mode Toggle */}
      {/* <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm">Dark Theme</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              defaultChecked={true}
            />
            <div className="w-10 h-6 bg-gray-600 rounded-full peer peer-checked:bg-yellow-500 transition">
              <div className="w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-4 transition-transform"></div>
            </div>
          </label>
        </div>
      </div> */}
    </div>
  );
}

export default Sidebar;
