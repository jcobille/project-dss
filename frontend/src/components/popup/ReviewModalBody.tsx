import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { editReview } from "../../features/reviewSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { ModalProps } from "../../utils/types";

export const ReviewModalBody = (props: ModalProps) => {
  const dispatch = useAppDispatch();
  let title = props.action === "approved" ? "Approve" : "Decline";
  const submitHandler = () => {
    if (props.id && props.action) {
      dispatch(editReview({ id: props.id, status: props.action }));
      props.setModalProps("");
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
