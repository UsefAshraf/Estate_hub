import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const userStr = localStorage.getItem("user");

  if (!userStr) {
    return <Navigate to="/signin" replace />;
  }

  let user;
  try {
    user = JSON.parse(userStr);
  } catch {
    localStorage.removeItem("user");
    return <Navigate to="/signin" replace />;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;