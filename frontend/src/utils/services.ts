import { Actor, Movie } from "./types";

export const searchActorMovie = (
  value: string,
  movieList: Movie[],
  actorList: Actor[]
) => {
  let type: string = "";
  let data: Movie[] | Actor[] = [];

  if (value) {
    const searchedMovies = movieList.filter(
      (movie) => movie.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );

    if (searchedMovies.length > 0) {
      type = "Movie";
      data = searchedMovies;
    } else {
      const searchedActors = actorList.filter(
        ({ firstName, lastName }) =>
          firstName.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          lastName.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );

      if (searchedActors.length > 0) {
        type = "Actor";
        data = searchedActors;
      }
    }
  }

  return { type: type, data: data };
};
