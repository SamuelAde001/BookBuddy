import { Button, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../features/createNewBookSlice";
import { FaBook, FaHome } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { LuBookOpenCheck } from "react-icons/lu";
import { GiNotebook } from "react-icons/gi";
import { LightandDarkModeTrigger } from "./LightandDarkModeTrigger";

export const NavBar = ({ data }) => {
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const { presentUser } = data;

  const openNewBookSideBar = () => {
    dispatch(toggleSideBar());
  };

  // menu items
  const menuItems = [
    {
      key: "Home",
      label: <Link to="/apphome">Home</Link>,
      icon: <FaHome />,
    },
    {
      key: "trackedbooks",
      label: <Link to="/apphome/currentreads"> Current reads</Link>,
      icon: <FaBookOpenReader />,
    },

    {
      key: "readbooks",
      label: <Link to="/apphome/readbooks"> Read Books</Link>,
      icon: <LuBookOpenCheck />,
    },
    {
      key: "wishlist",
      label: <Link to="/apphome/wishlist">Wish List</Link>,
      icon: <GiNotebook />,
    },
  ];

  return (
    <nav>
      <div className="flex justify-center my-5">
        <img
          src="https://i.ibb.co/VVB9tq1/bookbuddy-high-resolution-logo-transparent.png"
          alt=""
          className="h-[100px]"
        />
      </div>
      <h1 style={{ color: token.colorTextBase }} className="text-center my-5">
        {presentUser && presentUser.firstName}{" "}
        {presentUser && presentUser.surname}
      </h1>

      <div className="flex justify-center">
        <LightandDarkModeTrigger />
      </div>
      <Button
        block
        type="primary"
        className="my-10"
        onClick={openNewBookSideBar}
        icon={<FaBook />}
      >
        New Book
      </Button>
      <Menu mode="vertical" defaultSelectedKeys={["home"]} items={menuItems} />
    </nav>
  );
};
