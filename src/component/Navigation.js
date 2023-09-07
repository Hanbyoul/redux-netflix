import React, { useState } from "react";
import { Button, Container, Form, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { moviesAction } from "../redux/actions/moviesAction";

const Navigation = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const getKeyword = (e) => {
    e.preventDefault();
    if (keyword.trim() !== "") {
      dispatch(moviesAction.getSearchMovie(keyword));
      navigate("/movies");
    }
  };

  const SearchMovie = () => {
    if (keyword.trim() !== "") {
      dispatch(moviesAction.getSearchMovie(keyword));
      navigate("/movies");
    }
  };

  const goHome = () => {
    dispatch(moviesAction.MovieReload());
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand onClick={goHome}>
          <img
            width={80}
            src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png"
            alt="#"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/" className="nav-item" onClick={goHome}>
              Home
            </Link>
            <Link to="/movies" className="nav-item">
              Movies
            </Link>
          </Nav>
          <Form
            className="d-flex"
            onSubmit={(e) => getKeyword(e)}
            onChange={(e) => setKeyword(e.target.value)}
          >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />

            <Button variant="outline-danger" onClick={SearchMovie}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
