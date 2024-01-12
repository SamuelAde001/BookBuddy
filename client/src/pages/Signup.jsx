import React, { useRef, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
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
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const surnameRef = useRef(null);
  const middleNameRef = useRef(null);

  const validateEmail = () => {
    return validator.isEmail(email);
  };

  const validatePassword = () => {
    // Password should be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSignup = async () => {
    setEmail(emailRef.current.value);
    setPassword(passwordRef.current.value);
    setFirstName(firstNameRef.current.value);
    setMiddleName(middleNameRef.current.value);
    setSurname(surnameRef.current.value);

    if (!validateEmail() || !validatePassword()) {
      // Show an error message or handle invalid input
      console.error("Invalid email or password format");
      return;
    }

    setLoading(true);
    try {
      await axios
        .post(`${baseUrl}/registeruser`, {
          email,
          password,
          firstName,
          middleName,
          surname,
        })
        .then((res) => {
          const json = res.data;
          console.log(json);
          if (json) {
            // save the user to local storage
            localStorage.setItem("user", JSON.stringify(json));

            // update the auth context
            dispatch({ type: "LOGIN", payload: json.token });

            setLoading(false);

            console.log(json.token);
            navigate("/apphome");
          }
        });
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
          ref={firstNameRef}
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
          ref={middleNameRef}
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
          ref={surnameRef}
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
          {
            validator: (_, value) =>
              validateEmail()
                ? Promise.resolve()
                : Promise.reject("Invalid email format"),
          },
        ]}
      >
        <Input
          placeholder="Example@email.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          ref={emailRef}
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
          {
            validator: (_, value) =>
              validatePassword()
                ? Promise.resolve()
                : Promise.reject(
                    "Password should be strong (at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)"
                  ),
          },
        ]}
      >
        <Input.Password
          placeholder="Strong Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          ref={passwordRef}
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
