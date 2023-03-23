import {
  Box,
  Divider,
  Flex,
  Spacer,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../../Redux/Cart/Cart.types";
import style from "./styles/OrderSummary.module.css";

const OrderSummary = ({ CartDataid }) => {
  const [List, setList] = useState(true);
  const [cartData, setCartData] = useState([]);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart(token))
      .then((r) => {
        console.log("r", r);
        setCartData(r.payload[0].deals);
      })
      .catch((e) => console.log(e));
  }, []);

  // if (cartData == "null") {
  //   navigation("/");
  //   toast({
  //     position: "top",
  //     title: "Your Cart is Empty Please Add Product.",
  //     status: "error",
  //     duration: 5000,
  //     isClosable: true,
  //   });
  //   return;
  // }

  return (
    <>
      <Box
        h={List ? "15rem" : "auto"}
        overflow={"hidden"}
        className={style.summaryBox}
        m="1rem"
        p="1rem"
        bg="white"
        borderRadius={"3px"}
      >
        <Box>
          <Heading
            justifyContent={"flex-start"}
            display="flex"
            as="h3"
            size="lg"
          >
            Order summary
          </Heading>
        </Box>

        <Divider mb="8px" />

        <Box>
          {" "}
          <Flex>
            {/* <Box>
              <Image w="50px" src={cartData[0].image} />
            </Box> */}
            <Box>
              <Text>{cartData.name}</Text>
              <Text>{cartData.address}</Text>
            </Box>
          </Flex>
        </Box>
        <Divider mb="8px" />

        {cartData &&
          cartData.map((ele) => {
            return (
              <Box
                pt="5px"
                className={style.summaryBox}
                borderTop="1px solid"
                key={ele._id}
              >
                <Box>
                  {" "}
                  <Text display={"flex"} justifyContent={"flex-start"}>
                    {ele.name}
                  </Text>
                </Box>
                <Flex>
                  <Box>$ {ele.price}</Box>
                  <Spacer />
                  <Box>(Qty. 1)</Box>
                </Flex>
              </Box>
            );
          })}
      </Box>

      <Button onClick={() => setList(!List)}>{List ? "↓" : "↑"}</Button>

      <Box
        className={style.summaryBox}
        m="1rem"
        p="1rem"
        bg="white"
        borderRadius={"3px"}
      >
        <Flex>
          <Box>
            <Text>Subtotal (Qty. {cartData.length})</Text>
          </Box>
          <Spacer />
          <Box>
            ${" "}
            {cartData.reduce((a, e, i) => {
              return Number(e.price.split(",").join("")) + a;
            }, 0)}
          </Box>
        </Flex>

        <Divider mb="8px" />

        <Flex>
          <Box>
            <Text>Convenience Fees</Text>
          </Box>
          <Spacer />
          <Box>$ 20</Box>
        </Flex>

        <Divider mb="8px" />

        <Box justifyContent={"flex-start"} display="grid">
          <Text color="red">View & Apply promo code</Text>
        </Box>

        <Divider mb="8px" />

        <Flex>
          <Box>Total</Box>
          <Spacer />
          <Box>
            <Text>
              ${" "}
              {cartData.reduce((a, e, i) => {
                return Number(e.price.split(",").join("")) + a;
              }, 0) + 20}
            </Text>
            <Text color="blue.500">You save 20%</Text>
            <Text color="blue.500">Inclusive of all taxes</Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default OrderSummary;
