import React from "react";
import "./Navbar.css";
import { Button } from "antd";
import img from "/logo.png";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-continer">
        <img src={img} className="img" />
      </div>
      <div className="txt-container">
        <Button className="button">О приложении</Button>
        <Button className="button">Информация</Button>
        <Button className="button" type="primary">
          Записаться
        </Button>
      </div>
    </div>
  );
};
