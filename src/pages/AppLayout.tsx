// AppLayout.tsx
// This Layout has 2 parts: sidebar with: /feed, /developers and the Main Page

import { Outlet } from "react-router-dom";
import Sidebar from "@/components/app/Sidebar";

// import { Sidebar } from "lucide-react";

const AppLayout = () => {
  return (
    <div className="w-full">
      <div className="flex h-screen bg-gray-900 text-gray-200">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-900 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
