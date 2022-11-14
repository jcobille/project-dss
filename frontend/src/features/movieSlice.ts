import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Actor, Movie } from "../utils/types";
import { axiosCall } from "../utils/api";

type returnError = {
  message: string;
};

export interface MovieState {
  movies: Movie[];
  actorMovies: Movie[];
  details: object;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  actorMovies: [],
  details: {},
  status: "loading",
  error: null,
};

/* It will create the movie when all the required details are filled */
export const createMovie = createAsyncThunk<
  Movie,
  {
    title: string;
    releasedDate: string;
    duration: string;
    image: string;
    cost: string;
    description: string;
    actors: Actor[];
  },
  { rejectValue: returnError }
>("movie/create", async (payload, thunkAPI) => {
  const actorsList = payload.actors;
  const data = {
    ...payload,
    duration: Number(payload.duration),
    actors: undefined,
  };

  const response = await axiosCall("/movie", "POST", data);
  await axiosCall(`/movie/${response.id}/actors`, "POST", actorsList);
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  }
  return response.data as Movie;
});

/* It will edit the movie based on the id provided */
export const editMovie = createAsyncThunk<
  Movie,
  {
    id: string;
    image: string;
    cost: string;
    description: string;
    actors: Actor[];
  },
  { rejectValue: returnError }
>("movie/edit", async (payload, thunkAPI) => {
  const actorsList = payload.actors;
  const data = { ...payload, actors: undefined };
  const response = await axiosCall(`/movie/${payload.id}`, "PATCH", data);
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  } else {
    await axiosCall(`/movie/${payload.id}/actors`, "POST", actorsList);
  }
  return payload as Movie;
});

/* It will delete the movie based on the id provided */
export const deleteMovie = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: returnError }
>("movie/delete", async (payload, thunkAPI) => {
  const response = await axiosCall(`/movie/${payload}`, "DELETE");
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  }
  return { id: payload };
});

/* It will get all movies */
export const getMovies = createAsyncThunk<
  Movie[],
  undefined,
  { rejectValue: returnError }
>("movies/fetch", async (state, thunkAPI) => {
  const response = await axiosCall("/movies", "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  }

  return response.data as Movie[];
});

/* It will get movie details */
export const getMovieDetails = createAsyncThunk<
  Movie,
  string,
  { rejectValue: returnError }
>("movie/details", async (id: string, thunkAPI) => {
  const response = await axiosCall(`/movie/${id}`, "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  }
  return response.data as Movie;
});

/* It will get all the actor's movies*/
export const getActorMovies = createAsyncThunk<
  Movie[],
  string,
  { rejectValue: returnError }
>("actor/movies", async (id: string, thunkAPI) => {
  const response = await axiosCall(`/actors/${id}/movies`, "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  }
  return response.data as Movie[];
});

/* It will get all the movie based on the payload*/
export const searchMovies = createAsyncThunk<
  Movie[],
  string,
  { rejectValue: string }
>("actor/details", async (payload, thunkAPI) => {
  const response = await axiosCall(`/movies/${payload}`, "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }
  return response.data as Movie[];
});

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createMovie.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(createMovie.fulfilled, (state, { payload }) => {
      state.movies.push(payload);
      state.status = "idle";
    });

    builder.addCase(createMovie.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    builder.addCase(editMovie.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(editMovie.fulfilled, (state, { payload }) => {
      state.movies = state.movies.map((movies) =>
        movies.id === payload.id ? { ...movies, ...payload } : movies
      );

      state.status = "idle";
    });

    builder.addCase(editMovie.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    builder.addCase(deleteMovie.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(deleteMovie.fulfilled, (state, { payload }) => {
      state.movies = state.movies.filter(({ id }) => id !== payload.id);
      state.status = "idle";
    });

    builder.addCase(deleteMovie.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    builder.addCase(getMovies.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(getMovies.fulfilled, (state, { payload }) => {
      state.movies = payload;
      state.status = "idle";
    });

    builder.addCase(getMovies.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    builder.addCase(getMovieDetails.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(getMovieDetails.fulfilled, (state, { payload }) => {
      state.details = payload;
      state.status = "idle";
    });

    builder.addCase(getMovieDetails.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    builder.addCase(getActorMovies.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(getActorMovies.fulfilled, (state, { payload }) => {
      state.actorMovies = payload;
      state.status = "idle";
    });

    builder.addCase(getActorMovies.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});
export default movieSlice.reducer;
