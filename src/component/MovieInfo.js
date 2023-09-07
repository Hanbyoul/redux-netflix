import React from "react";
import { Badge, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUsers } from "@fortawesome/free-solid-svg-icons";

const MovieInfo = ({ item }) => {
  const { genreList } = useSelector((state) => state.movies);
  const navigate = useNavigate();

  const goToMoviesDetail = () => {
    navigate(`/movies/${item.id}`);
  };
  return (
    <Col lg={6} className="movie_info_area">
      <div
        className="background-img"
        style={{
          backgroundImage:
            "url(" +
            `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${
              item.backdrop_path === null
                ? item.poster_path
                : item.backdrop_path
            }` +
            ")",
        }}
      ></div>
      <div className="movie-info-img" onClick={goToMoviesDetail}>
        <div className="card-heder">
          <img
            className="card-min-img"
            src={`https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/${item.poster_path}`}
          />
          <div className="card-heder-title">
            <div>{item.title}</div>
            <div>{item.release_date?.substr(0, 4)}</div>
          </div>
        </div>

        <div className="card-genre">
          {item.genre_ids.map((id) => (
            <Badge bg="danger" key={id} className="detail-genres">
              {genreList.find((item) => item.id == id).name}
            </Badge>
          ))}
        </div>
        <div className="movie_content">
          <p>
            {item.overview === null || item.overview === ""
              ? "내용없음"
              : item.overview.length > 150
              ? item.overview.substring(0, 150) + "..."
              : item.overview}
          </p>
        </div>
        <div className="movie_icons">
          <span>
            <FontAwesomeIcon icon={faStar} className="icon-star" />
            {item.vote_average}
          </span>
          <span>
            <FontAwesomeIcon icon={faUsers} className="icon-users" />
            {item.popularity}
          </span>
          <span className="adult">{item.adult == false ? "" : "청불"}</span>
        </div>
      </div>
    </Col>
  );
};

export default MovieInfo;
