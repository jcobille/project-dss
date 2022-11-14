import reducer, {
  createMovie,
  deleteMovie,
  editMovie,
  getActorMovies,
  getMovieDetails,
  getMovies,
  MovieState,
} from "../../features/movieSlice";
import {
  actorMoviesMock,
  editedMovieMockData,
  movieMockData,
  moviesListMock,
  newMovieMockData,
} from "../../utils/db.mocks";
import { Actor, Movie } from "../../utils/types";

describe("Movie Slice ExtraReducers", () => {
  const initialState: MovieState = {
    movies: [],
    actorMovies: [],
    details: {},
    status: "loading",
    error: null,
  };

  const initialStateWithData: MovieState = {
    movies: moviesListMock,
    actorMovies: actorMoviesMock,
    details: movieMockData,
    status: "idle",
    error: null,
  };

  describe("getMovies", () => {
    it("pending", () => {
      const action = {
        type: getMovies.pending.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        actorMovies: [],
        details: {},
        status: "loading",
        error: null,
      });
    });
    it("fulfilled", () => {
      const action = {
        type: getMovies.fulfilled.type,
        payload: moviesListMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: moviesListMock,
        actorMovies: [],
        details: {},
        status: "idle",
        error: null,
      });
    });
    it("rejected", () => {
      const action = {
        type: getMovies.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        actorMovies: [],
        details: {},
        status: "idle",
        error: null,
      });
    });
  });

  describe("getMovieDetails", () => {
    it("pending", () => {
      const action = {
        type: getMovieDetails.pending.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        actorMovies: [],
        details: {},
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getMovieDetails.fulfilled.type,
        payload: movieMockData,
      };
      const state = reducer(initialStateWithData, action);
      expect(state.details).toEqual(movieMockData);
    });

    it("rejected", () => {
      const action = {
        type: getMovieDetails.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        actorMovies: [],
        details: {},
        status: "idle",
        error: null,
      });
    });
  });

  describe("getActorMovies", () => {
    it("pending", () => {
      const action = {
        type: getActorMovies.pending.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        actorMovies: [],
        details: {},
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getActorMovies.fulfilled.type,
        payload: getActorMovies,
      };
      const state = reducer(initialState, action);
      expect(state.actorMovies).toEqual(getActorMovies);
    });

    it("rejected", () => {
      const action = {
        type: getActorMovies.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        actorMovies: [],
        details: {},
        status: "idle",
        error: null,
      });
    });
  });

  describe("createMovie", () => {
    it("pending", () => {
      const action = {
        type: createMovie.pending.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        actorMovies: [],
        details: {},
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: createMovie.fulfilled.type,
        payload: newMovieMockData,
      };
      const state = reducer(initialStateWithData, action);
      const movie = state.movies.find(
        (movie) => movie.id === newMovieMockData.id
      );
      expect(movie).toBeTruthy();
    });

    it("rejected", () => {
      const action = {
        type: createMovie.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        actorMovies: [],
        details: {},
        status: "idle",
        error: null,
      });
    });
  });

  describe("editMovie", () => {
    it("pending", () => {
      const action = {
        type: editMovie.pending.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        actorMovies: [],
        details: {},
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: editMovie.fulfilled.type,
        payload: editedMovieMockData,
      };
      const state = reducer(initialStateWithData, action);
      expect(state.movies[0]).toEqual(editedMovieMockData);
    });

    it("rejected", () => {
      const action = {
        type: editMovie.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        actorMovies: [],
        details: {},
        status: "idle",
        error: null,
      });
    });
  });

  describe("deleteMovie", () => {
    it("pending", () => {
      const action = {
        type: deleteMovie.pending.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        actorMovies: [],
        details: {},
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: deleteMovie.fulfilled.type,
        payload: { id: "635d3d39425fc647181495f2" },
      };
      const state = reducer(initialState, action);
      const movie = state.movies.find((movie) => {
        movie.id === "635d3d39425fc647181495f2";
      });
      expect(movie).toBeUndefined();
    });

    it("rejected", () => {
      const action = {
        type: deleteMovie.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        actorMovies: [],
        details: {},
        status: "idle",
        error: null,
      });
    });
  });
});
