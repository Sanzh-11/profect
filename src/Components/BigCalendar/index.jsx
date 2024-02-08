import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: "Meeting",
    start: new Date(2024, 1, 10, 10, 0),
    end: new Date(2024, 1, 10, 11, 0),
  },
];

const MyCalendar = (props) => {
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    />
  </div>;
};

export default MyCalendar;
