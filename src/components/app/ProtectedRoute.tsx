import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  const userHasProfile = user?.profile;

  console.log("User has profile: " + userHasProfile);

  return isAuthenticated && user ? (
    <>
      {userHasProfile ? children : <Navigate to={`profile/${user.username}/create`} />}
    </>
  ) : (
    <Navigate to="login" replace />
  );
};

export default ProtectedRoute;
