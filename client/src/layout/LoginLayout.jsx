import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, ConfigProvider, Form, theme } from "antd";
const { darkAlgorithm, compactAlgorithm, defaultAlgorithm } = theme;

export const LoginLayout = () => {
  const { token } = theme.useToken();

  return (
    <div className="bg-[url(https://images.pexels.com/photos/574283/pexels-photo-574283.jpeg)] h-screen bg-cover bg-no-repeat flex justify-center items-center relative ">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{}}
        initialValues={{
          remember: true,
        }}
        autoComplete="on"
        className="p-10 rounded-lg shadow-xl text-black flex flex-col justify-between"
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00a82d",
              colorTextBase: "#333333",
              colorBgLayout: "#ffffff",
              colorBgElevated: "#f2f2f2",
              colorBgContainer: "#f2f2f2",
              colorText: "#737373",
            },
            algorithm: [defaultAlgorithm],
          }}
        >
          <Outlet />
        </ConfigProvider>
      </Form>

      {/* Home page button */}
      <Button type="primary" className="absolute top-5 left-5">
        <Link to="/">Start Page</Link>
      </Button>
    </div>
  );
};
