import { Button, Layout, theme } from "antd";
import React, { useState, useEffect } from "react";
import { useLogout } from "../hooks/useLogout";
import { Outlet } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { NavBar } from "../components/NavBar";
import { CreateNewBookSideBar } from "../components/CreateNewBookSideBar";
import { Content, Header } from "antd/es/layout/layout";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BookDetailsModal } from "../components/BookDetailsModal";
import { baseUrl } from "../../utils/helper";
import { CiLogout } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { triggerMenu } from "../features/createNewBookSlice";

export const AppLayout = () => {
  const { token } = theme.useToken();
  const { logout } = useLogout();
  const [collapsed, setcollapsed] = useState(false);
  const { user } = useAuthContext();
  const [books, setBooks] = useState(null);
  const [trackedBooks, setTrackedBooks] = useState(null);
  const [readBooks, setReadBooks] = useState(null);
  const [wishedBooks, setWishedBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [presentUser, setPresentUser] = useState(null);
  const dispatch = useDispatch();
  const [componentMounted, setComponentMounted] = useState(false);
  const [greeting, setGreeting] = useState("");
  const triggerReload = useSelector(
    (state) => state.createBookReducer.triggerToggle
  );
  const menuOpenState = useSelector(
    (state) => state.createBookReducer.triggerMenu
  );

  const determineGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  // use effect to render greetings based on present time
  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(determineGreeting());
    };

    // Update the greeting when the component mounts
    updateGreeting();

    // Set up an interval to update the greeting every minute
    const intervalId = setInterval(updateGreeting, 60000);

    // to help set component mounted to true after useEffect
    setComponentMounted(true);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // fetching essential data
  useEffect(() => {
    // function to fetch books
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${baseUrl}/trackedbooks`, {
          headers: { Authorization: `Bearer ${user.token || user}` },
        });

        const json = response.data;
        setBooks(json);
        setTrackedBooks(json.filter((book) => book.isRead === false));
        setReadBooks(json.filter((book) => book.isRead === true));
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    // function to fetch wished books
    const fetchwishBooks = async () => {
      try {
        const response = await axios.get(`${baseUrl}/wishedbooks`, {
          headers: { Authorization: `Bearer ${user.token || user}` },
        });

        const json = response.data;
        setWishedBooks(json);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    // function to fetch user data
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getuser`, {
          headers: { Authorization: `Bearer ${user.token || user}` },
        });

        const json = response.data;
        setPresentUser(json);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBooks();
      fetchwishBooks();
      fetchUser();
    }
  }, [user, triggerReload]);

  // data to be sent to the children
  const data = {
    books,
    trackedBooks,
    loading,
    readBooks,
    wishedBooks,
    presentUser,
  };

  return (
    <div className="lg:flex">
      <Layout className="fixed z-20 left-0 top-0 lg:fixed  ">
        <Sider
          width={200}
          className=" h-screen z-20 shadow-2xl lg:shadow-none"
          breakpoint="lg"
          collapsed={menuOpenState}
          collapsedWidth={0}
          theme="light"
          trigger={null}
          onBreakpoint={() => {
            if (componentMounted) {
              dispatch(triggerMenu());
            }
          }}
        >
          <NavBar data={data} />
        </Sider>
      </Layout>
      <Layout className="w-full lg:ml-[200px] relative ">
        <Header className="bg-[url(https://images.pexels.com/photos/414551/pexels-photo-414551.jpeg)] bg-cover bg-no-repeat bg-center h-[40vh] flex flex-col-reverse lg:flex-row lg:justify-between lg:px-20 justify-center gap-5 px-10  items-center fixed top-0 right-0 lg:w-[90%] w-full  -z-0">
          {/* greetings to present user */}
          <h1
            style={{ textShadow: "5px 5px 5px black" }}
            className="text-[#e6e6e6] lg:ml-20 leading-10"
          >
            {greeting} {presentUser && presentUser.firstName}
          </h1>
          <Button
            type="primary"
            onClick={() => {
              logout();
            }}
            className="absolute top-3 lg:right-0  lg:top-0 right-3 lg:relative"
            icon={<CiLogout />}
          >
            Logout
          </Button>
        </Header>
        <Content
          style={{ backgroundColor: token.colorBgLayout }}
          className="mt-[30vh] min-h-[70vh] w-[90%] z-10 mx-auto rounded-lg shadow-md"
        >
          <Outlet context={[data]} />
        </Content>
        <Button
          onClick={() => {
            dispatch(triggerMenu());
          }}
          className="fixed z-30 p-6  grid place-content-center left-3 bottom-3 lg:hidden"
          type="primary"
        >
          <IoMdMenu />
        </Button>

        <CreateNewBookSideBar />
        <BookDetailsModal />
      </Layout>
    </div>
  );
};
