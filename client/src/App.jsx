import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { StartingPage } from "./pages/StartingPage";
import { AppHome } from "./pages/AppHome";
import { ReadBooks } from "./pages/ReadBooks";
import { Signup } from "./pages/Signup";
import { TrackedBooks } from "./pages/TrackedBooks";
import { WishList } from "./pages/WishList";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginLayout } from "./layout/LoginLayout";
import { AppLayout } from "./layout/AppLayout";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { AiOutlineLoading } from "react-icons/ai";
import { ConfigProvider, Spin, theme } from "antd";
const { darkAlgorithm, compactAlgorithm, defaultAlgorithm } = theme;

// dark Mode styles
const dark = {
  token: {
    colorPrimary: "#00a82d",
    colorTextBase: "#e6e6e6",
    colorBgLayout: "#1a1a1a",
    colorBgElevated: "#1a1a1a",
    colorBgContainer: "#262626ff",
    colorText: "#a6a6a6",
  },
  algorithm: [darkAlgorithm],
  components: {
    Card: {
      colorBorderSecondary: "#1a1a1a",
      colorBgContainer: "#1a1a1a",
      colorText: "#a6a6a6",
    },
  },
};

// light mode styles
const light = {
  token: {
    colorPrimary: "#00a82d",
    colorTextBase: "#333333",
    colorBgLayout: "#ffffff",
    colorBgElevated: "#f2f2f2",
    colorBgContainer: "#f2f2f2",
    colorText: "#737373",
  },
  algorithm: [defaultAlgorithm],
  components: {
    Card: {
      colorBorderSecondary: "#f2f2f2",
      colorBgContainer: "#ffffff",
      colorText: "#737373",
    },
  },
};

export const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const darkModeTrigger = useSelector((state) => {
    return state.darkModeReducer.darkMode;
  });

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Check if there is a saved value in local storage
    const storedDarkMode = localStorage.getItem("darkMode");
    const user = localStorage.getItem("user");

    if (user) {
      setLoading(false);
    } else {
      setLoading(false);
    }
    // If a value is stored, use it
    setDarkMode(JSON.parse(storedDarkMode));
  }, [darkModeTrigger]); // Run this effect only once when the component mounts

  const location = useLocation();

  // if the user is not true Loading would show
  if (loading) {
    return <Spin size="large" fullscreen />;
  }

  return (
    // ant design dark themes
    <ConfigProvider theme={darkMode ? light : dark}>
      <Routes>
        <Route path="/" element={<StartingPage />} />

        {/* Layout for Login page */}
        <Route element={<LoginLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Portected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Layout to the app itself */}
          <Route path="/apphome" element={<AppLayout />}>
            <Route index element={<AppHome />} />
            <Route path="readbooks" element={<ReadBooks />} />
            <Route path="currentreads" element={<TrackedBooks />} />
            <Route path="wishlist" element={<WishList />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ConfigProvider>
  );
};
