import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./components/store/hooks";
import { getCookie } from "./components/utils/cookie";
import { User } from "./components/types/ActionTypes";

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
