import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faRightFromBracket,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import CustomModal from "../popup/Modal";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AutoComplete } from "./CustomInput";
import { getCookie, logout } from "../../utils/cookie";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Actor, ModalProps, Movie, User } from "../../utils/types";
import {
  clearCurrentUser,
  currentAuthUser,
} from "../../features/currentUserSlice";
import { searchActorMovie } from "../../utils/services";
import { getMovies } from "../../features/movieSlice";
import { getActors } from "../../features/actorSlice";

const NavTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userToken = getCookie();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Movie[] | Actor[]>([]);
  const movieList = useAppSelector(({ movieList }) => movieList.movies);
  const actorList = useAppSelector(({ actorList }) => actorList.actors);
  const [searchType, setSearchType] = useState("Movie");
  const user = useAppSelector<User>(
    (state) => state.currentUser.details as User
  );
  const [modal, setModal] = useState<ModalProps>({
    type: "",
    setModalProps: (newType: string) => {
      setModal({ ...modal, type: newType });
    },
  });

  useEffect(() => {
    if (userToken) {
      dispatch(currentAuthUser());
    }
  }, [userToken, dispatch]);

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getActors());
  }, [dispatch]);
  const changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let { type, data } = searchActorMovie(value, movieList, actorList);
    setSearchType(type);
    setData(data);
  };

  const userLogout = () => {
    dispatch(clearCurrentUser());
    logout();
  };

  useEffect(() => {
    setData([]);
  }, [location.pathname]);
  return (
    <div>
      <div className={"navtab " + (location.pathname === "/" ? "home" : "")}>
        <div className="section p-4">
          <Link to="/">
            <span className="link align-left">MovieViewer</span>
          </Link>
          <div className="align-right">
            <div className="text-center">
              <AutoComplete
                className="search-input input-md mx-2"
                name="search"
                hidden={location.pathname === "/"}
                changeHandler={changeHandler}
                data={data}
                placeHolder="Enter keywords ..."
                type={searchType}
              />
              {!userToken ? (
                <button
                  className="ml-3 btn btn-outline btn-md"
                  onClick={() => modal.setModalProps("login")}
                >
                  <FontAwesomeIcon icon={faUserCircle} /> Member Login
                </button>
              ) : (
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.firstName}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      {user.role === "Admin" ? (
                        <Link to="/admin/movies" className="dropdown-item">
                          <FontAwesomeIcon icon={faUserSecret} size="sm" />
                          <span> Admin Page</span>
                        </Link>
                      ) : (
                        ""
                      )}
                    </li>
                    <li>
                      <span
                        onClick={userLogout}
                        className="dropdown-item pointer"
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} size="sm" />
                        <span> Logout</span>
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CustomModal {...modal} />
    </div>
  );
};

export default NavTabs;
