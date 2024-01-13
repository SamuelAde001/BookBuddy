import { Button, Grid, Menu, theme } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSideBar, triggerMenu } from "../features/createNewBookSlice";
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

  // Ant design break points
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  // trigger menu open state
  const triggerMenuState = () => {
    if (!screens.lg && !screens.xl) {
      dispatch(triggerMenu());
    }
  };

  // menu items
  const menuItems = [
    {
      key: "Home",
      label: <Link to="/apphome">Home</Link>,
      icon: <FaHome />,
      onClick: () => {
        triggerMenuState();
      },
    },
    {
      key: "trackedbooks",
      label: <Link to="/apphome/currentreads"> Current reads</Link>,
      icon: <FaBookOpenReader />,
      onClick: () => {
        triggerMenuState();
      },
    },

    {
      key: "readbooks",
      label: <Link to="/apphome/readbooks"> Read Books</Link>,
      icon: <LuBookOpenCheck />,
      onClick: () => {
        triggerMenuState();
      },
    },
    {
      key: "wishlist",
      label: <Link to="/apphome/wishlist">Wish List</Link>,
      icon: <GiNotebook />,
      onClick: () => {
        triggerMenuState();
      },
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
        onClick={() => {
          openNewBookSideBar();
          triggerMenuState();
        }}
        icon={<FaBook />}
      >
        New Book
      </Button>
      <Menu mode="vertical" defaultSelectedKeys={["home"]} items={menuItems} />
    </nav>
  );
};
