import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/employee-side/useCurrentUser";
import CustomLoading from "../utils/CustomLoading";

const ProtectedRoute = ({ children }) => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CustomLoading text="Loading..." />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login/" replace />;
};

export default ProtectedRoute;
