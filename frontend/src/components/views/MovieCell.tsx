import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { Movie } from "../types/ActionTypes";
import { getYear } from "../utils/misc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface MovieCellProps {
  data: Movie;
}

const MovieCell = ({ data }: MovieCellProps) => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const openMovieDetails = (id = "") => {
    navigate(`/movie/details/${id}`);
  };
  return (
    <div className="col-2">
      <div
        onMouseEnter={() => setDropdown(true)}
        onMouseLeave={() => setDropdown(false)}
      >
        <div
          className="img-container"
          onClick={() => {
            openMovieDetails(data.id);
          }}
        >
          <img className="img" alt="Avatar" src={data.image} />
          <div className="overlay">
            <button className="circle-button play-btn">
              <FontAwesomeIcon icon={faPlay} size="xl" />
            </button>
          </div>
        </div>
        <div className="dropdown">
          <div className={"dropdown-content-hover " + (dropdown ? "show" : "")}>
            <div className="head">
              <div className="title">{data.title}</div>
              <div className="sub">
                <b>Released:</b> {getYear(data.releasedDate)}
              </div>
            </div>
            <div className="body">{data.description}</div>
            <div
              className="footer text-center"
              onClick={() => openMovieDetails(data.id)}
            >
              <span className="pr-3">Check now &nbsp;</span>
              <FontAwesomeIcon icon={faPlayCircle} size="sm" />
            </div>
          </div>
        </div>
      </div>
      <div className="sub-container">
        <div className="title-1">{data.title}</div>
        <div className="sub-title">
          {getYear(data.releasedDate)} | {data.duration + "m"}
        </div>
      </div>
    </div>
  );
};

export default MovieCell;
