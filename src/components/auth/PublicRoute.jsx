import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/employee-side/useCurrentUser";
import CustomLoading from "../utils/CustomLoading";

const PublicRoute = ({ children }) => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CustomLoading text="Loading..." />
      </div>
    );
  }

  // If the user is authenticated, redirect them to the dashboard.
  if (user) {
    console.log("User is authenticated, redirecting to dashboard.");
    return <Navigate to="/dashboard/" replace />;
  }

  // If not authenticated, render the children (the login form).
  return children;
};

export default PublicRoute;
