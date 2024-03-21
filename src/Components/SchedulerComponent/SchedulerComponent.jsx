import React from "react";
import axios from "axios";
import BigCalendar from "../BigCalendar";
import TimeScheduler from "../TimeScheduler";

const SchedulerComponent = () => {
  const handleButtonClick = () => {
    console.log("clicked");
    axios.post("http://localhost:3000/book", { user, date, timeInterval });
    setIsModalVisible(true);
  };
  return (
    <>
      <BigCalendar />
      <TimeScheduler handleButtonClick={handleButtonClick} />
    </>
  );
};

export default SchedulerComponent;
