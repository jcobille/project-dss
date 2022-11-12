import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalProps, Review, User } from "../../utils/types";
import { useAppSelector } from "../../hooks/hooks";
import { formatDate } from "../../utils/misc";
import { StarRatings } from "./CustomInput";

export interface ReviewsContainerProps {
  data: Review;
  modal?: ModalProps;
}

export const ReviewsContainer = ({ data, modal }: ReviewsContainerProps) => {
  const approveAndDeclineHandler = (action: string) => {
    modal?.setModalProps("reviews", action, data.id);
  };
  const currentUser = useAppSelector<User>(
    ({ currentUser }) => currentUser.details as User
  );

  const userFullName = data.user
    ? `${data.user?.firstName} ${data.user?.lastName}`
    : `${currentUser.firstName} ${currentUser.lastName}`;

  return (
    <div className="my-3">
      <div className="header">
        <span data-testid="reviewerName">
          <b>{userFullName}</b>
        </span>
        {currentUser.role === "Admin" && data.status === "checking" && (
          <button
            className="float-end btn btn-outline-danger mx-1"
            onClick={() => {
              approveAndDeclineHandler("declined");
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
        {currentUser.role === "Admin" && data.status === "checking" && (
          <button
            className="float-end btn btn-outline-success mx-1"
            onClick={() => {
              approveAndDeclineHandler("approved");
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        )}
        {currentUser.id === data.userId && data.status === "checking" && (
          <span className="float-end badge rounded-pill bg-primary">
            Checking
          </span>
        )}

        {currentUser.id === data.userId && data.status === "approved" && (
          <span className="float-end badge rounded-pill bg-success">
            Approved
          </span>
        )}

        {currentUser.id === data.userId && data.status === "declined" && (
          <span className="float-end badge rounded-pill bg-danger">
            Declined
          </span>
        )}
      </div>
      <div className="sub-title">
        <b>Posted date : </b>
        {data.postedDate && formatDate(data.postedDate)}
      </div>
      <div>
        <StarRatings ratings={data.reviewScore} />
      </div>
      <div className="my-3 ">{data.description}</div>
      <hr />
    </div>
  );
};
