import React, { useState } from "react";
import {
  DatePicker,
  Button,
  Space,
  Select,
  Modal,
  Upload,
  message,
} from "antd";
import axios from "axios";
import "./styles.css";
import defaultTime from "./constants.js";
import { UploadOutlined } from "@ant-design/icons";

const props = {
  name: "file",
  action: "http://localhost:3000/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    // setFilePath(`localhost:3000/${info.file.name}`);
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const TimeScheduler = ({ handleButtonClick }) => {
  const [date, setDate] = useState("");
  const [timeInterval, setTimeInterval] = useState();
  const [filePath, setFilePath] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [availableTime, setAvailableTime] = useState(defaultTime);

  const timeIntervalChange = (value) => {
    setTimeInterval(value);
  };

  const handleDateChange = (date) => {
    setDate(date);
    if (date) {
      axios
        .get("http://localhost:3000/check-date", { params: { date } })
        .then((response) => {
          const bookedTimes = response.data;

          console.log("Booked Times:", bookedTimes);

          const filteredAvailableTime = defaultTime.filter(
            (availableTime) => !bookedTimes.includes(availableTime.value)
          );

          console.log("Filtered Available Time:", filteredAvailableTime);

          setAvailableTime(filteredAvailableTime);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="calendar">
        <DatePicker
          placeholder="Выберите дату"
          value={date}
          onChange={handleDateChange}
          style={{
            width: 150,
          }}
        />
        {date && (
          <Space wrap>
            <Select
              defaultValue="Выберите время"
              style={{
                width: 150,
              }}
              options={availableTime}
              onChange={timeIntervalChange}
            />
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            <Button
              type="primary"
              shape="round"
              onClick={() => handleButtonClick(date, timeInterval, filePath)}
              className="primary-button"
            >
              Записаться
            </Button>
          </Space>
        )}
      </div>
      {/* <Modal
        visible={isModalVisible}
        title="Подтверждение записи"
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Вы успешно зарегистрировались</p>
        <p>Ваши данные:</p>
        <p>Ваше имя: {user?.name}</p>
        <p>Ваша фамилия: {user?.surname}</p>
        <p>Ваш номер: {user?.contacts}</p>
      </Modal> */}
    </>
  );
};

export default TimeScheduler;
