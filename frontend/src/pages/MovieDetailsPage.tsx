import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ModalProps, Movie, Review, User } from "../utils/types";
import { getMovieDetails } from "../features/movieSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { formatDate } from "../utils/misc";
import { ReviewsContainer } from "../components/views/ReviewsContainer";
import { StarRatings } from "../components/views/CustomInput";
import CustomModal from "../components/popup/Modal";
import ReviewInput from "../components/views/ReviewInput";
import { clearReviews, loadReviews } from "../features/reviewSlice";
import { movieRatings } from "../utils/services";
import Cookies from "js-cookie";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [ratings, setRatings] = useState(0);
  const [reviewFound, setReviewFound] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const dispatch = useAppDispatch();
  const user = Cookies.get("token");

  const currentUser = useAppSelector<User>(
    ({ currentUser }) => currentUser.details as User
  );
  const details = useAppSelector<Movie>(
    ({ movieList }) => movieList.details as Movie
  );

  const reviews = useAppSelector<Review[]>(({ reviewList }) => reviewList.data);
  const [modal, setModal] = useState<ModalProps>({
    id: "",
    type: "",
    action: "",
    setModalProps: (newType: string, newAction = "", newId = "") => {
      setModal({ ...modal, type: newType, action: newAction, id: newId });
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(clearReviews());
      dispatch(getMovieDetails(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (details?.reviews) {
      dispatch(loadReviews(details.reviews));
    }
  }, [details]);

  useEffect(() => {
    const { reviewCount } = movieRatings(reviews);
    setReviewFound(false);
    setRatings(ratings);
    setReviewCount(reviewCount);

    reviews.forEach((review) => {
      if (
        review.userId === currentUser.id &&
        (review.status === "approved" || review.status === "checking")
      ) {
        setReviewFound(true);
      }
    });

    if (currentUser.role !== "Admin") {
      let reviewList = reviews.filter(
        (review) =>
          review.status === "approved" || review.userId === currentUser.id
      );
      setReviewList(reviewList);
    } else {
      setReviewList(reviews);
    }
  }, [reviews, currentUser]);

  return (
    <section>
      <div className="section mt-3">
        <div className="section-container dark">
          <div className="row">
            <div className="col-2 p-3">
              <img
                className="img-div"
                alt={details?.title}
                src={details?.image}
              />
              <div className="sub-container">
                <div className="sub-title">
                  <span>
                    <b>Ratings:</b>{" "}
                  </span>
                  <StarRatings ratings={ratings} />
                  <span> / {reviewCount} voted</span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="title" data-testid="title">
                {details?.title}
              </div>
              <p className="sub-title-1" data-testid="description">
                {details?.description}
              </p>
              <div className="row">
                <div className="col-5">
                  <div className="sub-title-1 mt-3">
                    <b>Released</b>:{" "}
                    <span data-testid="releasedDate">
                      {formatDate(details?.releasedDate)}
                    </span>
                  </div>
                  <div className="sub-title-1 mt-1">
                    <b>Duration</b>:
                    <span data-testid="duration">
                      {details?.duration ? `${details?.duration}m` : "N/A"}
                    </span>
                  </div>
                  <div className="sub-title-1 mt-1">
                    <b>Budget</b>:
                    <span data-testid="cost">{details?.cost ?? "N/A"}</span>
                  </div>
                  <div className="sub-title-1 mt-1">
                    <b>Casts</b>:&nbsp;
                    {details?.actors?.map((actor, index) => {
                      if (details.actors) {
                        return (
                          <Link
                            to={`/actor/details/${actor.id}`}
                            className="link"
                            key={index}
                          >
                            <span key={index} className="btn-user">
                              {`${actor.firstName} ${actor.lastName}`}
                              {index < details.actors.length - 1 ? ", " : ""}
                            </span>
                          </Link>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-container dark mt-3">
          <div className="header">
            <div>
              <span className="title">Reviews</span>
            </div>
          </div>
          {!reviewFound && currentUser.id && <ReviewInput />}
          {reviewList.map((review, i) => {
            return <ReviewsContainer data={review} key={i} modal={modal} />;
          })}
          <div className="my-3 text-center">
            {!user && (
              <div
                className="pointer"
                onClick={() => modal.setModalProps("login")}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
                <span>&nbsp;Please login to add a review</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <CustomModal {...modal} />
    </section>
  );
};

export default MovieDetailsPage;
