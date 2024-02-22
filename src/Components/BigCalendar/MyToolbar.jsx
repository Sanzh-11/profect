import React from "react";
import "./styles.css";
import { Navigate } from "react-big-calendar";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons"; // Import arrow icons from Ant Design Icons

const MyToolbar = ({ label, views, onView, onNavigate }) => {
  return (
    <div className="rbc-toolbar">
      <button onClick={() => onNavigate(Navigate.PREVIOUS)}>
        <CaretLeftOutlined />
      </button>
      <button onClick={() => onNavigate(Navigate.TODAY)}>Today</button>
      <button onClick={() => onNavigate(Navigate.NEXT)}>
        <CaretRightOutlined />
      </button>
      <span className="rbc-toolbar-label">{label}</span>
      <button onClick={() => onView("month")}>Month</button>
      <button onClick={() => onView("week")}>Week</button>
      <button onClick={() => onView("day")}>Day</button>
    </div>
  );
};

export default MyToolbar;
