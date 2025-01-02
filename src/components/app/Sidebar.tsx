import { Home, Contact, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { label: "My Feed", icon: <Home size={20} />, path: "/posts" },
    { label: "Developers", icon: <Contact size={20} />, path: "/developers" },
    { label: "Login", icon: <Bookmark size={20} />, path: "login" },
    // { label: "Messages", icon: <MessageSquare size={20} /> },
    // { label: "Notifications", icon: <Bell size={20} /> },
    // { label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="bg-gray-800 text-gray-300 h-screen w-64 flex flex-col justify-between shadow-lg">
      {/* Top Section */}
      <div>
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-lg font-bold text-yellow-500">Git Connect</h1>
        </div>

        {/* Menu Items */}
        <ul className="mt-6 space-y-2">
          {menuItems.map((item, index) => (
            <li key={index} className="group">
              <Link
                to={item.path}
                className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md text-white transition"
              >
                <div className="mr-3 text-gray-400 group-hover:text-yellow-500">
                  {item.icon}
                </div>
                <span className="group-hover:text-yellow-500">
                  {item.label}
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
    </aside>
  );
}

export default Sidebar;
