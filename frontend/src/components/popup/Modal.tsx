import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MovieModalBody } from "./MovieModalBody";
import { ActorModalBody } from "./ActorModalBody";
import { UserModalBody } from "./UserModalBody";
import { ReviewModalBody } from "./ReviewModalBody";
import { LoginBody } from "./LoginBody";
import RegisterBody from "./RegisterBody";
import { RegisterSuccess } from "./RegisterSuccess";

Modal.setAppElement("#root");
interface ModalProps {
  modal: { id?: string; type: string; isOpen: boolean };
  closeModal: (type: string) => void;
  changeModal: (type: string) => void;
}

const CustomModal = ({ modal, closeModal, changeModal }: ModalProps) => {
  return (
    <div>
      <Modal
        isOpen={modal.isOpen}
        className="custom-modal custom-modal-md"
        overlayClassName="overlay-modal"
        closeTimeoutMS={100}
      >
        <button
          className="btn-float-close"
          onClick={() => closeModal(modal.type)}
        >
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </button>
        {modal.type === "login" && (
          <LoginBody
            type={modal.type}
            changeModal={changeModal}
            closeModal={closeModal}
          />
        )}
        {modal.type === "register" && (
          <RegisterBody
            type={modal.type}
            changeModal={changeModal}
            closeModal={closeModal}
          />
        )}
        {modal.type === "successRegistration" && (
          <RegisterSuccess
            type={modal.type}
            changeModal={changeModal}
            closeModal={closeModal}
          />
        )}

        {(modal.type === "addMovie" ||
          modal.type === "editMovie" ||
          modal.type === "deleteMovie") && (
          <MovieModalBody
            movieId={modal.id}
            type={modal.type}
            changeModal={changeModal}
            closeModal={closeModal}
            isOpen={modal.isOpen}
          />
        )}

        {(modal.type === "addActor" ||
          modal.type === "editActor" ||
          modal.type === "deleteActor") && (
          <ActorModalBody
            actorId={modal.id}
            type={modal.type}
            changeModal={changeModal}
            closeModal={closeModal}
            isOpen={modal.isOpen}
          />
        )}

        {(modal.type === "addUser" ||
          modal.type === "editUser" ||
          modal.type === "deleteUser") && (
          <UserModalBody
            userId={modal.id}
            type={modal.type}
            changeModal={changeModal}
            closeModal={closeModal}
            isOpen={modal.isOpen}
          />
        )}

        {(modal.type === "approveReview" || modal.type === "declineReview") && (
          <ReviewModalBody
            reviewId={modal.id}
            type={modal.type}
            changeModal={changeModal}
            closeModal={closeModal}
            isOpen={modal.isOpen}
          />
        )}
      </Modal>
    </div>
  );
};

export default CustomModal;
