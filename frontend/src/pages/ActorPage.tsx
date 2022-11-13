import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Actor } from "../utils/types";
import { searchActorById } from "../features/actorSlice";
import { getActorMovies } from "../features/movieSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import MovieContainer from "../components/views/MovieContainer";

const ActorPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const actor = useAppSelector(({ actorList }) => actorList.selectedActor);
  const movieList = useAppSelector(({ movieList }) => movieList.actorMovies);
  const [actorDetails, setActorDetails] = useState<Actor>();
  const actorName = `${actorDetails?.firstName} ${actorDetails?.lastName}`;
  useEffect(() => {
    if (id) {
      dispatch(searchActorById(id));
      dispatch(getActorMovies(id));
    }
  }, [id]);
  useEffect(() => {
    if (actor.id) {
      setActorDetails(actor);
    }
  }, [actor]);
  return (
    <section>
      <div className="section mt-3">
        <div className="section-container dark">
          <div className="row">
            <div className="col-2 p-3">
              <img
                className="img-div"
                alt={actorName}
                src={actorDetails?.image}
                data-testid="actorImg"
              />
            </div>
            <div className="col">
              <div className="title" data-testid="actorName">
                {actorName}
              </div>
              <div className="row">
                <div className="col-5">
                  <div className="sub-title-1 mt-3">
                    <b>Age</b>:{" "}
                    <span data-testid="actorAge">{actorDetails?.age}</span>
                  </div>
                  <div className="sub-title-1 mt-1">
                    <b>Gender</b>:{" "}
                    <span data-testid="actorGender">{`${actorDetails?.gender}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-container dark mt-3">
          <div className="header">
            <div>
              <span className="title" data-testid="actorMoviesTitle">{actorName}'s Movies</span>
            </div>
            <MovieContainer movies={movieList} limit={32} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActorPage;
