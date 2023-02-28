import { Box, Image } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PaymentSucces = () => {
  const [timer, setTimer] = useState(5);
  const [IMage, setIMage] = useState(
    "https://www.cashlesso.com/wp-content/uploads/2020/03/19-March-Final-animation.gif"
  );
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("StyleLifeUserData")) || {};
  const deleteCart = async () => {
    try {
      let res = await axios.delete(
        "https://busy-cyan-betta-garb.cyclic.app/cart/delete",
        {
          headers: {
            "Content-type": "application/json",
            Authorization: user.token,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let id;
    id = setInterval(() => {
      setTimer((ele) => {
        if (ele <= 1) {
          setIMage(
            "https://service-isib.ru/design/builds/static/img/check-circle.gif"
          );
          deleteCart();

          if (ele < -1) {
            navigate("/");
            clearInterval(id);
          }
        }
        return ele - 1;
      });
    }, 1000);

    const cleanup = () => {
      clearInterval(id);
    };
    return cleanup;
  }, []);

  return (
    <Box justifyContent={"center"} pt="1rem" display="grid" pb="10rem">
      <Image src={IMage} />{" "}
    </Box>
  );
};
