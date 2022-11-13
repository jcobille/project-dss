import { Actor, Movie, Review } from "./types";

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
      type = "movie";
      data = searchedMovies;
    } else {
      const searchedActors = actorList.filter(
        ({ firstName, lastName }) =>
          firstName.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          lastName.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );

      if (searchedActors.length > 0) {
        type = "actor";
        data = searchedActors;
      }
    }
  }

  return { type: type, data: data };
};

export const movieRatings = (reviews: Review[]) => {
  let ratings = 0;
  let reviewCount = 0;
  if (reviews) {
    reviews.forEach((review: Review) => {
      if (review.status === "approved") {
        ratings += review.reviewScore;
        reviewCount += 1;
      }
    });
    ratings = ratings / reviewCount;
  }
  return { ratings, reviewCount };
};
