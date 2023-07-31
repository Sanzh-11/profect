import React from "react";
import "./index.css";

export const AboutWeb = () => {
  const aboutWebStyle = {
    fontSize: "30px",
    margin: "0 auto",
    paddingRight: "15%",
    paddingLeft: "15%",
    widht: "100%",
    backgroundColor: "#f0f0f0",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div className="about" styles={aboutWebStyle}>
      <p>
        Приложения для удобной записи на Психо-Медико-Педагогическую комиссию
        (ПМПК)
      </p>
    </div>
  );
};
