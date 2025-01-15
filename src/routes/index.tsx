import { Outlet, useRoutes } from "react-router-dom";
import MainLayout from "@/pages/MainLayout";
import Home from "@/components/app/Home";
import RedirectIfAuthenticated from "@/components/app/RedirectIfAuthenticated";
import LoginPage from "@/pages/auth/LoginPage";
import Register from "@/pages/auth/RegisterPage";
import ProtectedRoute from "@/components/app/ProtectedRoute";
import PageNotFound from "@/pages/PageNotFound";
import UserProfileForm from "@/components/app/user-profile/UserProfileForm";

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
        { path: "", element: <Home /> },
        // Add more routes here
        // Example: { path: "developers", element: <DevelopersPage /> },
        // Example: { path: "posts", element: <PostsPage /> },
        // Example: { path: "settings", element: <SettingsPage /> },
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
