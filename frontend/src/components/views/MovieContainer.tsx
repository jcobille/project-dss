import { Movie } from "../types/ActionTypes";
import MovieCell from "./MovieCell";

interface MovieContainerProps {
  data: Movie[];
  limit: number;
}

const MovieContainer = ({ data, limit }: MovieContainerProps) => {
  if (data.length > 0) {
    return (
      <div className="row">
        {[...Array(limit)].map((_, i) => {
          if (data[i]) {
            return <MovieCell key={i} data={data[i]} />;
          }
        })}
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center">
        No movies yet. Please come back later.
      </div>
    );
  }
};

export default MovieContainer;
