import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/ActionTypes";
import { axiosCall } from "../utils/api";

interface UserState {
  data: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  data: [],
  status: "idle",
  error: null,
};

export const getUsers = createAsyncThunk<
  User[],
  undefined,
  { rejectValue: string }
>("user/fetch", async (payload, thunkAPI) => {
  const response = await axiosCall("/users/list", "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }

  return response.data as User[];
});

export const addUser = createAsyncThunk<User, User, { rejectValue: string }>(
  "user/add",
  async (payload, thunkAPI) => {
    const response = await axiosCall("/signup", "POST", payload);
    if (!response.status) {
      return thunkAPI.rejectWithValue(response.message);
    }

    return response.data as User;
  }
);

export const editUser = createAsyncThunk<User, User, { rejectValue: string }>(
  "user/edit",
  async (payload, thunkAPI) => {
    const response = await axiosCall(`/user/${payload.id}`, "PATCH", payload);
    if (!response.status) {
      return thunkAPI.rejectWithValue(response.message);
    }

    return payload;
  }
);

export const deleteUser = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>("user/delete", async (payload, thunkAPI) => {
  const response = await axiosCall(`/user/${payload}`, "DELETE");
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }
  return { id: payload };
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrorMessage(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = "idle";
    });

    builder.addCase(getUsers.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(addUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(addUser.fulfilled, (state, { payload }) => {
      state.data.push(payload);
      state.status = "idle";
    });

    builder.addCase(addUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(editUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(editUser.fulfilled, (state, { payload }) => {
      state.data = state.data.map((data) =>
        data.id === payload.id ? { ...data, ...payload } : data
      );
      state.status = "idle";
    });

    builder.addCase(editUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.data = state.data.filter(({ id }) => id !== payload.id);
      state.status = "idle";
    });

    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
  },
});
export const { clearErrorMessage } = userSlice.actions;
export default userSlice.reducer;
