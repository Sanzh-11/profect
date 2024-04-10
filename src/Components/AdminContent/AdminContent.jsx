import { useState, useEffect } from "react";
import MyCalendar from "../BigCalendar/BigCalendar";
import axios from "axios";
import moment from "moment";
import Modal from "react-modal";
import emailjs from "@emailjs/browser";

const templateParams = {
  to_name: "test Sanzhar",
  from_name: "test Website",
  message: "Check this out!",
  reply_to: "sanzhar.iden@gmail.com",
};

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
        sendEmail(selectedEvent.email);
      });
  };

  const sendEmail = (to_email) => {
    emailjs
      .send(
        "service_dz9pc4h",
        "template_9o4shkq",
        { ...templateParams, to_email: to_email },
        {
          publicKey: "JveTox720D8mq3mpU",
          privateKey: "WEWIzWoOLgqBP_skdinGt",
        }
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
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
            email: serverEvent.email,
          });
        });
        console.log(response);
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
                <a href={selectedEvent.filePath} target="_blank">
                  {" "}
                  Uploaded file{" "}
                </a>
              </li>
            </ul>
          )}
        </div>
      </Modal>
    </>
  );
};

export default AdminContent;
