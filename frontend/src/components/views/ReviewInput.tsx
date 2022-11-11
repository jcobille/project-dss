import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Review, User } from "../../utils/types";
import { addReview } from "../../features/reviewSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getCookie } from "../../utils/cookie";
import { CustomInput, StarRatings } from "./CustomInput";

const ReviewInput = () => {
  const user = getCookie();
  const { id } = useParams();
  const currentUser = useAppSelector<User>(
    ({ currentUser }) => currentUser.details as User
  );
  const dispatch = useAppDispatch();
  const [ratingError, setRatingError] = useState(false);
  const [userReview, setUserReview] = useState<Review>({
    movieId: id,
    userId: currentUser.id,
    description: "",
    reviewScore: 0,
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserReview({ ...userReview, [name]: value });
  };

  const ratingHandler = (rate: number) => {
    setUserReview({ ...userReview, reviewScore: rate + 1 });
    if (ratingError) setRatingError(false);
  };

  const reviewSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (userReview.reviewScore === 0) {
      setRatingError(true);
      return;
    }

    dispatch(addReview(userReview));
  };

  useEffect(() => {
    setUserReview({ ...userReview, userId: currentUser.id });
  }, [currentUser]);
  return (
    <div className="mb-4">
      {user && currentUser.role !== "Admin" && (
        <div>
          <div>
            <CustomInput
              type="text"
              className="input-comment mb-1"
              name="description"
              placeHolder={`Giving a review as ${currentUser.firstName} ${currentUser.lastName}`}
              changeHandler={changeHandler}
              value={userReview?.description}
            />
          </div>
          <span>Ratings: </span>
          <StarRatings
            ratings={userReview?.reviewScore}
            changeHandler={ratingHandler}
          />
          {ratingError && (
            <span className="danger"> * Please give us your rating</span>
          )}
          <button
            className="align-right btn-pill"
            onClick={reviewSubmit}
            disabled={!userReview.description}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
export default ReviewInput;
