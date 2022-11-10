import Modal, { setAppElement } from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MovieModalBody } from "./MovieModalBody";
import { ActorModalBody } from "./ActorModalBody";
import { UserModalBody } from "./UserModalBody";
import { ReviewModalBody } from "./ReviewModalBody";
import { LoginBody } from "./LoginBody";
import RegisterBody from "./RegisterBody";
import { RegisterSuccess } from "./RegisterSuccess";
import { useEffect, useState } from "react";
import { ModalProps } from "../types/ActionTypes";

const CustomModal = (props: ModalProps) => {
  setAppElement("#root");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    props.type ? setIsOpen(true) : setIsOpen(false);
  }, [props.type]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        className="custom-modal custom-modal-md"
        overlayClassName="overlay-modal"
        closeTimeoutMS={100}
      >
        <button
          className="btn-float-close"
          onClick={() => props.setModalProps("")}
        >
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </button>
        {props.type === "login" && <LoginBody {...props} />}
        {props.type === "register" && <RegisterBody {...props} />}
        {props.type === "successRegistration" && <RegisterSuccess />}
        {props.type === "movies" && <MovieModalBody {...props} />}
        {props.type === "actors" && <ActorModalBody {...props} />}
        {props.type === "users" && <UserModalBody {...props} />}
        {props.type === "reviews" && <ReviewModalBody {...props} />}
      </Modal>
    </div>
  );
};

export default CustomModal;
