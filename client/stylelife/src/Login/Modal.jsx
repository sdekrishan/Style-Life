import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const ModalLogin = ({ title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [UserLogin, setUserLogin] = useState(false);
  const [AdminLogin, setAdminLogin ] = useState(false);
  const [Admin, setAdmin] = useState("")
  const navigate = useNavigate()
  let token = JSON.parse(localStorage.getItem("StyleLifeUserData")) || "";
  let admintoken = JSON.parse(localStorage.getItem("StyleLifeAdminData")) || "";
  token = token.token;
  admintoken = admintoken.token
  useEffect(() => {
    if (token === undefined) {
      setUserLogin(true);
    }
     else {
      setUserLogin(false);
    }
  });
  useEffect(()=>{
    if(admintoken===undefined){
      setAdminLogin(true)
    }
    else {
      setAdminLogin(false)
    }
  })

  const HandelLogOut = () => {
    setUserLogin(true);
    setAdmin("")
    localStorage.removeItem("StyleLifeUserData");
    localStorage.removeItem("StyleLifeAdminData");

    navigate("/")
  };

  return (
   <>
    <Box>
      {UserLogin && Admin !== "Admin" ?  (
        <>
          <Button bg="none" w="auto" onClick={()=>{
            onOpen();
           
          }}>
            {title === "yes" ? (
              <Image
                src="https://cdn.icon-icons.com/icons2/2406/PNG/512/user_account_icon_145918.png"
                alt="acntlogo"
                style={{ height: "25px" }}
              />
            ) : (
            title
            )}
          </Button>
       
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
              m="3.5rem"
              pl="0px"
              pb="10px"
              pr={["10px", "720px"]}
              w={["25rem", "80rem"]}
            >
              <ModalCloseButton />
              <ModalBody>
               
                <Login setAdmin={setAdmin} onClose={onClose} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : (
    
        <Button onClick={HandelLogOut} display={{base:"none",md:"block"}}>Logout</Button>
       
       
      )}
    </Box>
   <Button
   display={Admin ===""  ? 'none' : 'block'}
  
   onClick={()=>navigate("/admin")}>{Admin === "" ? "" :  Admin}</Button>
   </>
  );
};

export default ModalLogin;
