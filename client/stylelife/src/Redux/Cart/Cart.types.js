import axios from "axios";
import {
  GET_CART_ERROR,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
} from "./Cart.action";

export const getCart = (token) => (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });
  return axios
    .get("https://busy-cyan-betta-garb.cyclic.app/cart/", {
      headers: {
        Authorization: token,
      },
    })
    .then((r) => dispatch({ type: GET_CART_SUCCESS, payload: r.data }))
    .catch((e) => dispatch({ type: GET_CART_ERROR }));
};
