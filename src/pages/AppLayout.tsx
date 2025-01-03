// AppLayout.tsx
// This Layout has 2 parts: sidebar with: /feed, /developers and the Main Page

import { Outlet } from "react-router-dom";
import Sidebar from "@/components/app/Sidebar";

// import { Sidebar } from "lucide-react";

const AppLayout = () => {
  return (
    <section className="flex">
      <Sidebar />

      <div className="p-2 text-xl text-gray-900 font-semibold">
        <Outlet />
      </div>
    </section>
  );
};

export default AppLayout;
