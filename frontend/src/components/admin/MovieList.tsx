import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ModalProps, Movies } from "../../utils/types";
import { getMovies } from "../../features/movieSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Table from "../views/Table";
import { AdminNavTabs } from "./AdminNavTabs";
import { ToastContainer } from "react-toastify";
import CustomModal from "../popup/Modal";

export const MovieList = () => {
  const tableHeader = [
    { title: "Movie Title", key: "title" },
    { title: "Duration (mins)", key: "duration" },
    { title: "Year Released", key: "releasedDate" },
    { title: "Budget Cost", key: "cost" },
    { title: "Reviews", key: "newReviews" },
    { title: "Rating Avg%", key: "reviews" },
    { title: "", key: "id" },
  ];

  const [modal, setModal] = useState<ModalProps>({
    id: "",
    type: "",
    action: "",
    setModalProps: (newType: string, newAction = "", newId = "") => {
      setModal({ ...modal, type: newType, action: newAction, id: newId });
    },
  });

  const addHandler = (type: string, action: string) => {
    setModal({ ...modal, action: action, type: type });
  };

  const movieList = useAppSelector(
    (state) => state.movieList.movies as Movies[]
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);
  return (
    <section>
      <ToastContainer />
      <div className="section mt-3">
        <AdminNavTabs />
        <div className="section-container dark">
          <div className="header">
            <div>
              <span className="title">Movies Management</span>
              <button
                className="btn-float-end"
                data-testid="addMovie"
                onClick={() => addHandler("movies", "add")}
              >
                <FontAwesomeIcon className="pr-3" icon={faPlus} />
                <span> Add Movie</span>
              </button>
            </div>
          </div>
          <div className="mt-2"></div>
          <Table
            headers={tableHeader}
            data={movieList}
            minRow={15}
            tableType="movies"
            modal={modal}
          />
        </div>
      </div>
      <CustomModal {...modal} />
    </section>
  );
};
