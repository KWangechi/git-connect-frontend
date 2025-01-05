import { Outlet } from "react-router-dom";
import Sidebar from "@/components/app/Sidebar";

const MainLayout = () => {
  return (
    <section className="flex">
      <Sidebar />

      <div className="p-2 text-xl text-gray-900 font-semibold">
        <Outlet />
      </div>
    </section>
  );
};

export default MainLayout;
