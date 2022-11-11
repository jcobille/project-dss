import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Review } from "../utils/types";
import { axiosCall } from "../utils/api";

interface ReviewState {
  data: Review[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReviewState = {
  data: [],
  status: "idle",
  error: null,
};

export const loadReviews = createAsyncThunk<
  Review[],
  Review[],
  { rejectValue: string }
>("review/load", async (payload, thunkAPI) => {
  return payload;
});
export const addReview = createAsyncThunk<
  Review,
  Review,
  { rejectValue: string }
>("review/add", async (payload, thunkAPI) => {
  const response = await axiosCall("/review", "POST", payload);
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }

  return response.data as Review;
});

export const editReview = createAsyncThunk<
  Review,
  { id: string; status: string },
  { rejectValue: string }
>("review/edit", async (payload, thunkAPI) => {
  const response = await axiosCall(`/review/${payload.id}`, "PATCH", payload);
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }

  return payload as Review;
});

export const deleteReview = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>("review/delete", async (payload, thunkAPI) => {
  const response = await axiosCall(`/review/${payload}`, "DELETE");
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }
  return { id: payload };
});

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearErrorMessage(state) {
      state.error = "";
    },
    clearReviews(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadReviews.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(loadReviews.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = "idle";
    });

    builder.addCase(loadReviews.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(addReview.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(addReview.fulfilled, (state, { payload }) => {
      state.data.push(payload);
      state.status = "idle";
    });

    builder.addCase(addReview.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(editReview.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(editReview.fulfilled, (state, { payload }) => {
      state.data = state.data.map((data) =>
        data.id === payload.id ? { ...data, ...payload } : data
      );
      state.status = "idle";
    });

    builder.addCase(editReview.rejected, (state, { payload }) => {
      console.log(payload);
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(deleteReview.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(deleteReview.fulfilled, (state, { payload }) => {
      state.data = state.data.filter(({ id }) => id !== payload.id);
      state.status = "idle";
    });

    builder.addCase(deleteReview.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
  },
});
export const { clearErrorMessage, clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
