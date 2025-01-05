// import MainLayout from "/src/pages/app/MainLayout";
// import HomePage from "/src/app/components/HomePage";
// import LoginPage from "/src/pages/auth/LoginPage";
// import RegisterPage from "/src/pages/auth/RegisterPage";
// import ProtectedRoute from "/src/components/ProtectedRoute";
// import RedirectIfAuthenticated from "/src/components/RedirectIfAuthenticated";
import { Outlet } from "react-router-dom";
import useAuth from "@/state-management/auth";
import MainLayout from "@/pages/MainLayout";
import Home from "@/components/app/Home";
import RedirectIfAuthenticated from "@/components/app/RedirectIfAuthenticated";
import LoginPage from "@/pages/auth/LoginPage";
import Register from "@/pages/auth/RegisterPage";
import ProtectedRoute from "@/components/app/ProtectedRoute";

function useRoutes() {
  const { user, isAuthenticated } = useAuth();

  const routes = [
    {
      path: "/",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          user={user}
          children={<MainLayout />}
        />
      ),
      children: [{ path: "", element: <Home /> }],
    },
    {
      path: "/auth",
      element: (
        <RedirectIfAuthenticated
          isAuthenticated={isAuthenticated}
          user={user}
          children={<Outlet />}
        />
      ),
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <Register /> },
      ],
    },
  ];

  return { routes };
}

export { useRoutes };
