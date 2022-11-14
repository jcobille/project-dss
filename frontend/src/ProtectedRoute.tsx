import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./hooks/hooks";
import { User } from "./utils/types";
import Cookies from "js-cookie";

const ProtectedRoutes = () => {
  const userDetails = useAppSelector(
    (state) => state.currentUser.details as User
  );
  const userCookie = Cookies.get('token');
  if (!userCookie) return <Navigate to="/" />;
  if (userDetails.role && userDetails.role !== "Admin")
    return <Navigate to="/doesntexist" />;
  return <Outlet />;
};

export default ProtectedRoutes;
