import React from "react";
import Login from "../feature/auth/Login";
import "./test.css";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import SignUp from "../feature/auth/SignUp";

function Home() {
  return (
    <Container
      bgImg='url("/img/back.jpg")'
      minH="100vh"
      maxW="Xl"
      backgroundPosition={"center"}
      backgroundRepeat={"no-repeat"}
      bgSize={"cover"}
      centerContent
    >
      <Box
        display="flex"
        justifyContent={"center"}
        p={4}
        bg={"white"}
        w={"50%"}
        m={"40px 0 15px 0"}
        rounded={10}
      >
        <Text fontSize={"2rem"}>Welcome to chat app</Text>
      </Box>

      <Box
        bg={"white"}
        w={"50%"}
        p={4}
        rounded={10}
        justifyContent={"center"}
        mb={5}
      >
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Home;
