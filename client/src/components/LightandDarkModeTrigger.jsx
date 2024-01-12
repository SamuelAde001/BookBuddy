import { Switch } from "antd";
import React, { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../features/darkModeSlice";

export const LightandDarkModeTrigger = () => {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if there is a saved value in local storage
    const storedDarkMode = localStorage.getItem("darkMode");

    // If a value is stored, use it; otherwise, default to false
    setDarkMode(storedDarkMode ? JSON.parse(storedDarkMode) : false);
  }, []); // Run this effect only once when the component mounts

  const onChange = (checked) => {
    // toggle dark mode state in redux
    dispatch(toggleDarkMode());

    setDarkMode(checked);
    localStorage.setItem("darkMode", JSON.stringify(checked));
  };

  return (
    <Switch
      checkedChildren={<MdLightMode />}
      unCheckedChildren={<MdLightMode />}
      checked={darkMode}
      onChange={onChange}
    />
  );
};
