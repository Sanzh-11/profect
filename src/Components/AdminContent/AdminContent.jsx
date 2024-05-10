import { useState, useEffect } from "react";
import MyCalendar from "../BigCalendar/BigCalendar";
import axios from "axios";
import moment from "moment";
import { Modal } from "antd";
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
      .post(
        "https://veiled-shrouded-random.glitch.me/approve-pending-booking",
        selectedEvent
      )
      .then(() => {
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
      .get("https://veiled-shrouded-random.glitch.me/pending-bookings")
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
            approved: serverEvent.approved,
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
      <Modal open={modalIsOpen} onCancel={closeModal} onOk={handleApprove}>
        <h2>Информация о пациенте</h2>
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
