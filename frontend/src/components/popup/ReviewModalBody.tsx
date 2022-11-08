import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { editReview } from "../features/reviewSlice";
import { useAppDispatch } from "../store/hooks";

interface BodyProps {
  reviewId?: string;
  type: string;
  changeModal: (type: string) => void;
  closeModal: (type: string) => void;
  isOpen: boolean;
}
export const ReviewModalBody = ({ reviewId, type, closeModal }: BodyProps) => {
  const dispatch = useAppDispatch();
  let title = type === "approveReview" ? "Approve" : "Decline";
  const submitHandler = () => {
    if (reviewId) {
      let status = type === "approveReview" ? "approved" : "declined";
      dispatch(editReview({ id: reviewId, status: status }));
      closeModal(type);
    }
  };

  return (
    <div>
      <div className="custom-modal-header">
        <div className="title">{title} Review</div>
      </div>
      <div className={"custom-modal-body text-center"}>
        <div className="form-input">
          <div className="pb-3">
            <FontAwesomeIcon icon={faQuestionCircle} size="4x" />
          </div>
          <span>
            Are you sure you want to <br /> {title.toLowerCase()} this review?
          </span>
        </div>
      </div>
      <div className="footer py-2">
        <button
          type="submit"
          className="custom-btn full-width-button"
          onClick={submitHandler}
        >
          {title}
        </button>
      </div>
    </div>
  );
};
