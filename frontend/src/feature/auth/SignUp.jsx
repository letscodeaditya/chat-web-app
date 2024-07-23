import { VStack, HStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Input, InputRightElement, InputGroup } from "@chakra-ui/input";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useToast, RadioGroup, Radio } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [showCon, setShowCon] = useState(false);
  const toast = useToast();

  const handleClicked = () => setShow(!show);

  const postDetail = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "empty image",
        description: "please select an image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dq5bhyeii");
      fetch("https://api.cloudinary.com/v1_1/dq5bhyeii/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
          setLoading(false);
        });
    } else {
      toast({
        title: "img format invalid",
        description: "please select an image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  };

  const submitHandle = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword || !gender) {
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

    if (password !== confirmPassword) {
      toast({
        title: "wrong password",
        description: "please check password and caps on/off",
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
        "http://localhost:5000/auth/user/reg",
        { name, email, gender, password, pic },
        config
      );
      toast({
        title: "registration successful",
        //  description: "please log in with the new login credentials",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      console.log("done");
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
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="enter name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          placeholder="enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="enter password here"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement w={"3.5rem"} onClick={handleClicked} rounded={10}>
            <Button>{show ? "hide" : "show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showCon ? "text" : "password"}
            placeholder="enter here again"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement
            w={"3.5rem"}
            onClick={() => setShowCon(!showCon)}
            rounded={10}
          >
            <Button>{showCon ? "hide" : "show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* pic upload */}

      <FormControl>
        <FormLabel>upload your pic</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetail(e.target.files[0])}
        />
      </FormControl>

      {/* gender    */}

      <FormControl as="fieldset" isRequired>
        <FormLabel as="legend">select gender</FormLabel>
        <RadioGroup>
          <HStack spacing="24px">
            <Radio value="male" onChange={(e) => setGender(e.target.value)}>
              male
            </Radio>
            <Radio value="female" onChange={(e) => setGender(e.target.value)}>
              female
            </Radio>
          </HStack>
        </RadioGroup>
        {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
      </FormControl>

      <Button
        colorScheme="purple"
        w={"50%"}
        style={{ marginTop: 12 }}
        onClick={submitHandle}
        isLoading={loading}
      >
        submit
      </Button>
    </VStack>
  );
}

export default SignUp;
