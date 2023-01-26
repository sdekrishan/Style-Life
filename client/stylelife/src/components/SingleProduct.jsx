import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Flex,
  ButtonGroup,
  IconButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Modal,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import "./SingleProduct.css";
import axios from "axios";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../Redux/Cart/Cart.types";

const SingleProduct = () => {
  const [restro, setRestro] = useState({});
  const [deals, setDeals] = useState([]);
  const [totalCart, setTotalCart] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  let loca = location.search.split("?").join("");
  const deleteCart = async () => {
    try {
      let res = await axios.delete(
        "https://shy-blue-centipede-tie.cyclic.app/cart/delete",
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

  let user = JSON.parse(localStorage.getItem("StyleLifeUserData")) || {};
  const getCategoryData = () => {
    axios
      .get(`https://shy-blue-centipede-tie.cyclic.app/${loca}/${id}`)
      .then((r) => {
        setRestro(r.data);
        setDeals(r.data.deals);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    dispatch(getCart())
      .then((r) => {
        console.log(r);
        setTotalCart(r.payload[0].deals);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    getCategoryData();
  }, []);

  const handleCloseButton = () => {
    navigate("/");
    onClose();
  };
  const handleOpenButton = () => {
    deleteCart();
    setTotalCart([]);
    onClose();
  };
  console.log(totalCart);
    // useEffect(() => {
    //   console.log("working total cart use effect", totalCart);
    //   if (totalCart.length == 0) {
    //     return (
    //       <>
    //         <Modal isOpen={isOpen} onClose={onClose}>
    //           <ModalOverlay />
    //           <ModalContent>
    //             <ModalHeader>Modal Title</ModalHeader>
    //             <ModalCloseButton />
    //             <ModalBody>
    //               Product already in cart. If you proceed your previous entire
    //               cart will be empty.
    //               <Divider />
    //               Do you want to continue?
    //             </ModalBody>

    //             <ModalFooter>
    //               <Button colorScheme="blue" mr={3} onClick={handleCloseButton}>
    //                 No
    //               </Button>
    //               <Button variant="ghost" onClick={handleOpenButton}>
    //                 Yes
    //               </Button>
    //             </ModalFooter>
    //           </ModalContent>
    //         </Modal>
    //       </>
    //     );
    //   }
    // }, []);

  const handleCheck = () => {
    console.log("Checked out", user);
    if (user === undefined) {
      toast({
        position: "top",
        title: "Please Login First !!",
        description: "User Not Authenticated",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (totalCart.length && user !== undefined) {
      if (user !== undefined) {
        console.log(totalCart);
        navigate("/payment");
      }
    } else {
      toast({
        position: "top",
        title: "Please Add an Item in Cart",
        description: "Cart is Empty !",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleAdd = (el) => {
    axios
      .post(
        `https://shy-blue-centipede-tie.cyclic.app/cart/add`,
        {
          restro,
          deals: el,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: user.token,
          },
        }
      )
      .then((r) => {
        setRestro(r.data.data);
        console.log(r);
        setTotalCart(r.data.data[0].deals);
      })
      .catch((e) => console.log(e));
  };
  const handleRemove = () => {
    deleteCart();
    setTotalCart([]);
    setCart([]);
  };

  return (
    <Box className="main">
      <Box className="first">
        <Box textAlign={"left"}>
          <Text
            color={"RGB(153, 153, 153)"}
            fontSize={["8.5px", "11px"]}
            fontWeight={"700"}
          >
            Best Offers
          </Text>
          <Text
            color={"RGB(51, 51, 51)"}
            fontSize={{ base: "16px", md: "20px", lg: "28px" }}
            fontFamily={"Open Sans"}
            fontWeight="800"
          >
            {restro?.name}
          </Text>
          <Text
            color={"RGB(102, 102, 102)"}
            fontSize={{ base: "10px", md: "14px", lg: "18px" }}
            fontFamily={"Open Sans"}
            fontWeight="600"
          >
            {restro?.address}
          </Text>
        </Box>
        <Box
          boxSize={{ base: "35%", md: "30%" }}
          pr={{ base: "0px", md: "14px", lg: "18px" }}
        >
          <Image src={restro?.img_src} />
        </Box>
      </Box>
      <Box className="sec">
        <Box
          border={"1px solid #E0E0E0"}
          borderTop="4px solid #F47B58"
          width={"fit-content"}
          margin="left"
          backgroundColor={"white"}
        >
          <Heading
            color={"RGB(51, 51, 51)"}
            fontWeight="600"
            fontFamily={"Open Sans"}
            fontSize={{ base: "14px", md: "20px" }}
            padding={{ base: "18px 26px", md: "22px 34px" }}
          >
            Deals
          </Heading>
        </Box>
        <Box className="secmain">
          <Box
            className="dmain"
            display="flex"
            justifyContent={"space-between"}
            width="70%"
            border={"0px solid yellow"}
            backgroundColor="white"
          >
            <Box display={"flex"} flexDirection="column">
              {/* Start */}
              {deals &&
                deals.map((ele, ind) => (
                  <Box
                    display="flex"
                    flexDirection={"column"}
                    fontFamily="Open Sans"
                    key={ind}
                    mt="10px"
                  >
                    <Box
                      className="dsingle"
                      padding={"30px 10px"}
                      border="0px solid green"
                    >
                      <Box textAlign={"left"}>
                        <Text
                          color={"RGB(153, 153, 153)"}
                          fontSize="13px"
                          fontWeight="600"
                        >
                          {ele.bought}
                        </Text>
                      </Box>
                      <Box>
                        <Box
                          display={"flex"}
                          border={"0px solid red"}
                          justifyContent="space-between"
                          width="100%"
                          mr={{
                            base: "0px",
                            sm: "100px",
                            md: "200px",
                            lg: "350px",
                          }}
                        >
                          <Box textAlign={"left"}>
                            <Text
                              color={"RGB(51, 51, 51)"}
                              fontSize={{
                                base: "10px",
                                md: "14px",
                                lg: "18px",
                              }}
                              fontWeight="700"
                              mt={"12px"}
                            >
                              {ele.name}
                            </Text>
                            <Text
                              color={"RGB(52, 168, 83)"}
                              fontWeight="400"
                              fontSize={{ base: "8px", md: "10px", lg: "14px" }}
                              mt={"6px"}
                            >
                              Free Cancellation
                            </Text>
                            <Text
                              color={"RGB(102, 102, 102)"}
                              fontWeight="400"
                              fontSize={{ base: "9px", md: "12px", lg: "16px" }}
                              mt={"16px"}
                              pb="30px"
                            >
                              Valid for : 1 Person | Valid on : All Days |
                              Timings : 7 PM - 11 PM
                            </Text>
                          </Box>
                          <Box
                            border={"0px solid green"}
                            fontFamily="Open Sans"
                          >
                            <Text
                              backgroundColor={"#F6FFF7"}
                              color="RGB(52, 168, 83)"
                              border={"1px solid #34A853"}
                              fontSize="10px"
                              width={"fit-content"}
                              margin="0px auto"
                              padding={"2px 5px"}
                            >
                              {ele.discount}
                            </Text>
                            <Box
                              display={"flex"}
                              fontFamily="Open Sans"
                              mt="10px"
                              textAlign={"center"}
                              justifyContent={"space-evenly"}
                            >
                              <Text
                                textDecoration={"line-through"}
                                color="RGB(102, 102, 102)"
                                fontSize={{
                                  base: "8px",
                                  md: "10px",
                                  lg: "13px",
                                }}
                                fontWeight="400"
                                alignSelf={"center"}
                              >
                                {ele.discounted_price}
                              </Text>
                              <Text
                                color={"RGB(51, 51, 51)"}
                                fontSize={{
                                  base: "10px",
                                  md: "12px",
                                  lg: "18px",
                                }}
                                fontWeight={"700"}
                              >
                                {ele.price ? ele.price : 700}
                              </Text>
                            </Box>
                            <Text
                              fontSize={{ base: "8px", md: "10px", lg: "13px" }}
                              fontWeight="400"
                              color={"RGB(153, 153, 153)"}
                            >
                              Inc. of all taxes
                            </Text>
                            <Button
                              id={ele._id}
                              name="all_add"
                              colorScheme={"red"}
                              mt={"20px"}
                              loadingText="Adding"
                              pl={{ base: "14px", md: "18px", lg: "25px" }}
                              pr={{ base: "14px", md: "18px", lg: "25px" }}
                              fontSize={{
                                base: "12px",
                                sm: "14px",
                                md: "15px",
                                lg: "16px",
                              }}
                              onClick={() => handleAdd(ele)}
                            >
                              ADD +
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      border={"1px solid #ECECEC"}
                      width="95%"
                      margin={"auto"}
                    ></Box>
                  </Box>
                ))}
            </Box>
          </Box>
          <Box
            className="cart"
            border={"0px solid blue"}
            fontFamily="Open Sans"
            width={"28.5%"}
          >
            <Box>
              <Box
                backgroundColor={"#dbdbdb"}
                padding={{ base: "3px", md: "6px", lg: "10px" }}
                borderTopRadius="5px"
              >
                <Text
                  fontWeight={"700"}
                  fontSize={{ base: "13px", md: "15px", lg: "17px" }}
                  color="RGB(51, 51, 51)"
                >
                  Your order
                </Text>
              </Box>
              <Box
                backgroundColor={"white"}
                p={{ base: "10px", lg: "14px" }}
                pb={{ base: "24px", lg: "34px" }}
                fontFamily="Open Sans"
              >
                <Box display={"flex"} flexDirection="column" p={"14px 0px"}>
                  {/* Map starts here */}
                  {totalCart.length > 0 ? (
                    totalCart.map((e, i) => (
                      <Box
                        display={"flex"}
                        justifyContent="space-between"
                        key={i}
                      >
                        <Box
                          className="itemName"
                          fontSize={{ base: "7px", md: "9px", lg: "13px" }}
                          fontWeight="400"
                          color="RGB(51, 51, 51)"
                        >
                          {e.name}
                        </Box>

                        <Box
                          className="itemPrice"
                          fontSize={{ base: "8px", md: "10px", lg: "14px" }}
                          fontWeight="700"
                          color={"#515151"}
                        >
                          ₹{e.price}
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Text
                      fontSize={{
                        base: "10px",
                        sm: "14px",
                        md: "15px",
                        lg: "20px",
                      }}
                    >
                      Add Items
                    </Text>
                  )}
                </Box>
                <Box width="80%" margin="auto" border="1px solid #dbdbdb"></Box>
                <Box
                  className="total"
                  display={"flex"}
                  justifyContent="space-between"
                  pt="20px"
                  pb="26px"
                >
                  <Box textAlign={"left"} border="0px solid black">
                    <Text
                      color={"RGB(102, 102, 102)"}
                      fontSize="16px"
                      fontWeight={"semibold"}
                    >
                      Total
                    </Text>
                    <Text
                      color="RGB(102, 102, 102)"
                      fontSize={"12px"}
                      fontWeight="400"
                    >
                      Inc. of all taxes
                    </Text>
                  </Box>
                  <Box
                    color="RGB(51, 51, 51)"
                    fontSize={"16px"}
                    fontWeight="700"
                  >
                    ₹
                    {totalCart.reduce((a, e) => {
                      return a + Number(e.price.split(",").join(""));
                    }, 0)}
                  </Box>
                </Box>
                <Button
                  colorScheme={"red"}
                  loadingText="Moving"
                  pl={{ base: "10%", md: "25%", lg: "35%" }}
                  pr={{ base: "10%", md: "25%", lg: "35%" }}
                  mb="10px"
                  fontWeight={"700"}
                  fontSize={{
                    base: "10px",
                    sm: "14px",
                    md: "15px",
                    lg: "16px",
                  }}
                  fontFamily={"Open Sans sans-serif"}
                  borderRadius="3px"
                  // onClick={() => handleCheck()}
                  onClick={handleCheck}
                >
                  BUY NOW
                </Button>
                <Button
                  colorScheme={"red"}
                  loadingText="Moving"
                  pl={{ base: "1%", md: "5%", lg: "10%" }}
                  pr={{ base: "1%", md: "5%", lg: "10%" }}
                  pt="0px"
                  pb="0px"
                  fontWeight={"700"}
                  mb="10px"
                  fontSize={{
                    base: "10px",
                    sm: "12px",
                    md: "13px",
                    lg: "14px",
                  }}
                  fontFamily={"Open Sans sans-serif"}
                  borderRadius="3px"
                  onClick={() => handleRemove()}
                >
                  Remove Items
                </Button>
                <Text
                  fontFamily={"Open Sans"}
                  fontSize="14px"
                  fontWeight={"400"}
                  color="RGB(102, 102, 102)"
                  mt="16px"
                >
                  Say Hi to Savings !
                </Text>
              </Box>
            </Box>
            <Box
              backgroundColor={"white"}
              padding="16px"
              pb="20px"
              mt="50px"
              textAlign={"left"}
              border="1px solid #dbdbdb"
            >
              <Text
                fontFamily="Open Sans"
                fontSize={{ base: "10px", md: "16px", lg: "20px" }}
                fontWeight="700"
              >
                Win Rs 500 instant off code
              </Text>
              <Text
                mt={"30px"}
                fontSize={{ base: "8px", md: "10px", lg: "14px" }}
                fontFamily={"Open Sans"}
                fontWeight="600"
                lineHeight={"18px"}
              >
                Valid on all prepaid deals | No minimum purchase
              </Text>
              <Box
                border={"1px dotted black"}
                width={"fit-content"}
                pl="4px"
                mt="10px"
              >
                <Flex justifyContent={"space-between"} alignItems="center">
                  <Text
                    fontWeight={600}
                    fontSize={{
                      base: "8px",
                      sm: "10px",
                      md: "12px",
                      lg: "14px",
                    }}
                    color={"#5FA6DB"}
                    fontFamily="Open Sans"
                  >
                    NBLUCKY
                  </Text>
                  <Text
                    fontSize={{
                      base: "8px",
                      sm: "10px",
                      md: "12px",
                      lg: "14px",
                    }}
                    fontWeight="light"
                    backgroundColor={"#E1E9EC"}
                    fontFamily="Open Sans"
                    pr="4px"
                    pl="4px"
                  >
                    Copy
                  </Text>
                </Flex>
              </Box>
              <Box
                width="100%"
                margin="auto"
                mt={"14px"}
                border="1px solid #dbdbdb"
              ></Box>
              <Flex justifyContent={"space-between"} mt="14px">
                <Text
                  color={"RGB(102, 102, 102)"}
                  fontSize={{ base: "8px", sm: "10px", md: "12px" }}
                  fontWeight={"600"}
                >
                  Valid till 02 Feb 2023
                </Text>
                <Text
                  fontSize={{ base: "8px", sm: "10px", md: "12px" }}
                  fontWeight="600"
                  color={"RGB(239, 83, 78)"}
                >
                  Know more
                </Text>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
    // <div>hi</div>
  );
};

export default SingleProduct;
