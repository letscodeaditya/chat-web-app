import React, { useContext } from "react";
import { Tooltip, Box, Button, Text, Avatar } from "@chakra-ui/react";

export const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor={"pointer"}
      bg="grey"
      _hover={{ background: "#38B2Ac", color: "white" }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />

      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email:</b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};
