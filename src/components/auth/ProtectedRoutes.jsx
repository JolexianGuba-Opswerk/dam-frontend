import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/employee-side/useCurrentUser";
import CustomLoading from "../utils/CustomLoading";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <CustomLoading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.is_superuser && !user.employee_profile.is_verified) {
    return <Navigate to="/pending" replace />;
  }

  if (allowedRoles) {
    const isAdmin = user.is_superuser;
    const isEmployee = !user.is_superuser;

    if (allowedRoles.includes("admin") && !isAdmin) {
      return <Navigate to="/unathorized" replace />;
    }

    if (allowedRoles.includes("employee") && !isEmployee) {
      return <Navigate to="/unathorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
