import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DetailBanner from "../component/DetailBanner";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUsers,
  faClapperboard,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import YouTube from "react-youtube";
import { moviesAction } from "../redux/actions/moviesAction";
import ClipLoader from "react-spinners/ClipLoader";
import MovieReview from "../component/MovieReview";
import RelatedMovie from "../component/RelatedMovie";

const MoviesDetail = () => {
  const dispatch = useDispatch();
  const { detailMovie, trailerMovie, loading, reviewsMovie, recommendMovie } =
    useSelector((state) => state.movies);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isdisabled, setIsDisabled] = useState("REVIEWS");
  let { id } = useParams();
  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  console.log(reviewsMovie, recommendMovie);

  const ChangeHandler = (e) => {
    if (e.target.value === "REVIEWS") {
      setIsDisabled("REVIEWS");
    } else {
      setIsDisabled("RELATED MOVIES");
    }
  };

  useEffect(() => {
    dispatch(moviesAction.getDetailMovie(id));
  }, []);

  console.log("detailMovie", detailMovie);

  if (loading) {
    return (
      <div className="loading">
        <ClipLoader color="red" loading={loading} size={150} />
      </div>
    );
  }

  return (
    <div>
      <DetailBanner detailMovie={detailMovie} />
      <Container>
        <Row className="movie-detail">
          <Col xl={6} lg={4} className="detail-first">
            <img
              className="detail-img"
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${detailMovie.poster_path}`}
              alt=""
            />
          </Col>
          <Col xl={6} lg={8}>
            {detailMovie.genres?.map((item) => (
              <Badge bg="danger" className="detail-genres" key={item.id}>
                {item.name}
              </Badge>
            ))}
            <h1>{detailMovie.title}</h1>
            <h4>{detailMovie.tagline}</h4>
            <div className="detail-item">
              <span>
                <FontAwesomeIcon icon={faStar} className="icon-star" />
                {detailMovie.vote_average}
              </span>
              <span>
                <FontAwesomeIcon icon={faUsers} className="icon-users" />
                {detailMovie.popularity}
              </span>
            </div>
            <div className="overview">{detailMovie.overview}</div>
            <div className="detail-badges-area">
              <div>
                <Badge bg="danger" className="detail-bot">
                  Budget
                </Badge>
                {detailMovie.budget === 0 ? "" : "$" + detailMovie.budget}
              </div>
              <div>
                <Badge bg="danger" className="detail-bot">
                  Revenue
                </Badge>
                ${detailMovie.revenue}
              </div>
              <div>
                <Badge bg="danger" className="detail-bot">
                  Release Day
                </Badge>
                {detailMovie.release_date}
              </div>
              <div>
                <Badge bg="danger" className="detail-bot">
                  Time
                </Badge>
                {detailMovie.runtime}분
              </div>
            </div>
            <div className="trailer-area">
              <span className="trailer" onClick={handleShow}>
                <FontAwesomeIcon
                  icon={faClapperboard}
                  className="trailer-icon"
                />
                Watch Trailer
              </span>
              <div>
                <FontAwesomeIcon
                  icon={faHeartCirclePlus}
                  className="heart-icon"
                />
              </div>
            </div>
          </Col>
        </Row>
        <div className="detail-puter-container">
          <button
            className={
              isdisabled === "REVIEWS" ? "puter-btn btn-active" : "puter-btn"
            }
            value={"REVIEWS"}
            onClick={(e) => ChangeHandler(e)}
          >
            {`REVIEWS(${reviewsMovie.results?.length})`}
          </button>
          <button
            className={
              isdisabled === "RELATED MOVIES"
                ? "puter-btn btn-active"
                : "puter-btn"
            }
            value={"RELATED MOVIES"}
            onClick={(e) => ChangeHandler(e)}
          >{`RELATED MOVIES(${recommendMovie.length})`}</button>

          <div
            className={
              isdisabled === "REVIEWS"
                ? "detail-puter detail-puter-line"
                : "detail-puter"
            }
          >
            {isdisabled === "REVIEWS"
              ? reviewsMovie.results?.map((review) => (
                  <MovieReview review={review} key={review.id} />
                ))
              : recommendMovie.map((item) => (
                  <RelatedMovie item={item} key={item.id} />
                ))}
          </div>
        </div>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="modal-size"></Modal.Header>
        <YouTube videoId={trailerMovie[0]?.key} opts={opts} />;
      </Modal>
    </div>
  );
};

export default MoviesDetail;
