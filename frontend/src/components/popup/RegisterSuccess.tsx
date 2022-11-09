import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const RegisterSuccess = () => {
  return (
    <div>
      <div className="custom-modal-header">
        <FontAwesomeIcon icon={faCheckCircle} size="5x" />
        <div className="title mt-4">Successfully Registered!</div>
      </div>
      <div className="custom-modal-body">
        <div>Please wait for the admin to activate your account</div>
      </div>
    </div>
  );
};
