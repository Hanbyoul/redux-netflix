import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Pagenation from "../component/Pagenation";
import { useEffect } from "react";
import { moviesAction } from "../redux/actions/moviesAction";
import MovieInfo from "../component/MovieInfo";
import Filtered from "../component/Filtered";

// 필터,솔트,기본 적용 및 페이지네이션 상호작용이 안됨
// 로직을 새로 뜯어 고쳐야함 api 호출과정 or 페이지네이션 적용 과정
// Movies 페이지의 UseEffect 조건부 렌더링도 수정이 필요
// 그외 코드들이 너무 적나라하게 두서없이 펼쳐져 리펙토리가 필요
// 컴포넌트 관리 부족.

const Movies = () => {
  const dispatch = useDispatch();
  const { popularMovies, searchMovies, search, sortedMovie, sorted } =
    useSelector((state) => state.movies);
  const [movie, setMovie] = useState("");

  const goBack = () => {
    dispatch(moviesAction.MovieReload());
    setMovie(popularMovies);
  };

  console.log("movie", movie);
  console.log("SEArch???", search);
  console.log("SORted???", sorted);

  useEffect(() => {
    if (search) {
      return setMovie(searchMovies);
    } else if (sorted) {
      return setMovie(sortedMovie);
    }
    return setMovie(popularMovies);
  }, [movie, popularMovies, searchMovies, sortedMovie]);

  if (movie.results?.length === 0) {
    return (
      <div className="not-search">
        <h1>검색된 결과가 없습니다.</h1>
        <div onClick={goBack}>
          되돌아가기
          <FontAwesomeIcon icon={faRotate} />
        </div>
      </div>
    );
  }
  return (
    <Container>
      <Row>
        <Col lg={4} className="filter">
          <Filtered />
        </Col>
        <Col lg={8} className="movies">
          <Row>
            {movie.results?.map((item) => (
              <MovieInfo item={item} key={item.id} />
            ))}
          </Row>
        </Col>
      </Row>

      {movie.results && <Pagenation Movies={movie} />}
    </Container>
  );
};

export default Movies;
