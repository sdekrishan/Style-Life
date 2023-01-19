import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReCapture from "../pages/reCapture/reCapture";
import style from "./style/SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import ForgatePassword from "../ForgatePassword/ForgatePassword";
import axios from "axios";

const SignIn = ({ HandelChange, onClose, setPasswordForgate }) => {
  const [timer, setTimer] = useState(30);
  const toast = useToast();

  const [nextBtn, setNextBtn] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const PostForSignUp = async (email, password) => {
    try {
      let res = await axios.post(
        "https://glorious-bass-poncho.cyclic.app/user/login",
        {
          email,
          password,
        }
      );
      let data = await res.json();
      console.log(data);

      let obj = {
        user: email,
        token: data.token,
      };

      localStorage.setItem(JSON.stringify("StyleLifeUserData", obj));

      toast({
        position: "top",
        title: "User Is Login.",
        description: "Status Success",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      navigation("/");
      onClose();
    } catch (err) {
      console.log(err, "errr");
      toast({
        position: "top",
        title: "Something Went Wrong",
        description: "Please Try Agin",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    let id;
    id = setInterval(() => {
      setTimer((ele) => {
        if (ele <= 1) {
          clearInterval(id);
        }
        return ele - 1;
      });
    }, 1000);

    const cleanup = () => {
      clearInterval(id);
    };
    return cleanup;
  }, []);

  const nextButtonValue = (data) => {
    if (data === "yes") {
      setNextBtn(false);
    }
  };

  const HandelSubmit = () => {
    console.log(email, password);
    PostForSignUp(email, password);
  };

  // setPasswordForgate

  return (
    <Box className={style.mainBox}>
      <Box>
        <Heading color={"#666"} as="h4" size="xl">
          Login
        </Heading>
      </Box>

      <Box>
        <Box pb="15px">
          {" "}
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            borderRadius="0px"
            _hover="none"
            placeholder="Email"
            border="none"
            borderBottom={"1px solid black"}
          />
        </Box>
      </Box>

      <Box>
        <Box pb="15px">
          {" "}
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            borderRadius="0px"
            _hover="none"
            placeholder="Password"
            border="none"
            borderBottom={"1px solid black"}
          />
        </Box>
        <Text onClick={() => setPasswordForgate(false)} color={"#35A7FF"}>
          Forgot Password
        </Text>
      </Box>

      <Box>
        <ReCapture nextButtonValue={nextButtonValue} />
      </Box>

      <Box justifyContent={"start"} display="grid">
        <button
          onClick={HandelSubmit}
          disabled={nextBtn}
          className={style.btnNextcolor}
          style={{ backgroundColor: nextBtn ? "gray" : "#ef534e" }}
        >
          Login
        </button>
      </Box>
      <Box>
        <Button
          bg="#ef534e"
          borderRadius={"0px"}
          _hover={"none"}
          className={style.btnNextcolor}
          onClick={HandelChange}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
