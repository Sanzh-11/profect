import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "./styles.css";
import MyToolbar from "./MyToolbar";

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: "Meeting",
    start: new Date(2024, 1, 10, 10, 0),
    end: new Date(2024, 1, 10, 11, 0),
  },
];

const MyCalendar = () => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
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
