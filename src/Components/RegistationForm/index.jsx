import { Button, Form, Input, Space, DatePicker } from "antd";
import { useContext, useState } from "react";
import { StoreContext } from "../../App";
import axios from "axios";

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
const formTailLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
    offset: 4,
  },
};

export const RegistrationForm = () => {
  const [store, dispatch] = useContext(StoreContext);
  const [form] = Form.useForm();
  const [message, setMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [date, setDate] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const onIINChange = (e) => {
    const iin = e.target.value;
    if (iin.trim().length === 0) {
      setMessage("Пожалуйста, введите ваш ИИН");
    } else if (iin.length !== 12) {
      setMessage("Введите 12 чисел");
    } else if (new Set(iin).size === 1) {
      setMessage("Цифры должны быть разными");
    } else if (!/^\d+$/.test(iin)) {
      setMessage("Неправильный ИИН");
    } else {
      setMessage("");

      axios
        .get("http://localhost:3000/check-iin", {
          params: { iin },
        })
        .then((response) => {
          if (response.status === 200) {
            const { name, surname, contacts } = response.data;
            form.setFieldsValue({
              name,
              surname,
              contacts,
            });
            setMessage("Данные успешно загружены!");
          }
        })
        .catch((error) => {
          setMessage("Ошибка при получении данных");
          console.error(error);
        });
    }
  };

  const nameSurnameValidator = (_, value) => {
    const regex = /^[a-zA-Zа-яА-Я\s]+$/;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Вводите только английские или русские буквы");
  };

  const phoneNumberValidator = (_, value) => {
    const regex = /^[0-9\s]+$/;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Неправильный номер телефона");
  };

  return (
    <>
      <div className="information">
        <h2>Добро пожаловать! Введите ваши данные</h2>
        <Form
          form={form}
          name="dynamic_rule"
          style={{
            width: 800,
            marginTop: 37,
          }}
        >
          <Form.Item
            {...formItemLayout}
            name="IIN"
            label="ИИН"
            validateStatus={message ? "error" : ""}
            help={message}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder="Введите ваш ИИН"
              onChange={onIINChange}
              maxLength={12}
            />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="name"
            label="Имя"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите ваше имя",
              },
              {
                validator: nameSurnameValidator,
              },
            ]}
          >
            <Input placeholder="Введите ваше имя" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="surname"
            label="Фамилия"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите вашу фамилию",
              },
              {
                validator: nameSurnameValidator,
              },
            ]}
          >
            <Input placeholder="Введите вашу фамилию" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="contacts"
            label="Номер телефона"
            rules={[
              {
                required: true,
                message: "Введите ваш номер телефона",
              },
              {
                validator: phoneNumberValidator,
              },
            ]}
          >
            <Input placeholder="Введите ваши контактные данные" />
          </Form.Item>
          <Form.Item {...formTailLayout}>
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
                      axios.post("http://localhost:3000/book", {
                        user,
                        date,
                      });
                    }}
                  >
                    Записаться
                  </Button>
                  {isBooked && (
                    <p>Вы записались на {date.format("YYYY-MM-DD")}</p>
                  )}
                </div>
              )}
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
