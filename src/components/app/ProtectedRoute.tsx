import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return isAuthenticated && user ? (
    <>{children}</>
  ) : (
    <Navigate to="login" replace />
  );
};

export default ProtectedRoute;
