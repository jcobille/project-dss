import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Movies } from "../types/ActionTypes";
import { getMovies } from "../features/movieSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Table from "../views/Table";
import { AdminNavTabs } from "./AdminNavTabs";
import Modal from "../popup/Modal";
import { ToastContainer } from "react-toastify";

export const MovieList = () => {
  const tableHeader = [
    { title: "Movie Title", key: "title" },
    { title: "Duration (mins)", key: "duration" },
    { title: "Year Released", key: "released_date" },
    { title: "Budget Cost", key: "cost" },
    { title: "Reviews", key: "newReviews" },
    { title: "Rating Avg%", key: "reviews" },
    { title: "", key: "id" },
  ];
  const buttonModalTypes = ["editMovie", "deleteMovie"];
  const [modal, setModal] = useState({
    id: "",
    type: "",
    isOpen: false,
  });

  const openCloseModal = (type: string) => {
    setModal({
      id: "",
      type: type,
      isOpen: !modal.isOpen,
    });
  };

  const changeModal = (type: string, id?: string) => {
    if (id) {
      setModal({ ...modal, id: id, type: type, isOpen: true });
    } else {
      setModal({ ...modal, type: type, isOpen: true });
    }
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
                onClick={() => openCloseModal("addMovie")}
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
            changeModal={changeModal}
            buttonModalTypes={buttonModalTypes}
          />
        </div>
      </div>
      <Modal
        modal={modal}
        closeModal={openCloseModal}
        changeModal={changeModal}
      />
    </section>
  );
};
