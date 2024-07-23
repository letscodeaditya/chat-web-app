import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import ChatProvider from "../store/Chat-store";

const Protected = () => {
  const auth = localStorage.getItem("userInfo");

  return (
    <>
      <ChatProvider>{auth ? <Outlet /> : <Navigate to="/" />}</ChatProvider>
    </>
  );
};

export default Protected;
