import React, { useRef, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { baseUrl } from "../../utils/helper";
import validator from "validator";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [surname, setSurname] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const validateEmail = () => {
    return validator.isEmail(email);
  };

  const validatePassword = () => {
    // Password should be at least 6 - 12 characters
    const strongPasswordRegex = /^[a-zA-Z0-9_]{6,12}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSignup = async () => {
    // check email and password
    if (!validateEmail()) {
      console.error("Invalid email format");
      message.error("Invalid email format");
      return;
    }
    if (!validatePassword()) {
      console.error("Invalid password format");
      message.error("put a different password");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/registeruser`, {
        email,
        password,
        firstName,
        middleName,
        surname,
      });

      const json = response.data;

      // Check the status code and show appropriate message
      if (response.status >= 200 && response.status < 300) {
        message.success(" successful!");
      } else if (response.status >= 400 && response.status < 500) {
        message.error("Email or Passowrd invalid");
      } else if (response.status >= 500 && response.status < 600) {
        message.error("Server error. Please try again later.");
      }

      // successful
      if (json) {
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));

        // update the auth context
        dispatch({ type: "LOGIN", payload: json.token });

        setLoading(false);

        navigate("/apphome");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      // console.log(error.response.data);
    }
  };

  return (
    <>
      <h1>Sign up to BookBuddy</h1>
      <Form.Item
        label="First Name"
        name="First Name"
        rules={[
          {
            required: true,
            message: "Please input your first name!",
          },
        ]}
      >
        <Input
          placeholder="Bello"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item
        label="Middle Name"
        name="Middle Name"
        rules={[
          {
            required: true,
            message: "Please input your middle name!",
          },
        ]}
      >
        <Input
          placeholder="Bola"
          onChange={(e) => {
            setMiddleName(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item
        label="Surname"
        name="Surname"
        rules={[
          {
            required: true,
            message: "Please input your surname!",
          },
        ]}
      >
        <Input
          placeholder="Joseph"
          onChange={(e) => {
            setSurname(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item
        label="Email"
        name="Email"
        rules={[
          {
            required: true,
            message: "Please input a valid email address!",
          },
        ]}
      >
        <Input
          placeholder="Example@email.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input a strong password!",
          },
        ]}
      >
        <Input.Password
          placeholder="Strong Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        onClick={handleSignup}
        disabled={loading}
      >
        Signup
      </Button>

      <p className="text-center">
        Already a user? Login{"  "}
        <span>
          <Link to="/login">here</Link>
        </span>
      </p>
    </>
  );
};
