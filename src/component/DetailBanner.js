import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const DetailBanner = ({ detailMovie }) => {
  const navigate = useNavigate();

  const goTohome = () => {
    navigate("/");
  };
  return (
    <div
      className="detail-banner"
      style={{
        backgroundImage:
          "url(" +
          "https://t4.ftcdn.net/jpg/03/71/56/17/240_F_371561715_LVI4qVJ2hyWMDXdqJNGdktggEzjQuC15.jpg" +
          ")",
      }}
    >
      <h1>NETFLIX</h1>
      <div className="banner-section">
        <span className="banner-home" onClick={goTohome}>
          HOME
        </span>
        |<span>{detailMovie?.original_title}</span>
      </div>
    </div>
  );
};

export default DetailBanner;
