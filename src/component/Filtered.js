import React from "react";
import { Badge } from "react-bootstrap";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moviesAction } from "../redux/actions/moviesAction";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const Filtered = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState("SortList");
  // const [sortType, setSortType] = useState("popularity.desc");
  const dispatch = useDispatch();
  const { genreList } = useSelector((state) => state.movies);
  const [yearFilter, setYearFilter] = useState({ min: 1990, max: 2022 });
  const [starFilter, setStarFilter] = useState({ min: 0, max: 10 });

  const sortMenu = [
    {
      name: "Popularity(Desc)",
      id: "popularity.desc",
    },
    { name: "Popularity(Asc)", id: "popularity.asc" },
    {
      name: "Release Day(Desc)",
      id: "release_date.asc",
    },
    { name: "Release Day(Asc)", id: "release_date.desc" },
    {
      name: "Vote(Desc)",
      id: "vote_count.desc",
    },
    { name: "Vote(Asc)", id: "vote_count.asc" },
    {
      name: "Revenue(Desc)",
      id: "revenue.desc",
    },
    { name: "Revenue(Asc)", id: "revenue.asc" },
  ];

  let sortType = "";
  let MinYear = yearFilter.min;
  let MaxYear = yearFilter.max;
  const SortChange = (e) => {
    setSelected(e.target.title);
    sortType = e.target.id;
    MinYear = "";
    MaxYear = "";
    dispatch(moviesAction.SortedMovie(sortType, MinYear, MaxYear));
  };

  const YearFiltered = (value) => {
    setYearFilter(value);
    dispatch(moviesAction.SortedMovie(sortType, MinYear, MaxYear));
  };

  return (
    <div className="filter-section">
      <div className={`sort ${sortOpen === true ? "open" : ""}`}>
        <div className="heder">
          <h2>Sort</h2>
          <span>
            <FontAwesomeIcon
              icon={sortOpen === true ? faArrowUp : faArrowDown}
              onClick={() => setSortOpen(!sortOpen)}
            />
          </span>
        </div>
        <div className="body">
          <h2>Sort Results By</h2>
          <DropdownButton
            id="dropdown-basic-button"
            title={selected}
            variant="outline-secondary"
          >
            {sortMenu.map((item) => (
              <Dropdown.Item
                key={item.name}
                onClick={(e) => SortChange(e)}
                title={item.name}
                id={item.id}
              >
                {item.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
      </div>

      <div className={`sort ${filterOpen === true ? "open" : ""}`}>
        <div className="heder">
          <h2>Filter</h2>
          <span>
            <FontAwesomeIcon
              icon={sortOpen === true ? faArrowUp : faArrowDown}
              onClick={() => setFilterOpen(!filterOpen)}
            />
          </span>
        </div>
        <div className="body">
          <h2>YEAR Filter</h2>
          <div className="filter_count">
            From:<span>{yearFilter.min}</span>
            To: <span>{yearFilter.max}</span>
          </div>
          <div className="slide_filter">
            <InputRange
              maxValue={2022}
              minValue={1990}
              value={yearFilter}
              onChange={(value) => YearFiltered(value)}
            />
          </div>
        </div>
        <div className="body">
          <h2>Star Rating</h2>
          <div className="filter_count">
            From:<span>{starFilter.min}</span>
            To: <span>{starFilter.max}</span>
          </div>
          <div className="slide_filter">
            <InputRange
              maxValue={10}
              minValue={0}
              value={starFilter}
              onChange={(value) => setStarFilter(value)}
            />
          </div>
        </div>
        <div className="body">
          <h2>Genres</h2>
          <div>
            {genreList?.map((item) => (
              <span key={item.id} className="filter_genre">
                <Badge value={item.id} className="filter_genre_Badge">
                  {item.name}
                </Badge>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filtered;
