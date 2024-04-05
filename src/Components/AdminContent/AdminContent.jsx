import { useState, useEffect } from "react";
import MyCalendar from "../BigCalendar/BigCalendar";
import axios from "axios";
import moment from "moment";
import Modal from "react-modal";

const AdminContent = () => {
  const [events, setEvents] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSelect = (event) => {
    setSelectedEvent(event);
    console.log(event);
    openModal();
  };

  const handleApprove = () => {
    const response = axios
      .post("http://localhost:3000/approve-pending-booking", selectedEvent)
      .then(() => {
        const allEvents = events.filter(
          (event) => event.id != selectedEvent.id
        );

        setEvents([...allEvents]);
        closeModal();
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/pending-bookings")
      .then((response) => {
        const serverEvents = [];
        response.data.map((serverEvent) => {
          serverEvents.push({
            id: serverEvent.IIN,
            title: serverEvent.name + " " + serverEvent.surname,
            start: moment(serverEvent.date).toDate(),
            end: moment(serverEvent.date).add(1, "hours").toDate(),
            filePath: serverEvent.filePath,
          });
        });
        console.log(serverEvents);
        setEvents(serverEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <MyCalendar events={events} onSelectEvent={handleSelect} />;
      <Modal isOpen={modalIsOpen} contentLabel="Example Modal">
        <h2>Информация о пациенте</h2>
        <button onClick={closeModal}>закрыть</button>
        <button onClick={handleApprove}>подтвердить</button>
        <div>
          {selectedEvent && (
            <ul>
              <li> IIN: {selectedEvent.id} </li>
              <li> Name: {selectedEvent.title} </li>
              <li> Date: {selectedEvent.start.toString()} </li>
              <li> Contacts: {selectedEvent.contacts} </li>
              <li>
                {" "}
                <img src={selectedEvent.filePath} />{" "}
              </li>
            </ul>
          )}
        </div>
      </Modal>
    </>
  );
};

export default AdminContent;
