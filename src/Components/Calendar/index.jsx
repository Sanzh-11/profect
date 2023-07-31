import React, { useState, useContext } from "react";
import { DatePicker, Button, Space, Select } from "antd";
import axios from "axios";
import { StoreContext } from "../../App";

export const Calendar = (freeslots) => {
  const [date, setDate] = useState("");
  const [store, dispatch] = useContext(StoreContext);
  const { user } = store;
  const [timeInterval, setTimeInterval] = useState();

  const timeIntervalChange = (value) => {
    setTimeInterval(value);
  };

  const handleButtonClick = () => {
    if (timeInterval) {
      // console.log(user);
      axios.post("http://localhost:3000/book", { user, date, timeInterval });
    } else {
      console.log("No timeInerval selected");
    }
  };

  return (
    <>
      <div className="calendar">
        <DatePicker
          placeholder="Выберите дату"
          value={date}
          onChange={setDate}
        />
        {date && (
          <Space wrap>
            <Select
              defaultValue="Выберите время"
              style={{
                width: 100,
              }}
              options={[
                {
                  value: 10,
                  label: "10:00-10:50",
                },
                {
                  value: 11,
                  label: "11:00-11:50",
                },
                {
                  value: 12,
                  label: "12:00-12:50",
                },
                {
                  value: 13,
                  label: "13:00-13:50",
                },
                {
                  value: 14,
                  label: "14:00-14:50",
                },
                {
                  value: 15,
                  label: "15:00-15:50",
                },
                {
                  value: 16,
                  label: "16:00-16:50",
                },
                {
                  value: 17,
                  label: "17:00-17:50",
                },
                {
                  value: 18,
                  label: "18:00-18:50",
                },
              ]}
              onChange={timeIntervalChange}
            />
            <div className="zapis">
              <Button type="primary" shape="round" onClick={handleButtonClick}>
                Записаться
              </Button>
            </div>
          </Space>
        )}
      </div>
    </>
  );
};
