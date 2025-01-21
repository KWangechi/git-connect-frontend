import { Outlet, useRoutes } from "react-router-dom";
import MainLayout from "@/pages/MainLayout";
import Home from "@/components/app/Home";
import RedirectIfAuthenticated from "@/components/app/RedirectIfAuthenticated";
import LoginPage from "@/pages/auth/LoginPage";
import Register from "@/pages/auth/RegisterPage";
import ProtectedRoute from "@/components/app/ProtectedRoute";
import PageNotFound from "@/pages/PageNotFound";
import UserProfileForm from "@/components/app/user-profile/UserProfileForm";
import ViewProfile from "@/pages/userProfile/ViewProfile";
import RedirectRoute from "@/components/app/RedirectRoute";
import DevelopersList from "@/components/app/developer/DeveloperList";

function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/home", element: <Home /> },
        {
          path: "",
          element: <RedirectRoute to="/home" condition={true} />,
        },
        {
          path: "developers",
          children: [
            {
              path: "",
              element: <DevelopersList />,
            },
            {
              path: "profile/:username",
              element: <ViewProfile />,
            },
          ],
        },
      ],
    },
    { path: "profile/:username/create", element: <UserProfileForm /> },

    {
      path: "/",
      element: (
        <RedirectIfAuthenticated>
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
