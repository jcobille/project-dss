import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Review, User } from "../types/ActionTypes";
import { useAppSelector } from "../store/hooks";
import { formatDate } from "../utils/misc";
import { StarRatings } from "./CustomInput";

interface ReviewsContainerProps {
  data: Review;
  changeModal?: (type: string, id: string) => void;
}

const ReviewsContainer = ({ data, changeModal }: ReviewsContainerProps) => {
  const currentUser = useAppSelector<User>(
    ({ currentUser }) => currentUser.details as User
  );
  return (
    <div className="my-3">
      <div className="header">
        <b>{`${data.user?.firstName} ${data.user?.lastName}`}</b>
        {currentUser.role === "Admin" && data.status === "checking" && (
          <button
            className="float-end btn btn-outline-danger mx-1"
            onClick={() => {
              changeModal && data.id && changeModal("declineReview", data.id);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
        {currentUser.role === "Admin" && data.status === "checking" && (
          <button
            className="float-end btn btn-outline-success mx-1"
            onClick={() => {
              changeModal && data.id && changeModal("approveReview", data.id);
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        )}
        {currentUser.id === data.userId &&
          ((data.status === "checking" && (
            <span className="float-end badge rounded-pill bg-primary">
              Checking
            </span>
          )) ||
            (data.status === "approved" && (
              <span className="float-end badge rounded-pill bg-success">
                Approved
              </span>
            )) ||
            (data.status === "declined" && (
              <span className="float-end badge rounded-pill bg-danger">
                Declined
              </span>
            )))}
      </div>
      <div className="sub-title">
        <b>Posted date : </b>
        {data.posted_date && formatDate(data.posted_date)}
      </div>
      <div>
        <StarRatings ratings={data.reviewScore} />
      </div>
      <div className="my-3 ">{data.description}</div>
      <hr />
    </div>
  );
};

export default ReviewsContainer;
