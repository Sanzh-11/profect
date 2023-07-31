import { Button, Space, Form, Input } from "antd";
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

let a = 0;

export const RegistrationForm = () => {
  const [store, dispatch] = useContext(StoreContext);
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
      dispatch({
        type: "create-user",
        payload: values,
      });
      console.log("Success:", values);
    } catch (error) {
      console.log("Failed:", error.message);
    }
  };
  return (
    <>
      <h2 className="hello">Добро пожаловать! Введите ваши данные</h2>
      <Form
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
          <Button type="primary" block onClick={handleCheck}>
            Подтвердить личные данные
          </Button>
        </Space>
      </Form>
    </>
  );
};
