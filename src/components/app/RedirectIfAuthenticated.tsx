import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RedirectIfAuthenticated = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return isAuthenticated && user ? (
    <Navigate to="/" replace />
  ) : (
    <>{children}</>
  );
};

export default RedirectIfAuthenticated;
