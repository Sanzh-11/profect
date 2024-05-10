import { Button, Space, Form, Input, message } from "antd";
import { useState } from "react";
import axios from "axios";
import "./styles.css";

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};

const RegistrationForm = ({ handleUserSelect }) => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState("");

  const onIINChange = (e) => {
    const iin = e.target.value;
    if (iin.trim().length === 0) {
      setMessage("Пожалуйста, введите ваш ИИН");
    } else if (iin.length !== 12) {
      setMessage("Введите 12 чисел");
    } else if (new Set(iin).size === 1) {
      setMessage("Цифры должны быть разными");
    } else if (!/^\d+$/.test(iin)) {
      setMessage("Используйте только цифры");
    } else {
      setMessage("");
      axios
        .get("https://veiled-shrouded-random.glitch.me/check-iin", {
          params: { iin },
        })
        .then((response) => {
          const { name, surname, contacts } = response.data;
          form.setFieldsValue({
            name,
            surname,
            contacts,
          });
          setMessage("Данные успешно загружены!");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const nameSurnameValidator = (_, value) => {
    const regex = /^[а-яА-Я\s]+$/;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Вводите только русскими буквами");
  };

  const phoneNumberValidator = (_, value) => {
    const regex = /^[\+]?[(]?[0-9]{4}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Неправильный номер телефона");
  };

  const handleCheck = async () => {
    try {
      const values = await form.getFieldsValue();
      handleUserSelect(values);
      // dispatch({
      //   type: "create-user",
      //   payload: values,
      // });
      console.log("Success:", values);
    } catch (error) {
      console.log("Failed:", error.message);
    }
  };

  return (
    <div className="registration">
      <h2 className="hello">Введите ваши данные для записи</h2>
      <Form
        id="signup"
        form={form}
        name="dynamic_rule"
        className="Form"
        onFinish={handleCheck}
        onFinishFailed={console.log}
      >
        <Form.Item
          {...formItemLayout}
          name="IIN"
          label="ИИН"
          validateStatus={
            message
              ? message === "Данные успешно загружены!"
                ? "success"
                : "error"
              : ""
          }
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
          type="tel"
          inputMode="tel"
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

        <Space
          direction="vertical"
          style={{
            width: "50%",
          }}
        >
          <Button
            type="primary"
            block
            onClick={handleCheck}
            className="primary-button"
          >
            Подтвердить личные данные
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default RegistrationForm;
