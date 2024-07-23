import { VStack, useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Input, InputRightElement, InputGroup } from "@chakra-ui/input";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const toast = useToast();
  const nav = useNavigate();

  const handleClicked = () => setShow(!show);

  const submitHandle = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Empty field",
        description: "please fill all field",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/auth/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login successful",
        //  description: "please log in with the new login credentials",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      nav("/home/chat");
    } catch (error) {
      toast({
        title: "error occured",
        description: "please try agin later",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="enter password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement w={"3.5rem"} onClick={handleClicked} rounded={10}>
            <Button>{show ? "hide" : "show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="red"
        w={"50%"}
        style={{ marginTop: 12 }}
        onClick={submitHandle}
      >
        login
      </Button>
      <Button
        colorScheme="blue"
        w={"50%"}
        style={{ marginTop: 12 }}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("12345678");
        }}
      >
        guest login
      </Button>
    </VStack>
  );
}

export default Login;
