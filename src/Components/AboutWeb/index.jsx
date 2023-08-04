import React from "react";
import "./AboutWeb.css";
import img from "/img1.jpg";
export const AboutWeb = () => {
  return (
    <div className="about">
      <div className="text-container">
        <p>
          Приложения для удобной записи на
          <br />
          <span style={{ textDecoration: "underline", color: "green" }}>
            Психолого-Медико-Педагогическую
          </span>
          <br />
          комиссию (ПМПК).
        </p>
      </div>
      <div className="image-container">
        <img src={img} className="image" />
      </div>
    </div>
  );
};
