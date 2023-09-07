import api from "../api";
import { moviesActions } from "../reducers/movieReducer";

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies(page) {
  return async (dispatch) => {
    try {
      dispatch(moviesActions.getMoviesRequest());

      const popularMovieApi = api.get(
        `movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      );

      const topRatedMovieApi = api.get(
        `movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
      );

      const upcomingMovieApi = api.get(
        `movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
      );

      const genreApi = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );

      let [popularMovies, topRatedMovies, upcomingMovies, genreList] =
        await Promise.all([
          popularMovieApi,
          topRatedMovieApi,
          upcomingMovieApi,
          genreApi,
        ]);

      dispatch(
        moviesActions.getMovie({
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upcomingMovies: upcomingMovies.data,
          genreList: genreList.data.genres,
        })
      );
    } catch (error) {
      //error handling
      dispatch(moviesActions.getMoviesFailure());
    }
  };
}

function getDetailMovie(id) {
  return async (dispatch) => {
    try {
      dispatch(moviesActions.getMoviesRequest());

      const getDetailApi = api.get(
        `movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const getTrailerApi = api.get(
        `movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const getReviewApi = api.get(
        `movie/${id}/reviews?api_key=${API_KEY}&language=en-US`
      );
      const getrecommendApi = api.get(
        `movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
      );
      let [detailMovie, trailerMovie, reviewsMovie, recommendMovie] =
        await Promise.all([
          getDetailApi,
          getTrailerApi,
          getReviewApi,
          getrecommendApi,
        ]);
      dispatch(
        moviesActions.getDetailMovie({
          detailMovie: detailMovie.data,
          trailerMovie: trailerMovie.data.results,
          reviewsMovie: reviewsMovie.data,
          recommendMovie: recommendMovie.data.results,
        })
      );
    } catch (error) {
      dispatch(moviesActions.getMoviesFailure());
    }
  };
}
let keywords = "";
function getSearchMovie(keyword) {
  return async (dispatch) => {
    try {
      dispatch(moviesActions.getMoviesRequest());
      const searchMovieApi = api.get(
        `/search/movie?api_key=${API_KEY}&language=en-US&query=?${keyword}&include_adult=false`
      );
      let [searchMovies] = await Promise.all([searchMovieApi]);
      console.log("DATA", searchMovies);
      dispatch(
        moviesActions.getSearchMovie({ searchMovies: searchMovies.data })
      );
    } catch (error) {
      dispatch(moviesActions.getMoviesFailure());
    }
    keywords = keyword;
    console.log("서치쪽 키워드", keywords);
  };
}

function getSearchPage(page) {
  return async (dispatch) => {
    if (keywords !== "") {
      try {
        dispatch(moviesActions.getMoviesRequest());
        const searchMovieApi = api.get(
          `/search/movie?api_key=${API_KEY}&language=en-US&query=?${keywords}&page=${page}&include_adult=false`
        );
        let [searchMovies] = await Promise.all([searchMovieApi]);
        dispatch(
          moviesActions.getSearchPage({ searchMovies: searchMovies.data })
        );
      } catch (error) {
        dispatch(moviesActions.getMoviesFailure());
      }
    }
  };
}

function MovieReload() {
  return (dispatch) => {
    dispatch(moviesActions.MovieReload());
    console.log("DDD?");
  };
}

let sortType = "";
let MinYear = "";
let MaxYear = "";
function SortedMovie(sortType, MinYear, MaxYear) {
  return async (dispatch) => {
    try {
      dispatch(moviesActions.getMoviesRequest());
      const SortMovieApi = api.get(
        `discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortType}&include_adult=false&primary_release_date.gte=${MinYear}&primary_release_date.lte=${MaxYear}`
      );
      let [sortedMovie] = await Promise.all([SortMovieApi]);

      dispatch(moviesActions.SortedMovie({ sortedMovie: sortedMovie.data }));
    } catch (error) {
      dispatch(moviesActions.getMoviesFailure());
    }
    sortType = sortType;
  };
}

// &primary_release_date.gte=${MinYear}&primary_release_date.lte=${MaxYear}

function getSortedPage(page) {
  return async (dispatch) => {
    try {
      dispatch(moviesActions.getMoviesRequest());
      const SortMovieApi = api.get(
        `discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortType}&include_adult=false&page=${page}&primary_release_date.gte=${MinYear}&primary_release_date.lte=${MaxYear}`
      );
      let [sortedMovie] = await Promise.all([SortMovieApi]);

      dispatch(moviesActions.SortedMovie({ sortedMovie: sortedMovie.data }));
    } catch (error) {
      dispatch(moviesActions.getMoviesFailure());
    }
  };
}

// function SortedFilter(MinYear, MaxYear) {
//   return async (dispatch) => {
//     try {
//       dispatch(moviesActions.getMoviesRequest());
//       const SortMovieApi = api.get(
//         `discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortType}&primary_release_date.gte=${MaxYear}&primary_release_date.lte=${MinYear}&include_adult=false`
//       );
//       let [sortedMovie] = await Promise.all([SortMovieApi]);
//       dispatch(moviesActions.SortedMovie({ sortedMovie: sortedMovie.data }));
//     } catch (error) {
//       dispatch(moviesActions.getMoviesFailure());
//     }
//   };
// }

export const moviesAction = {
  getMovies,
  getDetailMovie,
  getSearchMovie,
  getSearchPage,
  MovieReload,
  SortedMovie,
  getSortedPage,
  // SortedFilter,
};
