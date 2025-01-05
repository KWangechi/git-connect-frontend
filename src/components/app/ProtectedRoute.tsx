import { User } from "@/utils/types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated,
  user,
  children,
}: {
  isAuthenticated: boolean;
  user: User | null;
  children: React.ReactNode;
}) => {
  return isAuthenticated && user ? (
    <>{children}</>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default ProtectedRoute;
