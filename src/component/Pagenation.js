import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moviesAction } from "../redux/actions/moviesAction";
const Pagenation = ({ Movies }) => {
  const dispatch = useDispatch();

  let page = Movies.page;
  let first = page - 1;
  let last = first + 2;
  let total = Movies.total_pages;

  if (first <= 0) first = 1;
  if (total > 102) total = 102;
  if (last > total) last = total;

  let pages = [];
  for (let i = first; i <= last; i++) {
    pages.push(i);
  }

  const getPage = (e) => {
    let page = e.target.value;

    dispatch(moviesAction.getMovies(page));
    dispatch(moviesAction.getSearchPage(page));
    dispatch(moviesAction.getSortedPage(page));

    console.log("페이지보내기", page, "페이지");
  };

  return (
    <div className="pagenation">
      <button hidden={first === 1} value={1} onClick={(e) => getPage(e)}>
        &lt;&lt;
      </button>
      <button hidden={first === 1} value={page - 1} onClick={(e) => getPage(e)}>
        &lt;
      </button>
      {pages.map((pages) => (
        <button onClick={(e) => getPage(e)} value={pages} key={pages}>
          {pages}
        </button>
      ))}
      <button hidden={total - first <= 3}>...</button>
      <button onClick={(e) => getPage(e)} hidden={total === last} value={total}>
        {total}
      </button>
      <button
        hidden={last === total}
        value={page + 1}
        onClick={(e) => getPage(e)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagenation;
