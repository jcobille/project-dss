import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Actor, Movie, User } from "../types/ActionTypes";
import { CustomButton, StarRatings } from "./CustomInput";

interface RowProps {
  index: number;
  data: Movie | Actor | User;
  headers: {
    title: string;
    key: string;
  }[];
  changeModal: (type: string, id?: string) => void;
  buttonModalTypes: string[];
  tableType: string;
}

const tableRow = ({
  data,
  headers,
  changeModal,
  buttonModalTypes,
  tableType,
  index,
}: RowProps) => {
  let ratings = 0;
  let newReviews = 0;
  let isDeleteDisabled = tableType !== "user" ? false : true;
  if (data["reviews" as keyof typeof data]) {
    let reviews = data["reviews" as keyof typeof data];
    if (reviews) {
      let length = reviews?.length;
      for (let index = 0; index < length; index++) {
        if (
          (reviews[index]["status" as keyof typeof reviews] as string) ===
          "approved"
        )
          ratings +=
            (reviews[index]["reviewScore" as keyof typeof reviews] as number) /
            length;

        if (
          (reviews[index]["status" as keyof typeof reviews] as string) ===
          "checking"
        )
          newReviews += 1;
      }
    }
  }

  if (data["released_date" as keyof typeof data]) {
    let releasedDate = new Date(
      data["released_date" as keyof typeof data] as string
    );
    let currentDate = new Date();
    isDeleteDisabled =
      (Number(currentDate) - Number(releasedDate)) / (1000 * 3600 * 24 * 365) >
      1;
  }

  if (tableType === "actors") {
    if (data["movies" as keyof typeof data]) {
      isDeleteDisabled = data["movies" as keyof typeof data]?.length === 0;
    } else {
      isDeleteDisabled = true;
    }
  }
  if (tableType === "user" && index === 0) {
    isDeleteDisabled = false;
  }

  return (
    <tr>
      {headers.map((header, i) => {
        if (i < headers.length - 1) {
          if (header.title === "Status") {
            return (
              <td className={i > 0 ? "centered" : ""} key={i}>
                <span
                  className={
                    "badge rounded-pill mx-1 " +
                    (data[header.key as keyof typeof data]
                      ? "bg-success"
                      : "bg-danger")
                  }
                >
                  {data[header.key as keyof typeof data]
                    ? "Active"
                    : "Inactive"}
                </span>
              </td>
            );
          } else if (header.key === "reviews") {
            return (
              <td className={i > 0 ? "centered" : ""} key={i}>
                <StarRatings ratings={ratings} />
              </td>
            );
          } else if (header.key === "newReviews") {
            return (
              <td className={i > 0 ? "centered" : ""} key={i}>
                {newReviews === 1 && (
                  <Link to={`/movie/details/${data.id}`}>
                    <span className="pointer badge rounded-pill bg-success">
                      {newReviews} New Review
                    </span>
                  </Link>
                )}
                {newReviews > 1 && (
                  <span className="pointer badge rounded-pill">
                    {newReviews} New Reviews
                  </span>
                )}
                {newReviews === 0 && (
                  <span className="badge rounded-pill bg-secondary">
                    No New Review
                  </span>
                )}
              </td>
            );
          } else {
            return (
              <td className={i > 0 ? "centered" : ""} key={i}>
                {data[header.key as keyof typeof data]}
              </td>
            );
          }
        } else {
          return (
            <td className="centered" key={i}>
              <CustomButton
                className="btn btn-success mx-1"
                modalType={buttonModalTypes[0]}
                dataId={data.id}
                changeModal={changeModal}
                icon={faPen}
              />
              <CustomButton
                className="btn btn-danger"
                modalType={buttonModalTypes[1]}
                dataId={data.id}
                changeModal={changeModal}
                icon={faTrash}
                disabled={isDeleteDisabled}
              />
            </td>
          );
        }
      })}
    </tr>
  );
};
export default tableRow;
