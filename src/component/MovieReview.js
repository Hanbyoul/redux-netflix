import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const MovieReview = ({ review }) => {
  return (
    <div className="reviw-line ">
      <h5>{review.author}</h5>
      <p>{review.content}</p>
    </div>
  );
};

export default MovieReview;
