import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./hooks/hooks";
import { getCookie } from "./utils/cookie";
import { User } from "./utils/types";

const ProtectedRoutes = () => {
  const userDetails = useAppSelector(
    (state) => state.currentUser.details as User
  );
  const userCookie = getCookie();
  if (!userCookie) return <Navigate to="/" />;
  if (userDetails.role && userDetails.role !== "Admin")
    return <Navigate to="/doesntexist" />;
  return <Outlet />;
};

export default ProtectedRoutes;
