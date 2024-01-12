import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-10 justify-center items-center">
      <h1>Page Not Found, try again</h1>

      <Button type="primary" className="">
        <Link to="/">Back to Start page</Link>
      </Button>
    </div>
  );
};
