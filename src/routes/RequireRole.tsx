import { Navigate, Outlet } from "react-router-dom";
import { json } from "zod";

interface RequireRoleProps {
  allowedRoles: string[];
}

const RequireRole = ({ allowedRoles }: RequireRoleProps) => {
  const userStr = localStorage.getItem("user");

  if (!userStr) {
    return <Navigate to="/signin" replace />;
  }

  let user;
  try {
    user = JSON.parse(userStr);
  } catch {
    localStorage.removeItem("user"); // Clear invalid data
    return <Navigate to="/signin" replace />;
  }

  if (!user || !user.role) {
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RequireRole;
