import React from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUsers } from "@fortawesome/free-solid-svg-icons";

const RelatedMovie = ({ item }) => {
  const { genreList } = useSelector((state) => state.movies);

  console.log("ITEM", item);

  return (
    <div
      className="related-card "
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/${
            item.backdrop_path === null ? item.poster_path : item.backdrop_path
          }` +
          ")",
      }}
    >
      <div className="related-overlay">
        <div className="related-title">{item.title}</div>
        <hr />
        <div>
          {item.genre_ids.map((id) => (
            <Badge bg="danger" key={id} className="detail-genres">
              {genreList?.find((item) => item.id == id).name}
            </Badge>
          ))}
        </div>
        <div className="related-item">
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
    </div>
  );
};

export default RelatedMovie;
