import React, { useState } from "react";
import SignUp from "./SignUp/SignUp";

import style from "./style/Login.module.css";

import { Box, Image, Text } from "@chakra-ui/react";
import SignIn from "./SignIn/SignIn";

import ForgatePassword from "./ForgatePassword/ForgatePassword";
import ChangePassword from "./ChangePassword/ChangePassword";
const Login = ({ onClose, setAdmin }) => {
  const [ButtonTomove, setButtonTomove] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [PasswordForgate, setPasswordForgate] = useState(true);

  const [Route_forgate_Chgange, setRoute_forgate_Chgange] = useState(true);

  console.log(PasswordForgate);

  const HandelChange = () => {
    setButtonTomove(!ButtonTomove);
  };

  return (
    <Box display={["grid", "flex", "flex"]} justifyContent="space-between">
      <Box
        className={style.first_box_login}
        marginInline={"auto"}
        w={{ base: "90%", sm: "90%", md: "60%", lg: "40%" }}
      >
        <Box>
          <Box>
            <Image src="http://www.nearbuy.com/static/images/nb-logo.png" />
          </Box>

          <Box>
            <Text>Explore exciting deals & offers around you</Text>
          </Box>
        </Box>
      </Box>

      <Box
        className={style.second_Box_login}
        w={{ base: "100%", sm: "100%", md: "60%", lg: "60%" }}
      >
        {ButtonTomove ? (
          <SignUp
            HandelChange={HandelChange}
            password={password}
            name={name}
            email={email}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        ) : PasswordForgate ? (
          <SignIn
            onClose={onClose}
            HandelChange={HandelChange}
            name={name}
            setPasswordForgate={setPasswordForgate}
            setAdmin={setAdmin}
          />
        ) : Route_forgate_Chgange ? (
          <ForgatePassword
            onClose={onClose}
            setRoute_forgate_Chgange={setRoute_forgate_Chgange}
            setPasswordForgate={setPasswordForgate}
          />
        ) : (
          <ChangePassword
            email={email}
            name={name}
            onClose={onClose}
            setRoute_forgate_Chgange={setRoute_forgate_Chgange}
          />
        )}
      </Box>
    </Box>
  );
};

export default Login;
