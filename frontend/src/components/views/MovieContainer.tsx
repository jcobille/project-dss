import { Movie } from "../../utils/types";
import MovieCell from "./MovieCell";

interface MovieContainerProps {
  movies: Movie[];
  limit: number;
}

const MovieContainer = ({ movies, limit }: MovieContainerProps) => {
  return (
    <div className="row" data-testid="movieContainer">
      {movies.map((movie, i) => {
        if (movie) {
          return <MovieCell key={i} data={movie} />;
        }
      })}
    </div>
  );
};

export default MovieContainer;
