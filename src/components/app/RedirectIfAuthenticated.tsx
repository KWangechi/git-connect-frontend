import { User } from "@/utils/types";
import { Navigate } from "react-router-dom";

const RedirectIfAuthenticated = ({
  isAuthenticated,
  user,
  children,
}: {
  isAuthenticated: boolean;
  user: User | null;
  children: React.ReactNode;
}) => {
  return isAuthenticated && user ? (
    <Navigate to="/" replace />
  ) : (
    <>{children}</>
  );
};

export default RedirectIfAuthenticated;
