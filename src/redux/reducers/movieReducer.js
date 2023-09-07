import { createSlice } from "@reduxjs/toolkit";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

let initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  genreList: [],
  loading: true,
  detailMovie: {},
  trailerMovie: {},
  reviewsMovie: {},
  recommendMovie: {},
  searchMovies: {},
  search: false,
  sorted: false,
  sortedMovie: {},
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMovie(state, action) {
      state.popularMovies = action.payload.popularMovies;
      state.topRatedMovies = action.payload.topRatedMovies;
      state.upcomingMovies = action.payload.upcomingMovies;
      state.genreList = action.payload.genreList;
      state.loading = false;
    },
    getMoviesRequest(state, action) {
      state.loading = true;
    },
    getMoviesFailure(state, action) {
      state.loading = false;
    },
    getDetailMovie(state, action) {
      state.detailMovie = action.payload.detailMovie;
      state.trailerMovie = action.payload.trailerMovie;
      state.reviewsMovie = action.payload.reviewsMovie;
      state.recommendMovie = action.payload.recommendMovie;
      state.loading = false;
    },

    getSearchMovie(state, action) {
      state.searchMovies = action.payload.searchMovies;
      state.search = true;
      state.loading = false;
      state.sorted = false;
    },

    getSearchPage(state, action) {
      state.searchMovies = action.payload.searchMovies;
      state.loading = false;
    },
    MovieReload(state, action) {
      state.search = false;
      state.sorted = false;
    },
    SortedMovie(state, action) {
      state.sortedMovie = action.payload.sortedMovie;
      state.sorted = true;
      state.search = false;
      state.loading = false;
    },
    // SortedFilter(state, action) {
    //   state.sortedMovie = action.payload.sortedMovie;
    //   state.sorted = true;
    //   state.search = false;
    //   state.loading = false;
    // },
    getSortedPage(state, action) {
      state.sortedMovie = action.payload.sortedMovie;
      state.loading = false;
    },
  },
});

export const moviesActions = moviesSlice.actions;
export default moviesSlice.reducer;
