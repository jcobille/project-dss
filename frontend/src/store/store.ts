import { configureStore } from "@reduxjs/toolkit";
import actorSlice from "../features/actorSlice";
import movieSlice from "../features/movieSlice";
import userSlice from "../features/userSlice";
import currentUserSlice from "../features/currentUserSlice";
import reviewSlice from "../features/reviewSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
    movieList: movieSlice,
    actorList: actorSlice,
    userList: userSlice,
    reviewList: reviewSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
