import axios from "axios";
import {
  GET_CART_ERROR,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
} from "./Cart.action";
const user = JSON.parse(localStorage.getItem("StyleLifeUserData")) || "";

export const getCart = () => (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });
  return axios
    .get("https://busy-cyan-betta-garb.cyclic.app/cart/", {
      headers: {
        "Content-type": "application/json",
        Authorization: user.token,
      },
    })
    .then((r) => dispatch({ type: GET_CART_SUCCESS, payload: r.data }))
    .catch((e) => dispatch({ type: GET_CART_ERROR }));
};
