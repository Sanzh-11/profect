import React, { useState } from "react";
import RegistrationForm from "../RegistrationForm";
import TimeScheduler from "../TimeScheduler";
import AboutWeb from "../AboutWeb";
import Navbar from "../Navbar";
import MyCalendar from "../BigCalendar";
import { Button } from "antd";
import moment from "moment";
//import { useGoogleLogout } from "@react-oauth/google";

const AppContent = () => {
  // const { signOut } = useGoogleLogout();
  const logOut = () => {
    console.log("ssds");
    // signOut();
  };

  const [user, setUser] = useState();

  const [events, setEvents] = useState([
    {
      title: "Event 1",
      start: moment([2024, 2, 15, 15, 0]).toDate(),
      end: moment([2024, 2, 15, 16, 0]).toDate(),
    },
    {
      title: "Event 2",
      start: moment([2024, 2, 16, 11, 0]).toDate(),
      end: moment([2024, 2, 16, 12, 0]).toDate(),
    },
  ]);

  const handleButtonClick = (date, timeInterval) => {
    console.log(date, timeInterval);
    var timeAndDate = moment(date.toISOString())
      .set("hour", timeInterval)
      .set("minute", 0);
    var endDate = moment(timeAndDate).add(1, "hours");
    console.log(date.toISOString());
    const newEvent = {
      title: user.name + " " + user.surname,
      start: timeAndDate.toDate(),
      end: endDate.toDate(),
    };

    setEvents([...events, newEvent]);
  };

  const handleUserSelect = (user) => {
    setUser(user);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "50px",
          padding: "10px",
        }}
      >
        <Button style={{ display: "flex" }} onClick={logOut}>
          Log Out
        </Button>
      </div>
      <Navbar />
      <AboutWeb />
      <div>
        <RegistrationForm handleUserSelect={handleUserSelect} />
        <TimeScheduler handleButtonClick={handleButtonClick} />
      </div>
      <MyCalendar events={events} />
    </>
  );
};
export default AppContent;
