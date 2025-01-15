import { Outlet } from "react-router-dom";
import Sidebar from "@/components/app/nav/Sidebar";
import { Navbar } from "@/components/app/nav/Navbar";

const MainLayout = () => {

  return (
    <section className="flex h-screen">
      <div className="z-30">
        <Sidebar />
      </div>

      <div className="fixed top-0 left-0 w-full h-16 z-10">
        <Navbar />
      </div>
      <main className="overflow-y-auto">
        <div className="pt-14 px-4 ">
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export default MainLayout;
