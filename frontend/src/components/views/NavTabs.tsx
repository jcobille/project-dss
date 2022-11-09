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
import { getCookie, logout } from "../utils/cookie";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Actor, ModalProps, Movie, Movies, User } from "../types/ActionTypes";
import {
  clearCurrentUser,
  currentAuthUser,
} from "../features/currentUserSlice";
import { searchMovies } from "../features/movieSlice";
import { searchActors } from "../features/actorSlice";
const NavTabs = () => {
  const location = useLocation();
  const userToken = getCookie();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Movie[] | Actor[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("Movie");
  const navigate = useNavigate();
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

  const changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      let movieFound = await dispatch(searchMovies(value));
      if (movieFound.payload && movieFound.payload.length > 0) {
        let movies = movieFound.payload as Movies[];
        setSearchType("Movie");
        setData(movies);
      } else {
        let actorFound = await dispatch(searchActors(value));

        if (actorFound.payload && actorFound.payload.length > 0) {
          let actors = actorFound.payload as Actor[];
          setSearchType("Actor");
          setData(actors);
        }
      }
    } else {
      setData([]);
    }
    setSearchValue(value);
  };

  const selectMovieAutocomplete = ({ id }: Movie) => {
    navigate(`/movie/details/${id}`);
    setData([]);
    setSearchValue("");
  };

  const selectActorAutocomplete = ({ id }: Actor) => {
    navigate(`/actor/details/${id}`);
    setSearchValue("");
  };

  const userLogout = () => {
    dispatch(clearCurrentUser());
    logout();
  };

  useEffect(() => {
    setData([]);
    setSearchValue("");
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
                selectMovie={selectMovieAutocomplete}
                selectActor={selectActorAutocomplete}
                type={searchType}
                value={searchValue}
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
