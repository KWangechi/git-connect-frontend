import { Outlet } from "react-router-dom";
import Sidebar from "@/components/app/nav/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/app/nav/Navbar";

const MainLayout = () => {
  return (
    <section className="flex h-screen">
      <div className="z-30">
        <Sidebar />
      </div>

      <div className="fixed top-0 left-0 w-full h-16 bg-sidebar-background z-10">
        <Navbar />
      </div>
      <main className="">
        <div className="pt-14 px-4 ">
          <Outlet />
        </div>
      </main>

      <Toaster></Toaster>
    </section>
  );
};

export default MainLayout;
