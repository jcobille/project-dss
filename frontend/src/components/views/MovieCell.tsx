import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { Movie } from "../../utils/types";
import { getYear } from "../../utils/misc";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface MovieCellProps {
  data: Movie;
}

const MovieCell = ({ data }: MovieCellProps) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="col-1-5" data-testid="movieCell">
      <div className="pb-3">
        <div
          onMouseEnter={() => setDropdown(true)}
          onMouseLeave={() => setDropdown(false)}
          data-testid="movieCardTrigger"
        >
          <Link
            to={`/movie/details/${data.id}`}
            className="link"
            data-testid="movieLink"
          >
            <div className="img-container">
              <img className="img" alt="Avatar" src={data.image} />
              <div className="overlay">
                <button className="circle-button play-btn">
                  <FontAwesomeIcon icon={faPlay} size="xl" />
                </button>
              </div>
            </div>
          </Link>
          {dropdown && (
            <div className="dropdown" data-testid="movieDetailsExpected">
              <div className={"dropdown-content-hover show"}>
                <div className="head">
                  <div className="title">{data.title}</div>
                  <div className="sub">
                    <b>Released:</b> {getYear(data.releasedDate)}
                  </div>
                </div>
                <div className="body">{data.description}</div>
                <Link to={`/movie/details/${data.id}`} className="link">
                  <div className="footer text-center">
                    <span className="pr-3">Check now &nbsp;</span>
                    <FontAwesomeIcon icon={faPlayCircle} size="sm" />
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="sub-container">
          <div className="title-1">{data.title}</div>
          <div className="sub-title">
            {getYear(data.releasedDate)} | {data.duration + "m"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCell;
