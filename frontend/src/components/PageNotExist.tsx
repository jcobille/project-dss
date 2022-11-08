import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
export const PageNotExist = () => {
  return (
    <div className="full-section">
      <div className="text-center">
        <FontAwesomeIcon icon={faFaceFrown} size="10x" />
      </div>
      <div className="text-center custom-text">
        <span className="large">404</span>
      </div>
      <div className="text-center custom-text">
        <span className="small">Page Not Found</span>
      </div>

      <div className="text-center custom-text mt-3">
        <span>The page you are looking for doesn't exist or an error occurred.</span>
      </div>
    </div>
  );
};
