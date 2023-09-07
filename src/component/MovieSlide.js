import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "./MovieCard";

const MovieSlide = ({ movies }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1850 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1850, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    // <Carousel responsive={responsive} className="slid-area">
    <Carousel responsive={responsive} showDots={true} className="slide-area">
      {movies.results.map((item) => (
        <MovieCard item={item} key={item} />
      ))}
    </Carousel>
  );
};

export default MovieSlide;
