import React from "react";
import "./Navbar.css";
import { Button } from "antd";
import img from "/logo.png";
import { Link } from "react-scroll";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-continer">
        <img src={img} className="img" />
      </div>
      <div className="txt-container">
        <Link to="info" smooth={true} duration={750} className="button-link">
          <Button>Информация</Button>
        </Link>
        <Link to="signup" smooth={true} duration={1000} className="button-link">
          <Button className="primary-button">Записаться</Button>
        </Link>
      </div>
    </div>
  );
};
