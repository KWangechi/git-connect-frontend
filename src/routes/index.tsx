import { Outlet, useRoutes } from "react-router-dom";
import useAuth from "@/state-management/auth";
import MainLayout from "@/pages/MainLayout";
import Home from "@/components/app/Home";
import RedirectIfAuthenticated from "@/components/app/RedirectIfAuthenticated";
import LoginPage from "@/pages/auth/LoginPage";
import Register from "@/pages/auth/RegisterPage";
import ProtectedRoute from "@/components/app/ProtectedRoute";
import PageNotFound from "@/pages/PageNotFound";

function AppRoutes() {
  const { user, isAuthenticated } = useAuth();

  const routes = useRoutes([
    {
      path: "/",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [{ path: "", element: <Home /> }],
    },
    {
      path: "/",
      element: (
        <RedirectIfAuthenticated isAuthenticated={isAuthenticated} user={user}>
          <Outlet />
        </RedirectIfAuthenticated>
      ),
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return routes;
}

export default AppRoutes;
