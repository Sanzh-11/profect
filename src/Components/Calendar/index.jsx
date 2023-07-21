import React, { useState, useContext } from "react";
import { DatePicker, Button } from "antd";
import axios from "axios";
import "./Calendar.css";
import { StoreContext } from "../../App";

export const Calendar = (freeslots) => {
  const [date, setDate] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [store, dispatch] = useContext(StoreContext);
  const { user } = store;

  return (
    <>
      <div className="calendar">
        <DatePicker
          placeholder="Выберите дату"
          value={date}
          onChange={setDate}
        />
        {date && (
          <div>
            <Button
              type="primary"
              onClick={() => {
                setIsBooked(true);
                axios.post("http://localhost:3000/book", { user, date });
              }}
            >
              Записаться
            </Button>
            {isBooked && <p>Вы записались на {date.format("YYYY-MM-DD")}</p>}
          </div>
        )}
      </div>
    </>
  );
};
