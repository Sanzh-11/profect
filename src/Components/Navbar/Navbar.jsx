import React from "react";
import "./styles.css";
import { Button } from "antd";
import img from "../../assets/logo.png";
import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={img} className="img" />
      </div>
      <div className="txt-container">
        <Link to="info" smooth={true} duration={750} className="button-link">
          <Button></Button>
        </Link>
        <Link to="signup" smooth={true} duration={1000} className="button-link">
          <Button className="primary-button">Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
