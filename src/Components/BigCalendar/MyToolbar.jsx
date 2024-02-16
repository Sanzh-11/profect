import React from "react";
import "./styles.css";
// import { LeftSquareTwoTone } from "@ant-design/icons";

const MyToolbar = ({ label, views, onView, onNavigate }) => {
  return (
    <div className="rbc-toolbar">
      <button onClick={() => onNavigate("PREV")}>
        {/* <LeftSquareTwoTone /> */}
        Back
      </button>
      <button onClick={() => onNavigate("Today")}>Today</button>
      <button onClick={() => onNavigate("NEXT")}>Next</button>
      <span className="rbc-toolbar-label">{label}</span>
      <button onClick={() => onView(views.MONTH)}>Month</button>
      <button onClick={() => onView(views.WEEK)}>Week</button>
      <button onClick={() => onView(views.DAY)}>Day</button>
    </div>
  );
};

export default MyToolbar;
