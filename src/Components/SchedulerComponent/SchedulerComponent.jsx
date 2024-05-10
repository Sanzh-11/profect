import React from "react";
import axios from "axios";
import BigCalendar from "../BigCalendar";
import TimeScheduler from "../TimeScheduler";

const SchedulerComponent = () => {
  const handleButtonClick = () => {
    console.log("clicked");
    axios.post("https://veiled-shrouded-random.glitch.me/book", {
      user,
      date,
      timeInterval,
    });
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
