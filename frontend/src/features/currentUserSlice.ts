import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../utils/types";
import { axiosCall } from "../utils/api";
import Cookies from "js-cookie";
interface UserState {
  details: {};
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  details: {},
  status: "idle",
  error: null,
};

export const createUser = createAsyncThunk<User, User, { rejectValue: string }>(
  "user/create",
  async (payload, thunkAPI) => {
    const response = await axiosCall("/signup", "POST", payload);
    if (!response.status) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response.data as User;
  }
);

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("user/login", async (payload, thunkAPI) => {
  const response = await axiosCall("/signin", "POST", payload);
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }
  const currentTime = new Date().getTime();
  const inTenMinutes = new Date(currentTime + 10 * 60 * 1000);

  Cookies.set("token", response.data.token, { expires: inTenMinutes });
  Cookies.set("expires", inTenMinutes.toString(), { expires: inTenMinutes });

  return response.data as User;
});

export const currentAuthUser = createAsyncThunk<
  User,
  undefined,
  { rejectValue: string }
>("user/details", async (payload, thunkAPI) => {
  const response = await axiosCall("/whoami", "GET");

  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }
  return response.data as User;
});

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    clearErrorMessage(state) {
      state.error = "";
    },
    clearCurrentUser(state) {
      state.details = {};
      Cookies.remove("token");
      Cookies.remove("expires");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(loginUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(createUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(createUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(currentAuthUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(currentAuthUser.fulfilled, (state, { payload }) => {
      state.details = payload;
      state.status = "idle";
    });

    builder.addCase(currentAuthUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
  },
});
export const { clearErrorMessage, clearCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
