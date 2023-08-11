import React from "react";
import "./AboutWeb.css";
import doctorImg from "/doctor.jpeg";
import PMPKwhat from "/PMPKwhat.jpg";
import why from "/Why.jpg";
export const AboutWeb = () => {
  return (
    <>
      <div className="info-block" id="about">
        <p className="promo-text">
          Приложения для удобной записи на
          <h1 className="heading">
            Психолого-Медико-Педагогическую комиссию (ПМПК)
          </h1>
        </p>
        <img src={doctorImg} className="promo-photo" />
      </div>
      <div className="info-block" id="info">
        <img src={PMPKwhat} className="photo1" />
        <p className="text1">
          <h2 className="heading">Что такое ПМПК?</h2>
          <p className="paragraph">
            Медики, педагоги и психологи изучают особенности развития ребенка и
            после этого совместно решают, требуются ли ему специальные условия
            для обучения. Педагоги могут направить, если обнаружили, что уровень
            психического или физического развития ребенка не соответствует его
            возрасту.
          </p>
        </p>
      </div>
      <div className="info-block">
        <p className="text2">
          <h2 className="heading">Зачем он нужен?</h2>
          <p className="paragraph">
            Выявить особенности развития и определить образовательный маршрут
            для ребенка, имеющего особые образовательные потребности.
          </p>
        </p>
        <img src={why} className="photo2" />
      </div>
    </>
  );
};
