import React, { useState } from "react";
import { Layout, Menu, Drawer, Button, theme, message } from "antd";
import { Link } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll"; // Import the ScrollLink and scroll functions
import { LightandDarkModeTrigger } from "../components/LightandDarkModeTrigger";
import { useAuthContext } from "../hooks/useAuthContext";
import { TiThMenu } from "react-icons/ti";
import { useLogout } from "../hooks/useLogout";

const { Header, Content } = Layout;

export const StartingPage = () => {
  const { logout } = useLogout();
  const { token } = theme.useToken();
  const { user } = useAuthContext();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const menuItems = [
    {
      key: "whyBookBudy",
      label: (
        <ScrollLink to="whyBookBuddy" smooth={true} duration={500}>
          whyBookBuddy
        </ScrollLink>
      ),
    },
    {
      key: "Features",
      label: `Features`,
      children: [
        {
          key: "feature1",
          label: (
            <ScrollLink to="hitDeadline" smooth={true} duration={500}>
              Hit deadline
            </ScrollLink>
          ),
        },
        {
          key: "feature2",
          label: (
            <ScrollLink to="sittings" smooth={true} duration={500}>
              Sittings
            </ScrollLink>
          ),
        },
        {
          key: "feature3",
          label: (
            <ScrollLink to="trackBooks" smooth={true} duration={500}>
              Track Books
            </ScrollLink>
          ),
        },
        {
          key: "feature4",
          label: (
            <ScrollLink to="keepRecord" smooth={true} duration={500}>
              Keep records
            </ScrollLink>
          ),
        },
        {
          key: "feature5",
          label: (
            <ScrollLink to="wishList" smooth={true} duration={500}>
              Wish list
            </ScrollLink>
          ),
        },
        {
          key: "feature6",
          label: (
            <ScrollLink to="update" smooth={true} duration={500}>
              Updates
            </ScrollLink>
          ),
        },
      ],
    },
    {
      key: () => {
        user ? "Logout" : "Login";
      },
      onClick: () => {
        user && logout();
        user && message.success("Logged out successful");
      },
      style: {
        backgroundColor: token.colorPrimary,
        color: "#e6e6e6",
      },

      label: user ? "Logout" : <Link to="/login"> Login</Link>,
    },
  ];

  // menu items on small screens
  const minimenuItems = [
    {
      key: "whyBookBudy",
      label: (
        <ScrollLink
          to="whyBookBuddy"
          smooth={true}
          duration={500}
          onClick={toggleDrawer}
        >
          whyBookBuddy
        </ScrollLink>
      ),
    },
    {
      key: "Features",
      label: `Features`,
      mode: "vertical",
      children: [
        {
          key: "feature1",
          label: (
            <ScrollLink
              to="hitDeadline"
              smooth={true}
              duration={500}
              onClick={toggleDrawer}
            >
              Hit deadline
            </ScrollLink>
          ),
        },
        {
          key: "feature2",
          label: (
            <ScrollLink
              to="sittings"
              smooth={true}
              duration={500}
              onClick={toggleDrawer}
            >
              Sittings
            </ScrollLink>
          ),
        },
        {
          key: "feature3",
          label: (
            <ScrollLink
              to="trackBooks"
              smooth={true}
              duration={500}
              onClick={toggleDrawer}
            >
              Track Books
            </ScrollLink>
          ),
        },
        {
          key: "feature4",
          label: (
            <ScrollLink
              to="keepRecord"
              smooth={true}
              duration={500}
              onClick={toggleDrawer}
            >
              Keep records
            </ScrollLink>
          ),
        },
        {
          key: "feature5",
          label: (
            <ScrollLink
              to="wishList"
              smooth={true}
              duration={500}
              onClick={toggleDrawer}
            >
              Wish list
            </ScrollLink>
          ),
        },
        {
          key: "feature6",
          label: (
            <ScrollLink
              to="update"
              smooth={true}
              duration={500}
              onClick={toggleDrawer}
            >
              Updates
            </ScrollLink>
          ),
        },
      ],
    },
    {
      key: () => {
        user ? "Logout" : "Login";
      },
      onClick: () => {
        user && logout();
        message.success("Logged out successful");
      },
      style: {
        backgroundColor: token.colorPrimary,
        color: "#e6e6e6",
      },

      label: user ? "Logout" : <Link to="/login"> Login</Link>,
    },
  ];

  return (
    <Layout>
      <header
        style={{ backgroundColor: token.colorBgElevated }}
        className="flex z-20 shadow-md p-2 lg:px-10 justify-between sticky top-0 w-full items-center"
      >
        <img
          src="https://i.ibb.co/VVB9tq1/bookbuddy-high-resolution-logo-transparent.png"
          alt=""
          className="h-[50px]"
        />
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          className="flex-1 hidden relative md:flex  px-10 justify-end"
          items={menuItems}
        />
        <LightandDarkModeTrigger />
        <div className="h-fit grid place-items-center md:hidden ">
          <Button icon={<TiThMenu />} onClick={toggleDrawer} type="default" />
        </div>
      </header>
      <Drawer
        title="Menu"
        placement="right"
        closable={false}
        onClose={toggleDrawer}
        open={drawerVisible}
      >
        <div className="flex justify-end absolute top-5 right-2">
          <Button icon={<TiThMenu />} onClick={toggleDrawer} type="default" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["home"]}
          items={minimenuItems}
        />
      </Drawer>
      <Content
        id="whyBookBuddy"
        style={{ backgroundColor: token.colorBgContainer }}
        className="px-5 lg:px-[50px] min-h-[100vh]"
      >
        <section className="flex my-20 flex-col items-center gap-5">
          <h1
            style={{ color: token.colorTextBase }}
            className="text-center text-xl lg:text-3xl"
          >
            Tame Your reading, Track your Progress
          </h1>
          <p
            className="text-center text-2xl max-w-[500px]"
            style={{ color: token.colorText }}
          >
            Embrace the joy of organized, goal-oriented reading with our
            feature-packed book tracking app!
          </p>
          <div className="flex justify-center items-center flex-col gap-5">
            <Link to="/signup">
              <Button type="primary">Signup Now</Button>
            </Link>
            <p style={{ color: token.colorText }}>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </section>

        <section
          id="hitDeadline"
          className="flex flex-col lg:flex-row my-10 items-center justify-between gap-10"
        >
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              src="https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="w-[70%] rounded-md shadow-lg"
            />
          </div>
          <div className=" lg:w-1/2 space-y-10">
            <h2
              className="text-lg lg:text-2xl"
              style={{ color: token.colorTextBase }}
            >
              Hit every deadline
            </h2>
            <p
              className="text-base lg:text-xl"
              style={{ color: token.colorText }}
            >
              Never miss a reading deadline again! Our app empowers you to set
              and achieve your reading goals by helping you stay on track and
              complete your books within the specified deadlines. Enjoy a sense
              of accomplishment as you consistently hit your reading targets.
            </p>
          </div>
        </section>

        <section
          id="sittings"
          className="flex flex-col lg:flex-row-reverse my-10 items-center justify-between gap-10"
        >
          <div className="lg:w-[60%] flex justify-center items-center">
            <img
              src="https://i.ibb.co/h1wSJWx/Untitled-design-3.png"
              alt=""
              className="w-[100%] rounded-md shadow-lg"
            />
          </div>
          <div className=" lg:w-1/2 space-y-10">
            <h2
              className="text-lg lg:text-2xl"
              style={{ color: token.colorTextBase }}
            >
              Divide your reading into sittings
            </h2>
            <p
              className="text-base lg:text-xl"
              style={{ color: token.colorText }}
            >
              Effortlessly manage your reading routine by breaking it down into
              manageable sittings. Our app allows you to organize your reading
              sessions, making it easier to balance your time and immerse
              yourself in the joy of reading without feeling overwhelmed.
            </p>
          </div>
        </section>

        <section
          id="trackBooks"
          className="flex flex-col lg:flex-row my-10 items-center justify-between gap-10"
        >
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              src="https://images.pexels.com/photos/3563636/pexels-photo-3563636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="w-[70%] rounded-md shadow-lg"
            />
          </div>
          <div className=" lg:w-1/2 space-y-10">
            <h2
              className="text-lg lg:text-2xl"
              style={{ color: token.colorTextBase }}
            >
              Track book progress
            </h2>
            <p
              className="text-base lg:text-xl"
              style={{ color: token.colorText }}
            >
              Stay informed about your reading journey with our intuitive
              progress tracking feature. Easily monitor the pages you've
              covered, the chapters you've conquered, and visualize your overall
              progress. Celebrate your achievements as you make your way through
              each book.
            </p>
          </div>
        </section>

        <section
          id="keepRecord"
          className="flex flex-col lg:flex-row-reverse my-10 items-center justify-between gap-10"
        >
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              src="https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="w-[70%] rounded-md shadow-lg"
            />
          </div>
          <div className=" lg:w-1/2 space-y-10">
            <h2
              className="text-lg lg:text-2xl"
              style={{ color: token.colorTextBase }}
            >
              Keep record of books read
            </h2>
            <p
              className="text-base lg:text-xl"
              style={{ color: token.colorText }}
            >
              Create a personalized library of your literary adventures. Our app
              lets you maintain a comprehensive record of all the books you've
              read, providing a delightful digital space to reminisce about your
              literary experiences and share recommendations with friends.
            </p>
          </div>
        </section>

        <section
          id="wishList"
          className="flex flex-col lg:flex-row my-10 items-center justify-between gap-10"
        >
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              src="https://images.pexels.com/photos/19613016/pexels-photo-19613016/free-photo-of-woman-sitting-by-laptop-and-book-and-using-smartphone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="w-[70%] rounded-md shadow-lg"
            />
          </div>
          <div className=" lg:w-1/2 space-y-10">
            <h2
              className="text-lg lg:text-2xl"
              style={{ color: token.colorTextBase }}
            >
              Wishlist of future books
            </h2>
            <p
              className="text-base lg:text-xl"
              style={{ color: token.colorText }}
            >
              Curate a wishlist of books you're eager to explore in the future.
              Whether it's the latest bestseller or a classic you've been
              meaning to read, our wishlist feature ensures you never forget
              about those intriguing titles that pique your interest.
            </p>
          </div>
        </section>

        <section className="flex flex-col lg:flex-row-reverse my-10 items-center justify-between gap-10">
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              src="https://i.ibb.co/9h7LrQQ/Screenshot-2024-01-11-102625.png"
              alt=""
              className="w-[70%] rounded-md shadow-lg"
            />
          </div>
          <div id="update" className=" lg:w-1/2 space-y-10">
            <h2
              className="text-lg lg:text-2xl"
              style={{ color: token.colorTextBase }}
            >
              Update, delete, and edit book details
            </h2>
            <p
              className="text-base lg:text-xl"
              style={{ color: token.colorText }}
            >
              Enjoy complete control over your book database. Effortlessly
              update, delete, or edit the details of each entry in your library.
              Keep your records accurate and personalized to reflect the
              evolving nature of your reading preferences.
            </p>
          </div>
        </section>
      </Content>
    </Layout>
  );
};
