import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Protected from "./routes/Protected.jsx";
import Chat from "./pages/Chat.jsx";
import ProtectedAuth from "./routes/ProtectedAuth.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedAuth />,
    children: [{ path: "/", element: <Home /> }],
    // element: <Home />,
  },
  {
    path: "/home",
    element: <Protected />,
    children: [
      { path: "/home", element: <Chat /> },
      { path: "/home/chat", element: <Chat /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);
