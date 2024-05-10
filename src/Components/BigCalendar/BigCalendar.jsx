import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "./styles.css";
import MyToolbar from "./MyToolbar";

import axios from "axios";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events, onSelectEvent }) => {
  // const [events, setEvents] = useState([]);
  // const [store, dispatch] = useContext(StoreContext);
  // const { user } = store;

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        onSelectEvent={onSelectEvent}
        defaultView={"week"}
        views={["month", "week", "day"]}
        min={new Date(0, 0, 0, 10, 0)}
        max={new Date(0, 0, 0, 18, 0)}
        step={60}
        timeslots={1}
        components={{ toolbar: MyToolbar }}
        eventPropGetter={(event) => {
          const backgroundColor = event.approved ? "#159215" : "#911a2a";
          return { style: { backgroundColor } };
        }}
      />
    </div>
  );
};

export default MyCalendar;
