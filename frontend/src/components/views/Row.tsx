import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Actor, ModalProps, Movie, User } from "../../utils/types";
import { CustomButton, StarRatings } from "./CustomInput";

interface RowProps {
  index: number;
  data: Movie | Actor | User;
  headers: {
    title: string;
    key: string;
  }[];
  modal: ModalProps;
  tableType: string;
}

const TableRow = ({ data, headers, modal, tableType, index }: RowProps) => {
  const [ratings, setRatings] = useState(0);
  const [newReviews, setNewReviews] = useState(0);
  const [disableDeleteButton, setDisableDeleteButton] = useState(true);

  const getRatings = () => {
    let newReviews = 0;
    let reviewRatings = 0;
    let movieData: Movie = data as Movie;
    if (movieData.reviews) {
      let reviews = movieData.reviews;
      let reviewCount = 0;
      reviews.forEach((review) => {
        if (review.status === "approved") {
          reviewCount += 1;
          reviewRatings += review.reviewScore;
        }
        if (review.status === "checking") newReviews += 1;
      });
      setNewReviews(newReviews / reviewCount);
      setRatings(reviewRatings / reviewCount);
    }
  };

  const setDisableButton = () => {
    switch (tableType) {
      case "users":
        const userData: User = data as User;
        if (userData.isRoot) setDisableDeleteButton(!userData.isRoot);
        break;
      case "actors":
        const actorsData: Actor = data as Actor;
        setDisableDeleteButton(!actorsData.movies);
        break;
      case "movies":
        const moviesData: Movie = data as Movie;
        const releasedDate = new Date(moviesData.releasedDate);
        const currentDate = new Date();
        const isDeleteDisabled =
          (Number(currentDate) - Number(releasedDate)) /
            (1000 * 3600 * 24 * 365) >
          1;
        setDisableDeleteButton(isDeleteDisabled);
        break;
    }
  };

  const onClickHandler = (id: string, action: string) => {
    modal.setModalProps(tableType, action, id);
  };

  useEffect(() => {
    if (tableType === "movies") getRatings();
    setDisableButton();
  }, [data]);
  return (
    <tr>
      {headers.map((header, i) => {
        return (
          <td className={i > 0 ? "centered" : ""} key={i}>
            {header.title === "Status" && (
              <span
                className={
                  "badge rounded-pill mx-1 " +
                  (data[header.key as keyof typeof data]
                    ? "bg-success"
                    : "bg-danger")
                }
              >
                {data[header.key as keyof typeof data] ? "Active" : "Inactive"}
              </span>
            )}
            {header.key === "reviews" && <StarRatings ratings={ratings} />}
            {header.key === "newReviews" && newReviews > 0 && (
              <Link to={`/movie/details/${data.id}`}>
                <span className="pointer badge rounded-pill bg-success">
                  {newReviews === 1
                    ? `${newReviews} New Review`
                    : `${newReviews} New Reviews`}
                </span>
              </Link>
            )}
            {header.key === "newReviews" && newReviews === 0 && (
              <span className="badge rounded-pill bg-secondary">
                No New Review
              </span>
            )}
            {header.key === "id" && (
              <>
                {tableType === "movies" && (
                  <Link to={`/movie/details/${data.id}`}>
                    <CustomButton
                      name="view"
                      className="btn btn-primary mx-1"
                      icon={faEye}
                    />
                  </Link>
                )}
                <CustomButton
                  className="btn btn-success mx-1"
                  action="edit"
                  name="editBtn"
                  dataId={data.id}
                  onClickHandler={onClickHandler}
                  icon={faPen}
                />
                <CustomButton
                  name="deleteBtn"
                  className="btn btn-danger"
                  action="delete"
                  dataId={data.id}
                  icon={faTrash}
                  onClickHandler={onClickHandler}
                  disabled={disableDeleteButton}
                />
              </>
            )}
            {i < 4 && <span>{data[header.key as keyof typeof data]}</span>}
          </td>
        );
      })}
    </tr>
  );
};
export default TableRow;
