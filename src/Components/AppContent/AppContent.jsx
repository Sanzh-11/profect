import React, { useEffect, useState } from "react";
import RegistrationForm from "../RegistrationForm";
import TimeScheduler from "../TimeScheduler";
import AboutWeb from "../AboutWeb";
import Navbar from "../Navbar";
import MyCalendar from "../BigCalendar";
import { Button } from "antd";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

const AppContent = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.setItem("profile", null);
    googleLogout();
    navigate("/");
  };

  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get("https://veiled-shrouded-random.glitch.me/all-bookings")
      .then((response) => {
        const serverEvents = [];
        response.data.map((serverEvent) => {
          serverEvents.push({
            id: serverEvent.IIN,
            title: serverEvent.name + " " + serverEvent.surname,
            start: moment(serverEvent.date).toDate(),
            end: moment(serverEvent.date).add(1, "hours").toDate(),
            approved: serverEvent.approved,
          });
        });
        console.log(serverEvents);
        setEvents(serverEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [events, setEvents] = useState([]);
  const profile = JSON.parse(localStorage.getItem("profile"));
  const handleButtonClick = (date, timeInterval, fileList) => {
    console.log(fileList);
    var timeAndDate = moment(date.toISOString())
      .set("hour", timeInterval)
      .set("minute", 0);

    const serverEvent = {
      user: {
        name: user.name,
        surname: user.surname,
        IIN: user.IIN,
        contacts: user.contacts,
        email: profile.email,
      },
      title: user.name + " " + user.surname,
      date: timeAndDate.toDate(),
      timeInterval: 30,
    };

    const form = new FormData();
    form.append("file", fileList[0]);
    form.append("payload", JSON.stringify(serverEvent));

    const response = axios
      .post("https://veiled-shrouded-random.glitch.me/book-file", form)
      .then(() => {
        var endDate = moment(timeAndDate).add(1, "hours");
        console.log(date.toISOString());
        const allEvents = events.filter((event) => event.id != user.IIN);

        setEvents([...allEvents]);
      });
    console.log(response);
    console.log(date, timeInterval);
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
        <p>{profile.family_name + " " + profile.given_name}</p>
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
