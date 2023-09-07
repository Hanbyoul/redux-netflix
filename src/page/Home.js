import React, { useEffect } from "react";
import { moviesAction } from "../redux/actions/moviesAction";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../component/Banner";
import MovieSlide from "../component/MovieSlide";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upcomingMovies, loading } =
    useSelector((state) => state.movies);

  let test = {};

  useEffect(() => {
    dispatch(moviesAction.getMovies());
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <ClipLoader color="red" loading={loading} size={150} />
      </div>
    );
  }
  return (
    <div>
      <Banner movie={popularMovies.results[1]} />
      <div className="contain">
        <h1 className="sub-title">PopularMovies</h1>
        <MovieSlide movies={popularMovies} />
        <h1>TopRatedMovies</h1>
        <MovieSlide movies={topRatedMovies} />
        <h1>UpcomingMovies</h1>
        <MovieSlide movies={upcomingMovies} />
      </div>
    </div>
  );
};

export default Home;
