import { Outlet } from "react-router-dom";
import NavTabs from "./components/views/NavTabs";

const HeaderNavigation = () => {
  return (
    <>
      <NavTabs />
      <Outlet />
    </>
  );
};

export default HeaderNavigation;
