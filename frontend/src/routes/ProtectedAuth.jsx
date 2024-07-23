import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

const ProtectedAuth = () => {
  const auth = localStorage.getItem("userInfo");

  //   let nav = useNavigate();

  //   useEffect(() => {
  //     const user = JSON.parselocalStorage.getItem("userInfo");
  //     if (user) {
  //       nav("/chat");
  //     }
  //   }, [user]);

  return <>{!auth ? <Outlet /> : <Navigate to="/home/chat" />}</>;
};

export default ProtectedAuth;
