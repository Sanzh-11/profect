import { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { StoreContext } from "../../App";
import "./styles.css";
import MyToolbar from "./MyToolbar";

import axios from "axios";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
  // const [events, setEvents] = useState([]);
  // const [store, dispatch] = useContext(StoreContext);
  // const { user } = store;

  const handleNewEvent = async () => {
    const newEvent = {
      user: {
        name: "Sanzhar",
        surname: "Sanzhar",
        IIN: "123",
        contacts: "123",
      },
      title: `EVENT NAME`,
      date: moment([2024, 1, 11, 15, 0]).toDate(), // need to fetch from database
      timeInterval: 30, // need to fetch from database
    };

    const response = axios.post("http://localhost:3000/book", newEvent);
    console.log(response);

    setEvents([...events, newEvent]);
  };

  return (
    <div>
      <button onClick={handleNewEvent}>Add new Event</button>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={"week"}
        views={["month", "week", "day"]}
        min={new Date(0, 0, 0, 10, 0)}
        max={new Date(0, 0, 0, 19, 0)}
        step={60}
        timeslots={1}
        components={{ toolbar: MyToolbar }}
      />
    </div>
  );
};

export default MyCalendar;
