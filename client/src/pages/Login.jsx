import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
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
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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
    setEmail(emailRef.current.value);
    setPassword(passwordRef.current.value);

    if (!validateEmail() || !validatePassword()) {
      // Show an error message or handle invalid input
      console.error("Invalid email or password format");
      return;
    }

    setLoading(true);
    try {
      await axios
        .post(`${baseUrl}/loginuser`, { email, password })
        .then((res) => {
          const json = res.data;
          if (json) {
            // save the user to local storage
            localStorage.setItem("user", JSON.stringify(json));

            // update the auth context
            dispatch({ type: "LOGIN", payload: json.token });

            setLoading(false);

            navigate("/apphome");
          }
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
          {
            validator: (_, value) =>
              validateEmail()
                ? Promise.resolve()
                : Promise.reject("Invalid email format"),
          },
        ]}
      >
        <Input
          placeholder="Type Email Here"
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
          placeholder="Type Password Here"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          ref={passwordRef}
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
