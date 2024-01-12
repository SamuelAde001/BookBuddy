import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { baseUrl } from "../../utils/helper";
import validator from "validator";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/apphome");
    }
  }, []);

  const validateEmail = () => {
    return validator.isEmail(email);
  };

  const validatePassword = () => {
    // Password should be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async () => {
    if (!validateEmail()) {
      console.error("Invalid email format");
      message.error("Invalid email format");
      return;
    }
    if (!validatePassword()) {
      console.error("Invalid password format");
      message.error(
        "Password should be strong (at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character) "
      );
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/loginuser`, {
        email,
        password,
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
      setLoading(false);
      console.log(error);
    }
  };

  console.log(password);
  return (
    <>
      <h1>Login to BookBuddy</h1>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input a valid email address!",
          },
        ]}
      >
        <Input
          placeholder="Type Email Here"
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
          placeholder="Type Password Here"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        onClick={handleSubmit}
        disabled={loading}
      >
        Submit
      </Button>

      <p className="text-center">
        Not a user? Signup{"  "}
        <span>
          <Link to="/signup">here</Link>
        </span>
      </p>
    </>
  );
};
