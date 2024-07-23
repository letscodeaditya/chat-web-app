import React, { useContext } from "react";
import { ChatStore } from "../store/Chat-store";
import SideDrawer from "../feature/components/SideDrawer";
import { Box } from "@chakra-ui/layout";
import MyChats from "../feature/chat/MyChats";
import { ChatBox } from "../feature/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(ChatStore);

  return (
    <>
      <Box
        w="100vw"
        h="100vh"
        bgImage="linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
      >
        {user && <SideDrawer />}
        <Box
          display="flex"
          justifyContent="space-between"
          bgImage="linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
          w="100%"
          h="91.5vh"
          p="10px"
        >
          {user && <MyChats />}
          {user && <ChatBox />}
        </Box>
      </Box>
    </>
  );
};

export default Chat;
