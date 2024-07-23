import React, { useContext, useState } from "react";
import {
  Tooltip,
  Box,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  useToast,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ChatStore } from "../../store/Chat-store";
import { ProfileModal } from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChatLoading } from "../chat/ChatLoading";
import { UserListItem } from "../chat/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const nav = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { user, setSelectedChat, chats, setChats } = useContext(ChatStore);

  const logoutHandle = () => {
    localStorage.removeItem("userInfo");
    nav("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/auth/user?search=${search}`,
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );

      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        const errorText = await response.text(); // Get the text of the error response
        console.error("Error Response:", errorText);
        throw new Error("No user found");
      } else if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text(); // Get the text of the unexpected response
        console.error("Unexpected Response Format:", errorText);
        throw new Error("Unexpected response format");
      }

      const data = await response.json();
      setLoading(false);
      console.log(data);
      setSearchResult(data);
    } catch (error) {
      console.error("Error during fetch:", error);
      toast({
        title: error.message,
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });

      setTimeout(() => {
        setSearch("");
        setLoading(false);
      }, 3000);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      onclose();
    } catch (error) {
      toast({
        title: "access error",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="5px 10px 5px 10px"
        bg={"white"}
      >
        <Tooltip lable="search users to chat" placement="bottom-end">
          <Button onClick={onOpen}>
            <FaSearch />
            <Text d={{ base: "none", md: "flex" }} px="4">
              search user
            </Text>
          </Button>
        </Tooltip>

        <Text fontWeight={500} fontSize={"30px"}>
          Chat-app
        </Text>

        <Box>
          {/* notification */}
          <Menu>
            <MenuButton m={2}>
              <FaBell />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>

          {/* userdetail */}
          <Menu>
            <MenuButton as={Button} righIcon={<IoIosArrowDropdownCircle />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={logoutHandle}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px"> search user</DrawerHeader>
            <DrawerBody>
              <Box display={"flex"} pb={2}>
                <Input
                  placeholder="search by name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <Button onClick={handleSearch}>Go</Button>
              </Box>

              {loading ? (
                <ChatLoading />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SideDrawer;
