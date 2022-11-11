import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Actor } from "../utils/types";
import { axiosCall } from "../utils/api";

interface ActorState {
  actors: Actor[];
  selectedActor: Actor;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ActorState = {
  actors: [],
  selectedActor: {
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    image: "",
  },
  status: "idle",
  error: null,
};

export const getActors = createAsyncThunk<
  Actor[],
  undefined,
  { rejectValue: string }
>("actor/fetch", async (payload, thunkAPI) => {
  const response = await axiosCall(`/actor`, "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }
  return response.data as Actor[];
});

export const searchActors = createAsyncThunk<
  Actor[],
  string,
  { rejectValue: string }
>("actors/", async (payload, thunkAPI) => {
  const response = await axiosCall(`/actor/${payload}`, "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }
  return response.data as Actor[];
});

export const searchActorById = createAsyncThunk<
  Actor,
  string,
  { rejectValue: string }
>("actor/details", async (payload, thunkAPI) => {
  const response = await axiosCall(`/actor/details/${payload}`, "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }
  return response.data as Actor;
});

export const createActor = createAsyncThunk<
  Actor,
  Actor,
  { rejectValue: string }
>("actor/create", async (payload, thunkAPI) => {
  let data = { ...payload, age: Number(payload.age) };
  const response = await axiosCall(`/actor`, "POST", data);
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }
  return response.data as Actor;
});

export const editActor = createAsyncThunk<
  Actor,
  Actor,
  { rejectValue: string }
>("actor/edit", async (payload, thunkAPI) => {
  let data = { ...payload, age: Number(payload.age) };
  const response = await axiosCall(`/actor/${payload.id}`, "PATCH", data);
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }
  return payload;
});

export const deleteActor = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>("actor/delete", async (payload, thunkAPI) => {
  const response = await axiosCall(`/actor/${payload}`, "DELETE");
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }
  return { id: payload };
});

export const actorSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearErrorMessage(state) {
      state.error = "";
    },
    clearActorsList(state) {
      state.actors = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActors.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(getActors.fulfilled, (state, { payload }) => {
      state.actors = payload;
      state.status = "idle";
    });

    builder.addCase(getActors.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(searchActors.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(searchActors.fulfilled, (state, { payload }) => {
      state.actors = payload;
      state.status = "idle";
    });

    builder.addCase(searchActors.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(searchActorById.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(searchActorById.fulfilled, (state, { payload }) => {
      state.selectedActor = payload;
      state.status = "idle";
    });

    builder.addCase(searchActorById.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(createActor.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(createActor.fulfilled, (state, { payload }) => {
      state.actors.push(payload);
      state.status = "idle";
    });

    builder.addCase(createActor.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(editActor.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(editActor.fulfilled, (state, { payload }) => {
      state.actors = state.actors.map((actor) =>
        actor.id === payload.id ? { ...actor, ...payload } : actor
      );
      state.status = "idle";
    });

    builder.addCase(editActor.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(deleteActor.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(deleteActor.fulfilled, (state, { payload }) => {
      state.actors = state.actors.filter(({ id }) => id !== payload.id);
      state.status = "idle";
    });

    builder.addCase(deleteActor.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
  },
});
export const { clearActorsList } = actorSlice.actions;
export default actorSlice.reducer;
