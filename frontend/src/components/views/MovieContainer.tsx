import { Movie } from "../types/ActionTypes";
import MovieCell from "./MovieCell";

interface MovieContainerProps {
  data: Movie[];
  limit: number;
}

const MovieContainer = ({ data, limit }: MovieContainerProps) => {
  return (
    <div className="row">
      {[...Array(limit)].map((_, i) => {
        if (data[i]) {
          return <MovieCell key={i} data={data[i]} />;
        }
      })}
    </div>
  );
};

export default MovieContainer;
