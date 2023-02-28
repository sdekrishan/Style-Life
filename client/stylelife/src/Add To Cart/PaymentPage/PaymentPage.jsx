import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text } from "@chakra-ui/react";
import OrderSummary from "./pages/OrderSummary/OrderSummary";
import PaymentOption from "./pages/PaymentOption/PaymentOption";
import { PaymentSucces } from "./PaymentSucces/PaymentSucces";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
const PaymentPage = () => {
  const [CartData, setCartData] = useState([]);
  const [orderPlace, setOrderPlace] = useState(false);
  const navigation = useNavigate();

  let token = JSON.parse(localStorage.getItem("StyleLifeUserData")) || "";
  const GetCartData = async () => {
    try {
      let res = await axios.get(
        "https://busy-cyan-betta-garb.cyclic.app/cart/",
        {
          headers: {
            "Content-type": "application/json",

            authorization: token.token,
          },
        }
      );
      console.log(res);
      return res.data[0].deals;
    } catch (err) {
      console.log(err, "errr");
    }
  };

  useEffect(() => {
    GetCartData()
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
    if (token.token === "") {
      navigation("/");
    }
  }, []);

  return (
    <>
      {orderPlace ? (
        <PaymentSucces />
      ) : (
        <Box
          mt={["5rem", "0px", "0px"]}
          pb="2rem"
          bg="#e1e9ec"
          display={["grid", "grid", "flex"]}
        >
          <Box>
            <OrderSummary CartData={CartData} />
          </Box>
          <Box ml="3rem">
            <PaymentOption setOrderPlace={setOrderPlace} />
          </Box>
        </Box>
      )}

      <Box bg="#333" p="36px">
        <Box mb="10px" justifyContent={"flex-start"} display="grid">
          <Text color={"white"}>Amazing offers available on nearbuy</Text>
        </Box>
        <Box justifyContent={"flex-start"} display="grid">
          <Text color="white">
            nearbuy helps you discover the best things to do, eat and buy –
            wherever you are! Make every day awesome with nearbuy. Dine at the
            finest restaurants, relax at the best spas, pamper yourself with
            exciting wellness and shopping offers or just explore your city
            intimately… you will always find a lot more to do with nearbuy. From
            tattoo parlors to music concerts, movie tickets to theme parks,
            everything you want is now within reach. Don't stop yet! Take it
            wherever you go with the nearbuy mobile app. Based on your location
            and preference, our smart search engine will suggest new things to
            explore every time you open the app. What's more, with offers on
            everything around you... you are sure to try something new every
            time.
          </Text>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default PaymentPage;
