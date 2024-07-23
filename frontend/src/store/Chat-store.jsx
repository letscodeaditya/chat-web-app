import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChatStore = createContext({
  user: {},
  selectedChat: {},
  setSelectedChat: () => {},
  chats: [],
  setChats: () => {},
  getSender: () => {},
});

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [selectedChat, setSelectedChat] = useState({});
  const [chats, setChats] = useState([]);

  let nav = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      nav("/");
    }
  }, []);

  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : user[0].name;
  };

  return (
    <ChatStore.Provider
      value={{
        user,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        getSender,
      }}
    >
      {children}
    </ChatStore.Provider>
  );
};

export default ChatProvider;
