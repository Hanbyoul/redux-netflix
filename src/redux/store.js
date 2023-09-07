import movieReducer from "./reducers/movieReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store;
