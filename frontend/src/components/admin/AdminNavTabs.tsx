import { Link, useLocation } from "react-router-dom";

export const AdminNavTabs = () => {
  const location = useLocation();
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          to="/admin/movies"
          className={
            "nav-link " + (location.pathname === "/admin/movies" ? "active" : "")
          }
        >
          Movies
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/admin/actors"
          className={
            "nav-link " + (location.pathname === "/admin/actors" ? "active" : "")
          }
        >
          Actors
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/users" className={"nav-link " + (location.pathname === "/admin/users" ? "active" : "")}>
          Users
        </Link>
      </li>
    </ul>
  );
};
